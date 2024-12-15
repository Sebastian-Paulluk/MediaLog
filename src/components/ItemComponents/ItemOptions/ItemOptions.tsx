import { ItemTypes } from '../../../types/types';
import { CompletedButton } from './CompletedButton/CompletedButton'
import { FavoriteButton } from './FavoriteButton/FavoriteButton'
import './ItemOptions.scss'
import { Dots } from '../../home/CategoryComponentes/Dots/Dots';
import { PopMenu } from '../../PopMenu/PopMenu';

interface ItemOptionsTypes {
    item: ItemTypes;
    updateItemStates: (propName: keyof ItemTypes) => void;
    deleteItem: () => void;
    handleOpenMoveItemModal: ()=> void;
}

export const ItemOptions: React.FC<ItemOptionsTypes> = (props) => {

    const favoriteButtonProps = {
        favorite: props.item.favorite,
        propName: 'favorite' as keyof ItemTypes,
        updateItemStates: props.updateItemStates
    };

    const completedButtonProps = {
        completed: props.item.completed,
        propName: 'completed'as keyof ItemTypes,
        updateItemStates: props.updateItemStates
    };

    const popMenuProps = {
		options: [
			{name: 'Move', icon: 'move', onClick: props.handleOpenMoveItemModal},
			{name: 'Delete', icon: 'delete', onClick: props.deleteItem},
		]
	};

    return (
        <div 
            className='item-options-container'
        >

            <div className='item-options'>
                <FavoriteButton {...favoriteButtonProps}/>
                <CompletedButton {...completedButtonProps}/>
            </div>

            <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <PopMenu {...popMenuProps}>
                    <Dots />
                </PopMenu>
            </div>

        </div>
    );
};