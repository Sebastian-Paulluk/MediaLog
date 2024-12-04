import './DeleteFolderButton.scss'
import { Dots } from '../../../home/CategoryComponentes/Dots/Dots';
import { FolderTypes } from '../../../../types/types';

interface DeleteFolderButtonTypes {
    folder: FolderTypes;
    deleteFolder: (folder: FolderTypes)=> void;
}

export const DeleteFolderButton: React.FC<DeleteFolderButtonTypes> = ({folder, deleteFolder}) => {

    const handleDeleteFolder = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteFolder(folder);
    }

    return (
        <button className='delete-folder-button' onClick={handleDeleteFolder}>
            <Dots />
        </button>
    )
}