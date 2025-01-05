import React, { useEffect, useRef, useState } from 'react';
import { ItemTypes } from '../../../types/types';
import { CompletedButton } from './CompletedButton/CompletedButton'
import { DeleteItemButton } from './DeleteItemButton/DeleteItemButton'
import { FavoriteButton } from './FavoriteButton/FavoriteButton'
import './ItemOptions.scss'
import { Dots } from '../../home/CategoryComponentes/Dots/Dots';
import { MoveButton } from './MoveButton/MoveButton';

interface ItemOptionsTypes {
    item: ItemTypes;
    updateItemStates: (propName: keyof ItemTypes) => void;
    deleteItem: () => void;
    handleOpenMoveItemModal: ()=> void;
}

export const ItemOptions: React.FC<ItemOptionsTypes> = (props) => {
    const [open , setOpen] = useState<Boolean>(false);
    const optionsContainerRef =  useRef<HTMLDivElement | null>(null);
    const optionsOpenButtonRef =  useRef<HTMLButtonElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            optionsContainerRef.current &&
            optionsOpenButtonRef.current &&
            !optionsContainerRef.current.contains(event.target as Node) &&
            !optionsOpenButtonRef.current.contains(event.target as Node)
        ) {
            setOpen(false);
        }
    };

    const handleOpen =(e: React.MouseEvent<HTMLButtonElement>)=> {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!open);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return ()=> {
            document.removeEventListener("mousedown", handleClickOutside);
        } 
    }, []);

    const favoriteButtonProps = {
        favorite: props.item.favorite,
        propName: 'favorite' as keyof ItemTypes,
        updateItemStates: props.updateItemStates
    }

    const completedButtonProps = {
        completed: props.item.completed,
        propName: 'completed'as keyof ItemTypes,
        updateItemStates: props.updateItemStates
    };

    return (
        <div className='item-options-container' ref={optionsContainerRef}>

            <div className={`item-options ${open ? 'open' : ''}`}>
                <FavoriteButton {...favoriteButtonProps}/>
                <CompletedButton {...completedButtonProps}/>
                <div className='separator' />
                <MoveButton item={props.item} handleOpenMoveItemModal={props.handleOpenMoveItemModal}/>
                <DeleteItemButton deleteItem={props.deleteItem} />
            </div>

            <button
                className='item-options-container__button'
                onClick={handleOpen}
                ref= {optionsOpenButtonRef}
            >
                <Dots />
            </button>

        </div>
    );
};