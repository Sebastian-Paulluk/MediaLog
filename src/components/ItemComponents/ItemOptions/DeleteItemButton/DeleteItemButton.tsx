import React from 'react';
import './DeleteItemButton.scss'
import deleteItemImg from '../../../../assets/images/delete.png'

interface DeleteItemButtonTypes {
    deleteItem: ()=> void;
}

export const DeleteItemButton: React.FC<DeleteItemButtonTypes> = ({deleteItem}) => {
    
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteItem();
    }

    return (
        <button className='delete-item-button'>
            <img className='delete-item-button__img' src={deleteItemImg} alt='delete' onClick={handleClick} />
        </button>
    )
}