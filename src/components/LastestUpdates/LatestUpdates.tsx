import { useEffect, useState } from 'react';
import { useDataContext } from '../../context/DataContext'
import './LatestUpdates.scss'
import { ItemTypes } from '../../types/types';
import { Item } from '../ItemComponents/Item';
import arrowImg from '../../assets/images/arrow.png'

interface LastestUpdatesTypes {
    
}

export const LatestUpdates: React.FC<LastestUpdatesTypes> = () => {
    const {items, getLastUpdatedItems} = useDataContext();
    const [localItems , setLocalItems] = useState<ItemTypes[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const lastUpdatedItems = getLastUpdatedItems();
        setLocalItems(lastUpdatedItems);
    }, [items]);

    const handleClick =()=> {
        setOpen(!open);
    }

    return (
        <div 
            className={
                `latest-updates
                ${open ? '' : 'close'}
                ${localItems.length === 0 ? 'empty' : ''}`
            }
        >
            <div className='latest-updates__title' onClick={handleClick}>
                Latest updates
                <img
                    src={arrowImg}
                    alt='open latest updates list'
                    className='latest-updates__title__arrow'
                />
            </div>
            <div className='latest-updates__items-container'>
                {localItems.map(item => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}