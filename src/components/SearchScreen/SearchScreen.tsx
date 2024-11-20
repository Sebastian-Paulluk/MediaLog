import { useParams } from 'react-router-dom';
import { useCurrentCategoryContext } from '../../context/categoryContext'
import './SearchScreen.scss'
import { useEffect, useState } from 'react';
import { ItemTypes } from '../../types/types';
import { Item } from '../ItemComponents/Item';
import { useDataContext } from '../../context/DataContext';

interface SearchScreenTypes {
    
}

export const SearchScreen: React.FC<SearchScreenTypes> = () => {
    const { currentCategory } = useCurrentCategoryContext();
    const { query, categoryId } = useParams();
    const { items, getItemsByNameOrNotes, getItemsInCategoryByNameOrNotes } = useDataContext();
    const [ filteredItems, setFilteredItems ] = useState<ItemTypes[]>([]);

    useEffect(() => {
        if (query && categoryId ) {
            const filter = getItemsInCategoryByNameOrNotes(query, categoryId);
            setFilteredItems(filter);
        } else if (query) {
            const filter = getItemsByNameOrNotes(query);
            setFilteredItems(filter);
        }
    }, [query, items]);
    
    return (
        <div className='search-screen'>
            <div className='search-title'>

                {   
                    filteredItems.length > 0 ? (
                        
                        currentCategory ? (
                            <>
                                <p className='search-title__text'>
                                    Showing results of:
                                    <p className='query'> '{query}'</p>
                                </p>
                                <p className='search-title__text'>
                                    in category:
                                    <p className='query'> {currentCategory.name}</p>
                                </p>
                            </>
                        ) : (
                            <p className='search-title__text'>
                                Showing results of:
                                <p className='query'> '{query}'</p>
                            </p>
                        )

                    ) : (
                        <p className='search-title__text'>
                            No items match:
                            <p className='query'> '{query}'</p>
                        </p>
                    )   
                }
                
            </div>
            <div className='search-screen__items-container'>
                {
                    filteredItems.length > 0 && (
                        filteredItems.map(item => (
                            <Item 
                                key={item.id}
                                item={item}
                            />
                        ))
                    ) 
                }
            </div>
        </div>
    )
}