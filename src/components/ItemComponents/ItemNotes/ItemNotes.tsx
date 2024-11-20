import normalizeText from '../../../utils/normalizeText';
import './ItemNotes.scss'

interface ItemNotesTypes {
    notes: string;
}

export const ItemNotes: React.FC<ItemNotesTypes> = ({notes}) => {
    const normalizedNotes = normalizeText.firstLetterCaps(notes)

    return (
        <div className='item-notes'>
            <p className='item-notes__content'>
                {notes ? normalizedNotes : <p className='no-notes'>...</p>}
            </p>
        </div>
    )
}