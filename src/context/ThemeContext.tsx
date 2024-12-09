import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useUserContext } from './userContext';

interface ThemeContextType {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const { user } = useUserContext();
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(user?.darkTheme || false);

    useEffect(() => {
        if (user) {
            setIsDarkTheme(user.darkTheme);
        }
    }, [user]);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    useEffect(() => {
        const className = isDarkTheme ? 'dark-theme' : 'light-theme';
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(className);
    }, [isDarkTheme]);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext debe usarse dentro de un ThemeProvider');
    }
    return context;
};