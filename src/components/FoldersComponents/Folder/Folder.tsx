import './Folder.scss'
import folderImg from '../../../assets/images/folder.png';
import { FolderTypes } from '../../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteFolderButton } from './DeleteFolderButton/DeleteFolderButton';
import { useDataContext } from '../../../context/DataContext';
import normalizeText from '../../../utils/normalizeText';

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
    
    const handleFolderClick =()=>{
        setActiveFolder(folder);
        navigate(`/category/${categoryId}/folder/${folder.id}`);
        setOpenFoldersMenu(false);
    }

    return (
        <div className={`folder ${isActiveFolder? 'current-folder' : ''}`} >
            <span className='folder__lines' />

            <div className='folder__details' onClick={handleFolderClick}>
                <div className='folder__details__img-container'>
                    <img src={folderImg} alt='folder-img' className='folder-img'/>
                    <span className='folder__details__img-container__number'>
                        {itemsInFolder}
                    </span>
                </div>
                <div className='folder__details__name'>
                    {normalizeText.firstLetterCaps(folder.name)}
                </div>
                <DeleteFolderButton folder={folder} deleteFolder={handleDeleteFolder} />
            </div>
        </div>
    )
}