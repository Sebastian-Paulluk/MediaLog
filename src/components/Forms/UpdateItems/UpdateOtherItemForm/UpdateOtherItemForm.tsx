import { useEffect, useState } from 'react'
import { ItemTypes, OthersItemTypes } from '../../../../types/types'
import './UpdateOtherItemForm.scss'
import closeImg from '../../../../assets/images/close.png';
import emptyStarImg from '../../../../assets/images/favorite.png'
import filledStarImg from '../../../../assets/images/favorite-added.png'

interface UpdateOtherItemFormTypes {
    item: ItemTypes
    onClose: ()=> void;
    onSubmit: (updatedItem: Partial<ItemTypes>)=> void;
}

export const UpdateOtherItemForm: React.FC<UpdateOtherItemFormTypes> = ({ item, onClose, onSubmit }) => {
    const [otherItemData , setOtherItemData] = useState({
        name: item.name,
        favorite: item.favorite,
        notes: item.notes
    })

    const updateData = () => {
        setOtherItemData((prevData) => ({
            name: item.name,
            favorite: item.favorite,
            notes: item.notes
        }));
    }

    useEffect(() => {
        updateData()
    }, [item]);


    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherItemData({
            ...otherItemData,
            name: e.target.value
        })
    }

    const handleFavoriteChange = () => {
        setOtherItemData(prevData => ({
            ...prevData,
            favorite: !prevData.favorite,
        }));
    };


    const handleNotesChange =(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOtherItemData({
            ...otherItemData,
            notes: e.target.value
        })
    }

    const hasDataItemChanged = (currentData: Partial<OthersItemTypes>, originalItem: ItemTypes): boolean => {
        return currentData.name !== originalItem.name ||
               currentData.notes !== originalItem.notes;

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const hasDataChanges = hasDataItemChanged(otherItemData, item);

        if (hasDataChanges) {
            const updatedData = {
                ...otherItemData,
                categoryId: item.categoryId,  
                type: item.type,  
                completed: item.completed,  
                updatedAt: new Date().toISOString(), 
            };
    
            setOtherItemData(updatedData);
            onSubmit(updatedData);
        } else {
            onSubmit(otherItemData);
        }
        onClose();
    };

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault()
        setTimeout(()=>{updateData()},300)
        onClose()
    }


    return (
        <form onSubmit={handleSubmit} className="update-other-item-form form">

            <div className='form__title form__updating-title'>
                Updating:
                <div className='item-name'>{item.name}</div>
                <div className='fav-status'>
                    <img
                        src={otherItemData.favorite ? filledStarImg : emptyStarImg}
                        alt='fav-status'
                        className='fav-status__img'
                        onClick={handleFavoriteChange}
                    />
                </div>
            </div>

            <div className='form-body'>

                <div className='field-container from-min-container'>
                    <label htmlFor='name' className='form__label'>Name:</label>
                    <input
                        className='form__input'
                        type='text'
                        name='name'
                        required
                        value={otherItemData.name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className='field-container from-min-container'>
                    <label htmlFor='notes' className='form__label'>Notes:</label>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={otherItemData.notes}
                        rows={5}
                        cols={50}
                        onChange={handleNotesChange}
                    />
                </div>

            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container '>
                <button type='submit' className='form__submit-button'> Save changes </button>
                <button type='button' className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>

        </form>
    )
}