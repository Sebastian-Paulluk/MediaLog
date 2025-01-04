import './RootFolderOptionsButton.scss'
import { CategoryTypes } from '../../../../types/types';
import { PopMenu } from '../../../PopMenu/PopMenu';
import React from 'react';
import { AlertDialog } from '../../../AlertDialog/AlertDialog';
import settingsImg from '../../../../assets/images/settings-2.png';

interface RootFolderOptionsButtonTypes {
    rootFolder: CategoryTypes;
    deleteFolder: (folder: CategoryTypes)=> void;
    setOpenFoldersMenu: (state: boolean) => void;
    handleOpenUpdateItemModal: ()=> void;
}

export const RootFolderOptionsButton: React.FC<RootFolderOptionsButtonTypes> = ({rootFolder, deleteFolder, setOpenFoldersMenu, handleOpenUpdateItemModal}) => {
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDeleteFolder = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        deleteFolder(rootFolder);
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };


    const popMenuProps = {
		options: [
			{name: 'Edit name', icon: 'edit', onClick: handleOpenUpdateItemModal},
            {name: 'Delete', icon: 'delete', onClick: handleClickOpenDialog},
		]
	};

    return (
        <div className='folder-options-button-container'>
            <PopMenu {...popMenuProps}>
                <button className='folder-options-button'>
                    <img src={settingsImg} alt='settings' className='folder-options-button__img' />
                </button>
            </PopMenu>  
            
            <AlertDialog
                title= 'Delete folder?'
                text='This will erase all the items associated with this folder as well'
                open={openDialog}
                setOpen={setOpenDialog}
                handleConfirmAction={handleDeleteFolder}
                setOpenFoldersMenu={setOpenFoldersMenu}
            />
        </div>
    )
}