import React, { useState } from 'react'
import closeImg from '../../../assets/images/close.png';
import { FolderTypes, ItemTypes } from '../../../types/types';
import { useDataContext } from '../../../context/DataContext';
import './MoveItemForms.scss';
import { AddFolderForm } from '../AddFolder/AddFolderForm';
import { createFolder } from '../../../services/firebase';
import { Modal } from '../../modal/modal';
import normalizeText from '../../../utils/normalizeText';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import addImg from '../../../assets/images/add circle.png'

const theme = createTheme({
    components: {
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgb(80, 80, 80)', // Fondo del menú completo
                    borderRadius: '5px', // Bordes redondeados, opcional
                    marginTop: '4px', // Ajusta el margen superior si es necesario
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Sombra opcional
                },
                list: {
                    padding: '0', // Elimina el padding del cuerpo del menú
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: 'white',
                    backgroundColor: 'rgb(40, 40, 40)',
                    transition: 'background-color .3s',
                    '&:hover': {
                        backgroundColor: 'rgb(60, 60, 60)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgb(80, 80, 80)',
                        '&:hover': {
                            backgroundColor: 'rgb(126, 126, 126)', // Fondo del elemento activo al hacer hover
                        },
                    }, 
                },
            },
        },
    },
});

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
    
    const handleOpenModal = (event: SelectChangeEvent) => {
        event.preventDefault();
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

    const handleSelectChange = (event: SelectChangeEvent) => {
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
                            From
                        </div>
                        <p className='origin-location__location'>{normalizeText.firstLetterCaps(itemLocation)}</p>
                    </div>



                    <ThemeProvider theme={theme}>
                        <FormControl fullWidth>
                            <InputLabel
                                id="demo-simple-select-label"
                                sx={{
                                    color: 'rgb(145, 145, 145)', // Color inicial
                                    '&.Mui-focused': {
                                        color: 'white', // Color cuando está enfocado
                                    },
                                }}
                            >
                                To
                            </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedFolderId}
                                    label="Age"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "new-folder") {
                                            handleOpenModal(e); 
                                            e.target.value = selectedFolderId; 
                                        } else {
                                            handleSelectChange(e); 
                                        }
                                    }}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'rgb(20, 20, 20)',
                                        borderRadius: '5px',
                                        '& .MuiSelect-icon': {
                                        color: 'white',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgb(60, 60, 60)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgb(172, 172, 172)',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white', // Cambia el color del borde cuando está activo
                                        },
                                    }}
                                >
                                    {itemLocation !== 'Root' && (
                                        <MenuItem value={'Root'}>Root</MenuItem>
                                    )}

                                    {foldersInCategory.map((folder, key) => {
                                        return item.folderId !== folder.id && (
                                            <MenuItem value={folder.id} key={key}>{normalizeText.firstLetterCaps(folder.name)}</MenuItem>
                                        )
                                    })}

                                    <MenuItem
                                        value={'new-folder'}
                                        sx={{
                                            borderTop: '1px solid rgb(129, 129, 129)'
                                        }}
                                        className='add-folder-item'
                                    >
                                        <img src={addImg} className='add-folder-item__img' alt='add-folder' />
                                       New folder
                                    </MenuItem>


                            </Select>
                        </FormControl>
                    </ThemeProvider>

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