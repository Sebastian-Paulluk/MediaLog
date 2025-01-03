import React, { useState } from 'react'
import closeImg from '../../../assets/images/close.png';
import { FolderTypes, ItemTypes } from '../../../types/types';
import { useDataContext } from '../../../context/DataContext';
import './MoveItemForms.scss';
import { AddFolderForm } from '../AddFolder/AddFolderForm';
import { createFolder } from '../../../services/firebase';
import { Modal } from '../../modal/modal';
import normalizeText from '../../../utils/normalizeText';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface addOtherItemFormTypes {
    item: ItemTypes;
    onSubmit: (updatedItem: Partial<ItemTypes>)=> void;
    onClose: ()=> void;
}

export const MoveItemForm: React.FC<addOtherItemFormTypes> =({ item, onSubmit, onClose })=> {
    const {getFolderById, getCategoryById, getFoldersByCategoryId} = useDataContext();
    const category = getCategoryById(item.categoryId);
    const itemLocation = item.folderId === '' ? 'Root' : getFolderById(item.folderId).name;
    const foldersInCategory = getFoldersByCategoryId(item.categoryId);
    const {setChangesSaved} = useDataContext();
    const [openModal, setOpenModal] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState<string>(
        itemLocation === 'Root' && foldersInCategory.length > 0 ? (
            foldersInCategory[0].id || ''
        ) : (
            'Root'
        )
    );

    const resetSelectedFolderId = () => {
        setTimeout(()=>{
            setSelectedFolderId(
                itemLocation === 'Root' && foldersInCategory.length > 0 ? (
                    foldersInCategory[0].id || ''
                ) : (
                    'Root'
                )
            )
            
        }, 300)
    };
    
    const handleOpenModal = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedFolderId === 'Root') {
            onSubmit({...item, folderId: ''});
        } else {
            onSubmit({...item, folderId: selectedFolderId});
        }
        resetSelectedFolderId();
        onClose()
    };

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault();
        resetSelectedFolderId();
        onClose();
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectedFolderId(event.target.value);
    };

    const handleAddFolder = async (newFolder: FolderTypes) => {
		if (category.id) {
			setChangesSaved(false);
			await createFolder(newFolder);
			setChangesSaved(true);
		}
	};

    return(
        <>
            <form onSubmit={handleSubmit} className='form move-item-form'>
                
                <div className='form__title'>
                    <p>Moving item</p>
                    <p>in '{category.name}'</p>
                </div>

                <div className='form-body'>

                    <div className='origin-location'>
                        <div className='origin-location__title'>
                            From:
                        </div>
                        <p className='origin-location__location'>{normalizeText.firstLetterCaps(itemLocation)}</p>
                    </div>





                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ fontSize: '1.2rem', color: '#333', fontWeight: 'bold' }}>To</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value='To'
                                label="To"
                                onChange={handleSelectChange}
                                sx={{

                                }}
                            >
                                {itemLocation !== 'Root' && (
                                    <MenuItem value={''} sx={{ fontSize: '1rem', color: '#555' }}>Root</MenuItem>
                                )}

                                {foldersInCategory.map((folder, key) => (
                                    item.folderId !== folder.id && (
                                        <MenuItem key={key} value={folder.id} sx={{ fontSize: '1rem', color: '#555' }}>{folder.name}</MenuItem>
                                    )
                                ))}

                                <MenuItem onClick={handleOpenModal} value={''} sx={{ fontSize: '1rem', color: '#555' }}
                                >Create new folder
                                </MenuItem>

                            </Select>
                        </FormControl>

                        


                </div>

                <button type='button' className='form__close-button' onClick={handleCancel}>
                    <img className='form__close-button__img' src={closeImg} alt='close' />
                </button>

                <div className='form__buttons-container '>
                    <button className='form__submit-button'> Move </button>
                    <button className='form__cancel-button' onClick={handleCancel}> Cancel </button>
                </div>
            </form>

            <Modal onClose={handleCloseModal} open={openModal} >
                {category.id && (
                    <AddFolderForm
                        categoryId={category?.id}
                        onSubmit={handleAddFolder}
                        onClose={handleCloseModal}
                    />
                )}
			</Modal>
        </>
    )
}