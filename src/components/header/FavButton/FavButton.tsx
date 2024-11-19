import './FavButton.scss'
import favoriteFullImg from '../../../assets/images/favorite-added.png';
import favoriteEmptyImg from '../../../assets/images/favorite.png';
import { useEffect, useState } from 'react';
import { Drawer } from '../../Drawer/Drawer';
import { useDataContext } from '../../../context/DataContext';

interface FavButtonTypes {
    
}

export const FavButton: React.FC<FavButtonTypes> = () => {
    const {items, existsFavoriteItems} = useDataContext();
    const [favoriteItems , setFavoriteItems] = useState<boolean>(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setFavoriteItems(existsFavoriteItems())
    }, [items]);

    const openDrawer = () => setOpen(true);
    const hideDrawer = () => setOpen(false);
    
    return (
        <>
            <button className='fav-button' onClick={openDrawer}>
                <img
                    className='fav-button__img'
                    src={favoriteItems ? favoriteFullImg : favoriteEmptyImg}
                    alt='favorite'
                />
            </button>
            <Drawer hideDrawer={hideDrawer} open={open} />
        </>
    )
}