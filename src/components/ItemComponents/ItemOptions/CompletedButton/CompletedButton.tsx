import './CompletedButton.scss'
import uncheckedButton from '../../../../assets/images/radio-button-unchecked.png';
import checkedButton from '../../../../assets/images/radio-button-checked.png';
import { ItemTypes } from '../../../../types/types';

interface CompletedButtonTypes {
    completed: boolean;
    propName: keyof ItemTypes;
    updateItemStates: (propName: keyof ItemTypes) => void;
}

export const CompletedButton: React.FC<CompletedButtonTypes> = (props) => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.updateItemStates(props.propName)
    };

    return (
        <button className='completed-button' onClick={handleClick}>
            <img className='completed-button__img' src={props.completed ? checkedButton : uncheckedButton} alt='completed-button' />
        </button>
    )
}