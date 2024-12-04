import { ItemTypes } from '../../../types/types'
import './CategoryDetailUncompletedItems.scss'
import { Item } from '../../ItemComponents/Item';

interface CategoryDetailUncompletedItemsTypes {
    items: ItemTypes[];
}   

export const CategoryDetailUncompletedItems: React.FC<CategoryDetailUncompletedItemsTypes> = (props) => {

    return (
        <div className='category-detail-uncompleted-items'>
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
    )
}