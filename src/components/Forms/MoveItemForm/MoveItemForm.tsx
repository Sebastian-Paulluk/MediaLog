import React, { useState } from 'react'
import closeImg from '../../../assets/images/close.png';
import { ItemTypes } from '../../../types/types';
import { useDataContext } from '../../../context/DataContext';
import './MoveItemForms.scss';

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
    const [selectedFolderId, setSelectedFolderId] = useState<string>(
        itemLocation === 'Root' ? (foldersInCategory[0].id || '') : ('')
    );

    const resetSelectedFolderId = () => {
        setTimeout(()=>{
            setSelectedFolderId(
                itemLocation === 'Root' ? (foldersInCategory[0].id || '') : ('')
            )
        }, 300)
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({...item, folderId: selectedFolderId});
        resetSelectedFolderId();
        onClose()
    };

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault();
        resetSelectedFolderId();
        onClose();
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFolderId(event.target.value);
    };

    return(
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
                    <p className='origin-location__location'>{itemLocation}</p>
                </div>

                <div className='available-locations'>

                    <div className='available-locations__title'>
                        To
                    </div>

                    {itemLocation !== 'Root' && (
                        <label className='available-locations__option'>
                            <input
                                className='available-locations__option__radio-button'
                                type="radio"
                                value={''} 
                                checked={selectedFolderId === ''} 
                                onChange={handleRadioChange}
                            /> 
                            <span className="custom-radio"></span>
                            Root
                        </label>
                    )}
                    
                    {foldersInCategory.map(folder => {
                        return item.folderId !== folder.id && (
                            <>
                                <label className='available-locations__option'>
                                    <input
                                        className='available-locations__option__radio-button'
                                        type="radio"
                                        value={folder.id} 
                                        checked={selectedFolderId === folder.id} 
                                        onChange={handleRadioChange}
                                    />
                                    <span className="custom-radio"></span>
                                    {folder.name}
                                </label>
                            </>
                        )
                    })}
                </div>

            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container '>
                <button className='form__submit-button'> Move </button>
                <button className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>
        </form>
    )
}