import './ItemNotes.scss'

interface ItemNotesTypes {
    notes: string;
}

export const ItemNotes: React.FC<ItemNotesTypes> = ({notes}) => {
    
    return (
        <div className='item-notes'>
            <p className='item-notes__content'>
                {notes}
            </p>
        </div>
    )
}