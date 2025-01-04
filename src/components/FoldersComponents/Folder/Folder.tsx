import './Folder.scss'
import folderImg from '../../../assets/images/folder.png';
import listImg from '../../../assets/images/list.png';
import { FolderTypes } from '../../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { FolderOptionsButton } from './FolderOptionsButton/FolderOptionsButton';
import { useDataContext } from '../../../context/DataContext';
import normalizeText from '../../../utils/normalizeText';
import { useState } from 'react';
import { Modal } from '../../modal/modal';
import { EditFolderForm } from '../../Forms/EditFolderForm/EditFolderForm';
import { updateFolder } from '../../../services/firebase';

interface FolderProps {
    folder: FolderTypes;
    activeFolder: FolderTypes | null;
    setActiveFolder: (folder: FolderTypes)=> void;
    handleDeleteFolder: (folder: FolderTypes)=> void;
    setOpenFoldersMenu: (state: boolean) => void;
}

export const Folder: React.FC<FolderProps> = ({folder, activeFolder, setActiveFolder, handleDeleteFolder, setOpenFoldersMenu}) => {
    const {categoryId} = useParams();
    const navigate = useNavigate();
    const isActiveFolder = folder.id === activeFolder?.id;
    const {getItemsByFolderId} = useDataContext();
    const itemsInFolder = folder.id ? getItemsByFolderId(folder.id).length : 0;
    const [openEditFolderModal , setOpenEditFolderModal] = useState<boolean>(false);
    const {setChangesSaved} = useDataContext();


    const handleOpenUpdateItemModal = () => {
        setOpenEditFolderModal(true);
    };
    const handleCloseUpdateItemModal = () => {
        setOpenEditFolderModal(false);
    };
    const handleEditFolder = async(updatedFolderData: Partial<FolderTypes>) =>{
        if (folder.id) {
            setChangesSaved(false);
            await updateFolder(folder.id, updatedFolderData);
            setChangesSaved(true);
        }
    }



    const handleFolderClick =()=>{
        setActiveFolder(folder);
        navigate(`/category/${categoryId}/folder/${folder.id}`);
        setOpenFoldersMenu(false);
    }

    const editFolderFormProps = {
		folder,
		onSubmit: handleEditFolder,
		onClose: handleCloseUpdateItemModal
	}

    return (
        <div className={`folder ${isActiveFolder? 'current-folder' : ''}`} >
            <span className='folder__lines' />

            <div className='folder__details' onClick={handleFolderClick}>
                <div className='folder__details__img-container'>
                    <img src={folderImg} alt='folder-img' className='folder-img'/>
                </div>

                <div className='folder__details__name'>
                    {normalizeText.firstLetterCaps(folder.name)}
                </div>

                <div className='folder__details__items-length'>
                    {itemsInFolder}
                    <img src={listImg} alt='list-img' className='list-img'/>
                </div>

                <FolderOptionsButton
                    folder={folder}
                    deleteFolder={handleDeleteFolder}
                    setOpenFoldersMenu={setOpenFoldersMenu}
                    handleOpenUpdateItemModal={handleOpenUpdateItemModal}
                />
            </div>

            <Modal onClose={handleCloseUpdateItemModal} open={openEditFolderModal} >
                <EditFolderForm {...editFolderFormProps}/>
            </Modal>

        </div>
    )
}