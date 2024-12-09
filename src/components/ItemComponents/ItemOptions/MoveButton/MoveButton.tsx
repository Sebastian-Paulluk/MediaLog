import './MoveButton.scss'
import moveItemImg from '../../../../assets/images/move.png'
import { ItemTypes } from '../../../../types/types';
import React from 'react';

interface MoveButtonTypes {
    item: ItemTypes;
    handleOpenMoveItemModal: ()=> void;
}

export const MoveButton: React.FC<MoveButtonTypes> = ({handleOpenMoveItemModal}) => {
    
    const handleClick =(e: React.MouseEvent)=> {
        e.stopPropagation();
        handleOpenMoveItemModal();
    }

    return (
        <>
            <div className='move-button' onClick={handleClick}>
                <img className='move-button__img' src={moveItemImg} alt='move-item' />
            </div>
        </>
    )
}