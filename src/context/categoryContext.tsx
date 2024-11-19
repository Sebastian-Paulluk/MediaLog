import { createContext, ReactNode, useContext, useState } from "react";
import { CategoryTypes } from "../types/types";

interface categoryContextTypes {
    currentCategory: CategoryTypes | null;
    setCurrentCategory: React.Dispatch<React.SetStateAction<CategoryTypes | null>>;
}

const CurrentCategoryCategoryContext = createContext<categoryContextTypes | undefined>(undefined);

export const CurrentCategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentCategory, setCurrentCategory] = useState<CategoryTypes | null>(null)

    return (
        <CurrentCategoryCategoryContext.Provider value={{
            currentCategory,
            setCurrentCategory
        }}> 
            {children}
        </CurrentCategoryCategoryContext.Provider>
    )
}

export const useCurrentCategoryContext = () => {
    const context = useContext(CurrentCategoryCategoryContext);
    if (context === undefined) {
        throw new Error('useCategoryContext debe ser usado dentro de un CategoryContextProvider');
    }
    return context;
};