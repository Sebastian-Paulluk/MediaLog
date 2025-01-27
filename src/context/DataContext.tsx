import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { CategoryTypes, FolderTypes, ItemTypes } from "../types/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { sortByName } from "../utils/sortByName";
import { useUserContext } from "./userContext";

interface DataContextType  {
    items: ItemTypes[];
    folders: FolderTypes[];
    categories: CategoryTypes[];
    changesSaved: boolean;
    setChangesSaved: React.Dispatch<React.SetStateAction<boolean>>;
    dataLoaded: boolean;
    getCategoryById: (id: string) => CategoryTypes | null;
    getFoldersByCategoryId: (id: string) => FolderTypes[];
    getFolderById: (folderId: string) => FolderTypes | null;
    getItemsByFolderId: (categoryId: string) => ItemTypes[];
    getItemsByCategoryId: (categoryId: string) => ItemTypes[];
    getItemsByCategoryIdInRoot: (categoryId: string) => ItemTypes[];
    getItemsByNameOrNotes: (query: string) => ItemTypes[];
    getItemsInCategoryByNameOrNotes: (query: string, categoryId: string) => ItemTypes[];
    getFavoriteItemsInCategory: (id: string) => ItemTypes[];
    existsFavoriteItems: () => boolean;
    getLastUpdatedItems: () => ItemTypes[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({children}) => {
    const {user} = useUserContext();
    const [items, setItems] = useState<ItemTypes[]>([]);
    const [folders, setFolders] = useState<FolderTypes[]>([]);
    const [categories, setCategories] = useState<CategoryTypes[]>([]);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const [foldersLoaded, setFoldersLoaded] = useState(false);  
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [changesSaved, setChangesSaved] = useState(true);

    useEffect(() => {
        const unsubscribeCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
            const categoriesData: CategoryTypes[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as CategoryTypes));

            const filteredCategories = categoriesData.filter(category => category.userId === user?.uid);
            const sortedCategories = filteredCategories.sort(sortByName);

            setCategories(sortedCategories);
            setCategoriesLoaded(true);
        });

        return () => {
            unsubscribeCategories();
        }
    }, [user]);


    useEffect(() => {
        if (categoriesLoaded) {
            const unsubscribeFolders = onSnapshot(collection(db, 'folders'), (snapshot) => {
                const foldersData: FolderTypes[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as FolderTypes));
    
                const filteredFolders = foldersData.filter(folder =>
                    categories.some(category => category.id === folder.categoryId)
                );
    
                setFolders(filteredFolders);
                setFoldersLoaded(true);
            });
    
            return () => {
                unsubscribeFolders();
            };
        }
    }, [categories, categoriesLoaded]);
    

    useEffect(() => {
        if (categoriesLoaded) {
            const unsubscribeItems = onSnapshot(collection(db, 'items'), (snapshot) => {
                const itemsData: ItemTypes[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as ItemTypes));
    
                const filteredItems = itemsData.filter(item =>
                    categories.some(category => category.id === item.categoryId)
                );
                setItems(filteredItems);
                setItemsLoaded(true);
            });
    
            return () => {
                unsubscribeItems();
            };
        }
    }, [categories, categoriesLoaded]);


    const getCategoryById = (id: string): CategoryTypes | null => {
        return categories.find(category => category.id === id) || null;
    };

    const getFoldersByCategoryId = (categoryId: string) => {
        const foundFolders = folders.filter(folder => folder.categoryId === categoryId);
        if (!foundFolders) {
            throw new Error(`No folder match categoryId.`);
        }
        return foundFolders.sort(sortByName);
    }

    const getFolderById = (folderId: string) => {
        const folder = folders.find(folder => folder.id === folderId) || null;
        return folder;
    }

    const getItemsByFolderId = (folderId: string) => {
        const foundItems = items.filter(item => item.folderId === folderId);
        if (!foundItems) {
            throw new Error(`No items match folderId.`);
        }
        return foundItems.sort(sortByName);
    }

    const getItemsByCategoryId = (categoryId: string) => {
        const foundItems = items.filter(item => item.categoryId === categoryId);
        if (!foundItems) {
            throw new Error(`No items match categoryId.`);
        }
        return foundItems.sort(sortByName);
    }

    const getItemsByCategoryIdInRoot = (categoryId: string) => {
        const foundItems = items.filter(item => item.categoryId === categoryId && !item.folderId);
        if (!foundItems) {
            throw new Error(`No items match categoryId.`);
        }
        return foundItems.sort(sortByName);
    }

    const getItemsByNameOrNotes = (query: string, itemsList=items) =>{
        const escapedText = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('.*' + escapedText + '.*', 'i');
    
        const filteredItems = itemsList.filter(item => (
                'name' in item && 'notes' in item && 
                (regex.test(item.name) || regex.test(item.notes))
            ));
        
        return filteredItems;
    }

    const getItemsInCategoryByNameOrNotes = (query: string, categoryId: string) =>{
        const itemList = getItemsByCategoryId(categoryId);
        const filteredItems = getItemsByNameOrNotes(query, itemList);

        return filteredItems.sort(sortByName);
    }

    const existsFavoriteItems = () =>{
        const favoriteItems = items.filter(item => (
                item.favorite === true
            ));

        return favoriteItems.length > 0;
    }

    const getFavoriteItemsInCategory = (categoryId: string) =>{
        const itemsInCategory = getItemsByCategoryId(categoryId);

        const categoryFavoriteItems = itemsInCategory.filter(item => (
                item.favorite === true
            ));

        return categoryFavoriteItems.sort(sortByName);
    }

    const getLastUpdatedItems = () => {
        if (categoriesLoaded) {
            const sortedItems = items.sort((a, b) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
            return sortedItems.slice(0, 3);
        }
        return [];
    };

    return (
        <DataContext.Provider value={{
            items,
            folders,
            categories,
            changesSaved,
            dataLoaded: itemsLoaded && foldersLoaded && categoriesLoaded,
            setChangesSaved,
            getCategoryById,
            getFoldersByCategoryId,
            getFolderById,
            getItemsByFolderId,
            getItemsByCategoryId,
            getItemsByCategoryIdInRoot,
            getItemsByNameOrNotes,
            getItemsInCategoryByNameOrNotes,
            existsFavoriteItems,
            getFavoriteItemsInCategory,
            getLastUpdatedItems,
        }}>
            {children}
        </DataContext.Provider>
    );
};



export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext debe usarse dentro de un DataProvider");
  }
  return context;
};