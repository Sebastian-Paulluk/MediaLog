import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { Folder } from '../Folder/Folder'
import './FoldersContainer.scss'
import { CategoryTypes, FolderTypes } from '../../../types/types';
import folderImg from '../../../assets/images/folder.png';
import openFolderImg from '../../../assets/images/open-folder.png';
import { useNavigate } from 'react-router-dom';

interface FoldersContainerTypes {
    category: CategoryTypes;
    openFoldersMenu: boolean;
}

export const FoldersContainer: React.FC<FoldersContainerTypes> = ({category, openFoldersMenu}) => {
    const {getFoldersByCategoryId} = useDataContext();
    const [localFolders , setLocalFolders] = useState<FolderTypes[]>([]);
    const navigate = useNavigate();
    const [activeFolder , setActiveFolder] = useState<FolderTypes | null>(null);

    const handleRootFolderClick =()=> {
        setActiveFolder(null);
        navigate(`/category/${category.id}`);
    }

    useEffect(() => {
        if (category.id) {
            const res = getFoldersByCategoryId(category.id)
            setLocalFolders(res)
        }
    }, []);


    return (
        <div className={`folders-container ${openFoldersMenu ? 'open' : ''}`}>

            <div className='folders-content'>

                <div
                    className={`folders-content__root-folder ${!activeFolder ? 'active' : ''}`}
                    onClick={handleRootFolderClick}
                >
                    <div className='root-folder__img-container'>
                        <img
                            src={!activeFolder ? openFolderImg : folderImg}
                            alt='root-folder'
                            className='root-folder__img-container__img'
                        />
                    </div>
                    <div className='root-folder__name'>
                        {category.name}
                    </div>
                </div>

                <div className='folders-content__folders-container'>
                    {localFolders.map(folder => (
                        <Folder 
                            key={folder.id}
                            folder={folder}
                            activeFolder={activeFolder}
                            setActiveFolder={setActiveFolder}
                        />
                    ))}
                </div>

                <div className='folders-content__button-container'>
                    <button className='add-folder-button'>+</button>
                </div>
            </div>
        </div>
    )
}