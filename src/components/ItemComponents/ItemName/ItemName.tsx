import './ItemName.scss'

interface ItemNameTypes {
    name: string;
}

export const ItemName: React.FC<ItemNameTypes> = ({name}) => {
    
    return (
        <div className='item-name'>
            <div className='item-name__content'>
                {name}
            </div>
        </div>
    )
}