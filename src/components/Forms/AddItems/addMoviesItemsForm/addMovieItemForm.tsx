import React, { useRef, useState } from 'react'
import './addMovieItemForm.scss'
import '../../Form.scss'
import { MoviesItemTypes } from '../../../../types/types';
import { NumberInput } from '../../../NumberInput/NumberInput';
import closeImg from '../../../../assets/images/close.png';

interface addMovieItemFormTypes {
    categoryId: string;
    itemType: string;
    onSubmit: (newItem:  MoviesItemTypes)=> void;
    onClose: ()=> void;
}

export const AddMovieItemForm: React.FC<addMovieItemFormTypes> =({ categoryId, itemType, onSubmit, onClose })=> {
    const [minuteValue, setMinuteValue] = useState<number>(0)
    const minuteInputRef = useRef<HTMLInputElement>(null)
    const [newItemData, setNewItemData] = useState({
        type: itemType,
        name: '',
        minute: 0,
        notes: '',
        completed: false,
        favorite: false,
        categoryId: categoryId,
        updatedAt: new Date().toISOString()
    })

    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemData({
            ...newItemData,
            name: e.target.value
        })
    }

    const onChangeMinute = (newValue: number) => {
        setMinuteValue(newValue)
        setNewItemData({
            ...newItemData,
            minute: newValue
        })
    }

    const resetMinuteInputValue = () => {
        if (minuteInputRef.current) {
            minuteInputRef.current.value = '0';
        }
        setMinuteValue(0);
    };

    const resetInputs = () => {
        setTimeout(()=>{
            setNewItemData({
                type: itemType,
                name: '',
                minute: 0,
                notes: '',
                completed: false,
                favorite: false,
                categoryId,
                updatedAt: new Date().toISOString(),
            });
                setMinuteValue(0);
        }, 300)
    }

    const handleNotesChange =(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewItemData({
            ...newItemData,
            notes: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(newItemData)
        resetInputs()
        onClose()
    }

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault()
        resetInputs()
        onClose()
    }


    return(
        <form onSubmit={handleSubmit} className='form add-movie-item-form'>

            <div className='form__title'> Adding movie</div>

            <div className='form-body'>

                <div className='field-container name-container'>
                    <label htmlFor='name' className='form_label'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        className='form__input'
                        required
                        value={newItemData.name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor='minute' className='form_label'>From minute</label>
                    <NumberInput
                        min={0}
                        name='minute'
                        ref={minuteInputRef}
                        value={minuteValue}
                        onChange={onChangeMinute}
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor='notes' className='form_label'>Notes:</label>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={newItemData.notes}
                        onChange={handleNotesChange}
                        rows={5}
                        cols={50}
                    />
                </div>


            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container'>
                <button className='form__submit-button'> Add </button>
                <button className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>
        </form>
    )
}