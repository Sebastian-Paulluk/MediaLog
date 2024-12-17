import { useEffect, useState } from 'react';
import { useDataContext } from '../../../context/DataContext';
import { Folder } from '../Folder/Folder'
import './FoldersContainer.scss'
import { CategoryTypes, FolderTypes } from '../../../types/types';
import folderImg from '../../../assets/images/folder.png';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../modal/modal';
import { AddFolderForm } from '../../Forms/AddFolder/AddFolderForm';
import { createFolder, deleteFolder, deleteItemsByFolderId } from '../../../services/firebase';
import { useWindowWidth } from '../../../Hooks/useWindowWidth';
import normalizeText from '../../../utils/normalizeText';

interface FoldersContainerTypes {
    category: CategoryTypes;
    openFoldersMenu: boolean | null;
    setOpenFoldersMenu: (state: boolean) => void;
}

export const FoldersContainer: React.FC<FoldersContainerTypes> = ({category, openFoldersMenu, setOpenFoldersMenu}) => {
    const {getFoldersByCategoryId, getItemsByCategoryIdInRoot, folders} = useDataContext();
    const [localFolders , setLocalFolders] = useState<FolderTypes[]>([]);
    const navigate = useNavigate();
    const [activeFolder , setActiveFolder] = useState<FolderTypes | null>(null);
	const [openModal, setOpenModal] = useState(false);
	const {setChangesSaved} = useDataContext();
    const {folderId} = useParams();
    const windowWidth = useWindowWidth();
    const [folderContainerState, setFolderContainerState] = useState<string>('');
    const itemsInRootOfCategory = category.id ? getItemsByCategoryIdInRoot(category.id).length : 0;
    
    useEffect(() => {
        if (category.id) {
            const res = getFoldersByCategoryId(category.id)
            setLocalFolders(res)
        }
        if (!activeFolder) {
            setActiveFolder(null);
        }
    }, [folders]);

    const getFolderContainerState =()=> {
        if (windowWidth > 1500) {
            setOpenFoldersMenu(false);
            return '';
        } else if (openFoldersMenu === false) {
            return 'close';
        } else if (openFoldersMenu === true) {
            return 'open';
        }
        return '';
    }

    useEffect(() => {
        const state = getFolderContainerState();
        setFolderContainerState(state);
    }, [openFoldersMenu, windowWidth]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddFolder = async (newFolder: FolderTypes) => {
		if (category.id) {
			setChangesSaved(false);
			await createFolder(newFolder);
			setChangesSaved(true);
		}
	};

    const handleDeleteFolder = async(folder: FolderTypes)=> {
        if (folder.id === folderId) {
            setActiveFolder(null);
            navigate(`/category/${category.id}`)
        }
        if (folder.id) {
			setChangesSaved(false);
            await deleteFolder(folder.id);
            await deleteItemsByFolderId(folder.id);
			setChangesSaved(true);
        }
    }

    const handleRootFolderClick =()=> {
        setActiveFolder(null);
        navigate(`/category/${category.id}`);
        setOpenFoldersMenu(false);
    }

    return (
        <div className={`folders-content ${folderContainerState}`}>

                <div
                    className={`folders-content__root-folder ${!activeFolder ? 'active' : ''}`}
                    onClick={handleRootFolderClick}
                >
                    <div className='root-folder__img-container'>

                        <img
                            src={folderImg}
                            alt='root-folder'
                            className='root-folder__img-container__img'
                        />
                        <div className='root-folder__img-container__number'>
                            {itemsInRootOfCategory}
                        </div>

                    </div>
                    
                    <div className='root-folder__name'>
                        {normalizeText.firstLetterCaps( category.name )}
                    </div>

                </div>

                <div className='folders-content__folders-container'>
                    {localFolders.map(folder => (
                        <Folder 
                            key={folder.id}
                            folder={folder}
                            activeFolder={activeFolder}
                            setActiveFolder={setActiveFolder}
                            handleDeleteFolder={handleDeleteFolder}
                            setOpenFoldersMenu={setOpenFoldersMenu}
                        />
                    ))}
                </div>

                <div className='folders-content__button-container'>
                    <button className='add-folder-button' onClick={handleOpenModal}>
                        +
                    </button>
                </div>


            <Modal onClose={handleCloseModal} open={openModal} >
                {category.id && (
                    <AddFolderForm
                        categoryId={category?.id}
                        onSubmit={handleAddFolder}
                        onClose={handleCloseModal}
                    />
                )}
			</Modal>
        </div>
    )
}