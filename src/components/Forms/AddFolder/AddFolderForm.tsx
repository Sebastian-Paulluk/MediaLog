import React, { useState } from 'react'
import closeImg from '../../../assets/images/close.png';
import { FolderTypes } from '../../../types/types';

interface addOtherItemFormTypes {
    categoryId: string;
    onSubmit: (newFolder: FolderTypes)=> void;
    onClose: ()=> void;
}

export const AddFolderForm: React.FC<addOtherItemFormTypes> =({ categoryId, onSubmit, onClose })=> {
    const [newFolderData, setNewFolderData] = useState({
        name: '',
        categoryId: categoryId,
        updatedAt: new Date().toISOString(),
    })

    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFolderData({
            ...newFolderData,
            name: e.target.value
        })
    }


    const resetInputs = () => {
        setTimeout(()=>{
            setNewFolderData({
                name: '',
                categoryId: categoryId,
                updatedAt: new Date().toISOString(),
            });
        }, 300)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(newFolderData)
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
                Adding folder
            </div>

            <div className='form-body'>

                <div className='field-container'>
                    <label htmlFor='name' className='form__label'>Name</label>
                    <input
                        className='form__input'
                        type='text'
                        name='name'
                        required
                        value={newFolderData.name}
                        onChange={handleNameChange}
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