import { ItemTypes } from '../../../types/types';
import { CompletedButton } from './CompletedButton/CompletedButton'
import { DeleteItemButton } from './DeleteItemButton/DeleteItemButton'
import { FavoriteButton } from './FavoriteButton/FavoriteButton'
import './ItemOptions.scss'

interface ItemOptionsTypes {
    favorite: boolean;
    completed: boolean;
    updateItemStates: (propName: keyof ItemTypes) => void;
    deleteItem: () => void;
}

export const ItemOptions: React.FC<ItemOptionsTypes> = (props) => {

    const favoriteButtonProps = {
        favorite: props.favorite,
        propName: 'favorite' as keyof ItemTypes,
        updateItemStates: props.updateItemStates
    }

    const completedButtonProps = {
        completed: props.completed,
        propName: 'completed'as keyof ItemTypes,
        updateItemStates: props.updateItemStates
    }

    return (
        <div className='item-options'>
            <FavoriteButton {...favoriteButtonProps}/>
            <CompletedButton {...completedButtonProps}/>
            <DeleteItemButton deleteItem={props.deleteItem} />
        </div>
    )
}