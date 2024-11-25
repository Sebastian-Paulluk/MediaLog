import { useRef, useState } from 'react';
import { ItemTypes } from '../../../types/types';
import { Item } from '../../ItemComponents/Item';
import './CategoryDetailCompletedItems.scss'
import arrowImg from '../../../assets/images/arrow.png';

interface CategoryDetailCompletedItemsTypes {
    items: ItemTypes[];
}

export const CategoryDetailCompletedItems: React.FC<CategoryDetailCompletedItemsTypes> = (props) => {
    const [expanded , setExpanded] = useState<boolean>(false);
    const titleRef = useRef<HTMLDivElement | null>(null);

    const toggleListView =()=> {
        setExpanded(!expanded)
        setTimeout(()=>{
            if (!expanded && titleRef.current) {
                titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (expanded && titleRef.current) {
                titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        },100)
    }



    return (
        <div
            className={
                `category-detail-completed-items
                ${expanded ? 'expanded' : ''}`
            }
        >
            <h3 className='completed-title' onClick={toggleListView} ref={titleRef}>
                <p className='completed-text'>Completed ({props.items.length})</p>
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