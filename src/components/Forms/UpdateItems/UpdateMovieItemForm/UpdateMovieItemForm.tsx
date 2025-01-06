import { useEffect, useRef, useState } from 'react';
import { ItemTypes, MoviesItemTypes } from '../../../../types/types';
import './UpdateMovieItemForm.scss'
import closeImg from '../../../../assets/images/close.png';
import emptyStarImg from '../../../../assets/images/favorite.png'
import completedEmpyImg from '../../../../assets/images/radio-button-unchecked.png';
import completedFilledImg from '../../../../assets/images/radio-button-checked.png';
import filledStarImg from '../../../../assets/images/favorite-added.png'
import { Counter } from '../../../Counter/Counter';
import copyImg from '../../../../assets/images/copy.png';

interface UpdateMovieItemFormTypes {
    item: ItemTypes;
    onClose: ()=> void;
    onSubmit: (updatedItem: Partial<ItemTypes>)=> void;
}

const isMoviesItem = (item: ItemTypes): item is MoviesItemTypes => {
    return (item as MoviesItemTypes).minute !== undefined;
}

export const UpdateMovieItemForm: React.FC<UpdateMovieItemFormTypes> = ({item, onClose, onSubmit}) => {
    const minuteInpuRef = useRef(null)
    const [minute, setMinute] = useState<number>(
        isMoviesItem(item) ? item.minute : 0
    )
    const [movieItemData , setMovieItemData] = useState({
        name: item.name,
        favorite: item.favorite,
        completed: item.completed,
        minute: isMoviesItem(item) ? item.minute : 0,
        notes: item.notes
    });
    const [notesTextCopiedVisible , setNotesTextCopiedVisible] = useState<boolean>(false);

    const updateData = () => {
        setMovieItemData({
            name: item.name,
            favorite: item.favorite,
            completed: item.completed,
            minute: isMoviesItem(item) ? item.minute : 0,
            notes: item.notes
        });
        setMinute(isMoviesItem(item) ? item.minute : 0);
        setNotesTextCopiedVisible(false);
    };

    useEffect(() => {
        updateData()
    }, [item]);

    
    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieItemData({
            ...movieItemData,
            name: e.target.value
        })
    };

    const handleFavoriteChange = () => {
        setMovieItemData(prevData => ({
            ...prevData,
            favorite: !prevData.favorite,
        }));
    };

    const handleCompletedChange = () => {
        setMovieItemData(prevData => ({
            ...prevData,
            completed: !prevData.completed,
        }));
    };


    const onChangeFromMinute = (newValue: number) => {
        setMinute(newValue)
        setMovieItemData({
            ...movieItemData,
            minute: newValue
        })
    };

    const handleNotesChange =(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMovieItemData({
            ...movieItemData,
            notes: e.target.value
        })
    };


    const hasDataItemChanged = (currentData: Partial<MoviesItemTypes>, originalItem: ItemTypes): boolean => {
        if (isMoviesItem(originalItem)) {
            return currentData.name !== originalItem.name ||
            currentData.minute !== originalItem.minute ||
            currentData.notes !== originalItem.notes;
        }
        return false;
    }

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const hasDataChanges = hasDataItemChanged(movieItemData, item);

        if (hasDataChanges) {
            const updatedData = {
                ...movieItemData,
                categoryId: item.categoryId,  
                type: item.type,
                updatedAt: new Date().toISOString(), 
            };
    
            setMovieItemData(updatedData);
            onSubmit(updatedData);
        } else {
            onSubmit(movieItemData);
        }
        onClose();
    };


    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault();
        setTimeout(()=>{updateData()},300);
        onClose();
    };


    const copyTextToClipboard = async(text: string)=> {
        try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
                console.error("Error copying text: ", err);
        };
    };


    const handleCopyNotes =(e: React.FormEvent) =>{
        e.preventDefault();
        copyTextToClipboard(movieItemData.notes);
        setNotesTextCopiedVisible(true);
        setTimeout(()=>{
            setNotesTextCopiedVisible(false);
        },2000);
    };


    return (
        <form onSubmit={handleSubmit} className='update-movie-item-form form'>

            <div className='form__title form__updating-title'>
                Updating movie:
                <div className='item-name'>{item.name}</div>


                <div className='item-status'>
                    <img
                        src={movieItemData.favorite ? filledStarImg : emptyStarImg}
                        alt='fav-status'
                        className='item-status__fav-img'
                        onClick={handleFavoriteChange}
                    />
                    <img
                        src={movieItemData.completed ? completedFilledImg : completedEmpyImg}
                        alt='completed-status'
                        className='item-status__completed-img'
                        onClick={handleCompletedChange}
                    />
                </div>

            </div>

            <div className='form-body'>
            
                <div className='field-container from-min-container'>
                    <label htmlFor='name' className='form__label'>Name</label>
                    <input
                        className='form__input'
                        type='text'
                        name='name'
                        required
                        value={movieItemData.name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className='field-container'>
                    <label htmlFor='fromMinute' className='form__label'>From minute</label>
                    <Counter
                        min={0}
                        name='fromMinute'
                        ref={minuteInpuRef}
                        value={minute}
                        onChange={onChangeFromMinute}
                    />
                </div>

                <div className='field-container from-min-container'>
                    <div className='notes-label'>
                        <label htmlFor='notes' className='form__label'>Notes</label>
                        <p className={`copy-notes-text ${notesTextCopiedVisible ? 'visible' : ''}`}>Copied to clipboard</p>
                        <button className='copy-notes-button' onClick={handleCopyNotes}>
                            <img src={copyImg} className='copy-notes-button__img' alt='copy-img' />
                        </button>
                    </div>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={movieItemData.notes}
                        rows={2}
                        cols={50}
                        onChange={handleNotesChange}
                    />
                </div>

            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container'>
                <button type='submit' className='form__submit-button'> Save changes </button>
                <button type='button' className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>

        </form>
    )
}