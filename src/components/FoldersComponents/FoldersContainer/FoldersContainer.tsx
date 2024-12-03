import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { Folder } from '../Folder/Folder'
import './FoldersContainer.scss'
import { CategoryTypes, FolderTypes } from '../../../types/types';
import arrowImg from '../../../assets/images/arrow-2.png';

interface FoldersContainerTypes {
    category: CategoryTypes;
    openFoldersMenu: boolean;
    handleToggleOpenFoldersMenu: ()=> void;
}

export const FoldersContainer: React.FC<FoldersContainerTypes> = ({category, openFoldersMenu, handleToggleOpenFoldersMenu}) => {
    const {getFoldersByCategoryId} = useDataContext();
    const [localFolders , setLocalFolders] = useState<FolderTypes[]>([]);
    
    useEffect(() => {
        if (category.id) {
            const res = getFoldersByCategoryId(category.id)
            setLocalFolders(res)
        }
    }, []);

    return (
        <div className={`folders-container ${openFoldersMenu ? 'open' : ''}`}>
            <button className='open-folders-button' onClick={handleToggleOpenFoldersMenu}>
                <div className='open-folders-button__img-container'>
                    <img src={arrowImg} alt='arrow' className='open-folders-button__img-container__img' />
                </div>
                Folders
            </button>

            <div className='folders-content'>

                <div className='folders-content__folders-container'>
                    {localFolders.map(folder => (
                        <Folder key={folder.id} folder={folder} />
                    ))}
                </div>

                <div className='folders-content__button-container'>
                    <button className='add-folder-button'>+</button>
                </div>
            </div>
        </div>
    )
}