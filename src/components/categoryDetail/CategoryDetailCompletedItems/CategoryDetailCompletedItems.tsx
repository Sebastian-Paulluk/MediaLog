import { useState } from 'react';
import { ItemTypes } from '../../../types/types';
import { Item } from '../../ItemComponents/Item';
import './CategoryDetailCompletedItems.scss'
import arrowImg from '../../../assets/images/arrow.png';

interface CategoryDetailCompletedItemsTypes {
    items: ItemTypes[];
}

export const CategoryDetailCompletedItems: React.FC<CategoryDetailCompletedItemsTypes> = (props) => {
    const [ expanded , setExpanded] = useState<boolean>(false);

    const toggleListView =()=> {
        setExpanded(!expanded)
    }

    return (
        <div className={`category-detail-completed-items ${expanded ? 'expanded' : ''}`}>
            <h3 className='completed-title' onClick={toggleListView}>
                <p>Completed ({props.items.length})</p>
                <img className={`arrow-img ${expanded ? 'expanded' : ''}`} src={arrowImg} alt='open-list' />
            </h3>
            <div className='list-container'>
                {props.items.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        isNew={item.isNew}
                        changedCompletedState={item.changedCompletedState}
                        />
                    )
                )}
            </div>
        </div>
    )
}