import React, { useState } from 'react'
import '../Form.scss'
import './addCategoryForm.scss'
import { CategoryTypes } from '../../../types/types';
import closeImg from '../../../assets/images/close.png';
import { useUserContext } from '../../../context/userContext';

interface addCategoryFormTypes {
    onSubmit: (newCategory:  Omit<CategoryTypes, 'id'>)=> void;
    onClose: ()=> void;
}

export const AddCategoryForm: React.FC<addCategoryFormTypes> =({ onSubmit, onClose })=> {
    const { user } = useUserContext();
    const [newCategoryData, setNewCategoryData] = useState({
        name: '',
        type: 'Others',
        updatedAt: new Date().toISOString()
    })

    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryData({
            ...newCategoryData,
            name: e.target.value
        })
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryData({
            ...newCategoryData,
            type: e.target.value
        })
    }

    const resetInputs = () => {
        setTimeout(()=>{
            setNewCategoryData({
                name: '',
                type: 'Others',
                updatedAt: new Date().toISOString()
            });
        }, 300)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (user) {
            const newCategory = { 
                ...newCategoryData, 
                userId: user.uid
            };
            onSubmit(newCategory);
        }
        resetInputs()
        onClose()
    }

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault()
        resetInputs()
        onClose()
    }

    return(
        <form onSubmit={handleSubmit} className='form add-category-form'>
            
            <div className='form__title'>Creating category</div>

            <div className='form-body'>

                <div className='field-container'>
                    <label htmlFor='name' className='form__label'>Name</label>
                    <input
                        className='form__input new-category-name-input'
                        type='text'
                        name='name'
                        required
                        value={newCategoryData.name}
                        onChange={handleNameChange}
                    />
                </div>
                
                <div className='field-container'>
                    <div className='type-options-container'>

                        <label className='type-label form__label'>Type</label>
                        
                        <label className='form__type-label'>
                            <input
                                className='category-type-radio-button'
                                type= 'radio'
                                name= 'option'
                                value= 'Series'
                                checked= {newCategoryData.type === 'Series'}
                                onChange= {handleTypeChange}
                            />
                            <span className="custom-radio"></span>
                            Series
                        </label>

                        <label className='form__type-label'>
                            <input
                                className='category-type-radio-button'
                                type= 'radio'
                                name= 'option'
                                value= 'Movies'
                                checked= {newCategoryData.type === 'Movies'}
                                onChange= {handleTypeChange}
                            />
                            <span className="custom-radio"></span>
                            Movie
                        </label>

                        <label className='form__type-label'>
                            <input
                                className='category-type-radio-button'
                                type= 'radio'
                                name= 'option'
                                value= 'Others'
                                checked= {newCategoryData.type === 'Others'}
                                onChange= {handleTypeChange}
                            />
                            <span className="custom-radio"></span>
                            Other
                        </label>
                    </div>
                </div>

            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container'>
                <button className='form__submit-button'> Create </button>
                <button className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>
        </form>
    )
}