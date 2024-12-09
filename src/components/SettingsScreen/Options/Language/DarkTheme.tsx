import { useUserContext } from '../../../../context/userContext';
import { useDataContext } from '../../../../context/DataContext';
import { updateUser } from '../../../../services/firebase';
import { RadiusButton } from '../../../RadiusButton/RadiusButton';
import { useThemeContext } from '../../../../context/ThemeContext';

interface DarkThemeTypes {
    className: string;
}

export const DarkTheme: React.FC<DarkThemeTypes> =({className})=> {
    const { isDarkTheme, toggleTheme } = useThemeContext();
    const { user } = useUserContext();
    const { setChangesSaved } = useDataContext();

    const handleChange = async() => {
        setChangesSaved(false);
        toggleTheme();
        if (user) {
            const updatedUserData = { ...user, darkTheme: !isDarkTheme };
            await updateUser(user?.uid, updatedUserData);
        }
        setChangesSaved(true);
    };

    return (
        <div className={className}>
            <RadiusButton active={isDarkTheme} onChange={handleChange}/>
            <label htmlFor="language">Dark theme</label>
        </div>
    );
};