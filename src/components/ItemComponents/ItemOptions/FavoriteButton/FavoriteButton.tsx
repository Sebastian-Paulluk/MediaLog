import './FavoriteButton.scss'
import favoriteImg from '../../../../assets/images/favorite.png';
import favoriteAddedImg from '../../../../assets/images/favorite-added.png';
import { ItemTypes } from '../../../../types/types';

interface FavoriteButtonTypes {
    favorite: boolean;
    propName: keyof ItemTypes;
    updateItemStates: (propName: keyof ItemTypes) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonTypes> = (props) => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.updateItemStates(props.propName)
    };

    return (
        <button className='favorite-button' onClick={handleClick}>
            <img className='favorite-button__img' src={props.favorite ? favoriteAddedImg : favoriteImg} alt='favorite' />
        </button>
    )
}