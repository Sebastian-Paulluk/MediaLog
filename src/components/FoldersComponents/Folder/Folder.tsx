import './Folder.scss'
import folderImg from '../../../assets/images/folder.png';
import openFolderImg from '../../../assets/images/open-folder.png';
import { FolderTypes } from '../../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteFolderButton } from './DeleteFolderButton/DeleteFolderButton';

interface FolderProps {
    folder: FolderTypes;
    activeFolder: FolderTypes | null;
    setActiveFolder: (folder: FolderTypes)=> void;
    handleDeleteFolder: (folder: FolderTypes)=> void;
}

export const Folder: React.FC<FolderProps> = ({folder, activeFolder, setActiveFolder, handleDeleteFolder}) => {
    const {categoryId} = useParams();
    const navigate = useNavigate();
    const isActiveFolder = folder.id === activeFolder?.id
    
    const handleFolderClick =()=>{
        navigate(`/category/${categoryId}/folder/${folder.id}`)
        setActiveFolder(folder);
    }

    return (
        <div className={`folder ${isActiveFolder? 'current-folder' : ''}`} >
            <span className='folder__lines'></span>

            <div className='folder__details' onClick={handleFolderClick}>
                <div className='folder__details__img-container'>
                    <img src={isActiveFolder ? openFolderImg : folderImg} alt='folder-img' className='folder-img'/>
                </div>
                <div className='folder__details__name'>
                    {folder.name}

                </div>
                <DeleteFolderButton folder={folder} deleteFolder={handleDeleteFolder} />
            </div>
        </div>
    )
}