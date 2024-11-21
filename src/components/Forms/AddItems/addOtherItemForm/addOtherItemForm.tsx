import React, { useState } from 'react'
import './addOtherItemForm.scss'
import { OthersItemTypes } from '../../../../types/types';
import emptyStarImg from '../../../../assets/images/favorite.png'
import filledStarImg from '../../../../assets/images/favorite-added.png'
import closeImg from '../../../../assets/images/close.png';

interface addOtherItemFormTypes {
    categoryId: string;
    itemType: string;
    onSubmit: (newItem:  OthersItemTypes)=> void;
    onClose: ()=> void;
}

export const AddOtherItemForm: React.FC<addOtherItemFormTypes> =({ categoryId, itemType, onSubmit, onClose })=> {
    const [newItemData, setNewItemData] = useState({
        type: itemType,
        name: '',
        notes: '',
        completed: false,
        favorite: false,
        categoryId: categoryId,
        updatedAt: new Date().toISOString(),
    })

    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemData({
            ...newItemData,
            name: e.target.value
        })
    }

    const handleFavoriteChange = () => {
        setNewItemData(prevData => ({
            ...prevData,
            favorite: !prevData.favorite,
        }));
    };

    const handleNotesChange =(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewItemData({
            ...newItemData,
            notes: e.target.value
        })
    }



    const resetInputs = () => {
        setTimeout(()=>{
            setNewItemData({
                type: itemType,
                name: '',
                notes: '',
                completed: false,
                favorite: false,
                categoryId,
                updatedAt: new Date().toISOString(),
            });
        }, 300)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(newItemData)
        resetInputs();
        onClose()
    }

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault()
        resetInputs();
        onClose()
    }


    return(
        <form onSubmit={handleSubmit} className='form add-other-item-form'>
            
            <div className='form__title'>
                Adding item

                <div className='item-status'>
                    <img
                        src={newItemData.favorite ? filledStarImg : emptyStarImg}
                        alt='fav-status'
                        className='item-status__fav-img'
                        onClick={handleFavoriteChange}
                    />
                </div>
                
            </div>

            <div className='form-body'>

                <div className='field-container'>
                    <label htmlFor='name' className='form__label'>Name:</label>
                    <input
                        className='form__input'
                        type='text'
                        name='name'
                        required
                        value={newItemData.name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor='notes' className='form__label'>Notes:</label>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={newItemData.notes}
                        onChange={handleNotesChange}
                        rows={2}
                        cols={50}
                    />
                </div>

            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container '>
                <button className='form__submit-button'> Add </button>
                <button className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>
        </form>
    )
}