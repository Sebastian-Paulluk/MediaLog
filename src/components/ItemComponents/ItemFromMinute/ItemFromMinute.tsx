import './ItemFromMinute.scss'

interface ItemFromMinuteTypes {
    minute: number;
}

export const ItemFromMinute: React.FC<ItemFromMinuteTypes> = ({minute}) => {
    
    return (
        <div className='item-from-minute'>
            <p>From minute:</p>
            <p className='from-minute'>{minute}</p>
        </div>
    )
}