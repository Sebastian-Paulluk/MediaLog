
import normalizeText from '../../../utils/normalizeText';
import './ItemName.scss'

interface ItemNameTypes {
    name: string;
}

export const ItemName: React.FC<ItemNameTypes> = ({name}) => {
    const itemName = normalizeText.firstLettersCaps(name);

    return (
        <div className='item-name'>
            <div className='item-name__content'>
                {itemName}
            </div>
        </div>
    )
}