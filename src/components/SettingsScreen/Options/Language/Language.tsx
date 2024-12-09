import React, { useState } from 'react';
import { useUserContext } from '../../../../context/userContext';
import { useDataContext } from '../../../../context/DataContext';
import { updateUser } from '../../../../services/firebase';

interface LanguageOptionProps {
   className: string;
}

export const LanguageOption: React.FC<LanguageOptionProps> = ({className}) => {
    const {user} = useUserContext();
    const [selectedLanguage, setSelectedLanguage] = useState<string>(user?.UILanguage || 'english');
    const languages: string[] = ['english', 'español', 'français']
    const {setChangesSaved} = useDataContext();

    const handleChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);

        setChangesSaved(false);
        const updatedUserData = {...user, UILanguage: newLanguage};
        await updateUser(user?.uid, updatedUserData);
        setChangesSaved(true);
    };

    return (
        <div className={className}>
            <label htmlFor="language">Language:</label>
            <select id="language" name="language" value={selectedLanguage} onChange={handleChange}>
            {languages.map((language, index) => (
                <option key={index} value={language.toLowerCase()}>
                    {language}
                </option>
            ))}
            </select>
        </div>
    );
};
