import { useEffect, useRef, useState } from 'react';
import { ItemTypes, SeriesItemTypes } from '../../../../types/types';
import './UpdateSeriesItemForm.scss'
import closeImg from '../../../../assets/images/close.png';
import completedEmpyImg from '../../../../assets/images/radio-button-unchecked.png';
import completedFilledImg from '../../../../assets/images/radio-button-checked.png';
import emptyStarImg from '../../../../assets/images/favorite.png'
import filledStarImg from '../../../../assets/images/favorite-added.png'
import { Counter } from '../../../Counter/Counter';
import copyImg from '../../../../assets/images/copy.png';

interface UpdateSeriesItemFormTypes {
    item: ItemTypes;
    onClose: ()=> void;
    onSubmit: (updatedItem: Partial<ItemTypes>)=> void;
}

const isSeriesItem = (item: ItemTypes): item is SeriesItemTypes => {
    return (item as SeriesItemTypes).season !== undefined;
}

export const UpdateSeriesItemForm: React.FC<UpdateSeriesItemFormTypes> = ({item, onClose, onSubmit}) => {
    const [seasonValue , setSeasonValue] = useState<number>(
        isSeriesItem(item) ? item.season : 1,
    );
    const [episodeValue , setEpisodeValue] = useState<number>(
        isSeriesItem(item) ? item.episode : 1,
    );
    const seasonInputRef = useRef<HTMLInputElement>(null)
    const episodeInputRef = useRef<HTMLInputElement>(null)
    const [seriesItemData , setSeriesItemData] = useState({
        name: item.name,
        favorite: item.favorite,
        completed: item.completed,
        season: isSeriesItem(item) ? item.season : 1,
        episode: isSeriesItem(item) ? item.episode : 1,
        notes: item.notes,
    });
    const [notesTextCopiedVisible , setNotesTextCopiedVisible] = useState<boolean>(false);


    const updateData = () => {
        setSeriesItemData({
            name: item.name,
            favorite: item.favorite,
            completed: item.completed,
            season: isSeriesItem(item) ? item.season : 1,
            episode: isSeriesItem(item) ? item.episode : 1,
            notes: item.notes,
        });
    
        setSeasonValue(isSeriesItem(item) ? item.season : 1);
        setEpisodeValue(isSeriesItem(item) ? item.episode : 1);
        setNotesTextCopiedVisible(false);
    }

    useEffect(() => {
        updateData()
    }, [item]);


    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setSeriesItemData({
            ...seriesItemData,
            name: e.target.value
        })
    }

    const handleFavoriteChange = () => {
        setSeriesItemData(prevData => ({
            ...prevData,
            favorite: !prevData.favorite,
        }));
    };
    
    const handleCompletedChange = () => {
        setSeriesItemData(prevData => ({
            ...prevData,
            completed: !prevData.completed,
        }));
    };

    const onChangeSeason = (newValue: number) => {
        setSeasonValue(newValue)
        setSeriesItemData({
            ...seriesItemData,
            season: newValue
        })
    }

    const onChangeEpisode = (newValue: number) => {
        setEpisodeValue(newValue)
        setSeriesItemData({
            ...seriesItemData,
            episode: newValue
        })
    }

    const handleNotesChange =(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSeriesItemData({
            ...seriesItemData,
            notes: e.target.value
        })
    }

    const hasDataItemChanged = (currentData: Partial<SeriesItemTypes>, originalItem: ItemTypes): boolean => {
        if (isSeriesItem(originalItem)) {
            return currentData.name !== originalItem.name ||
            currentData.notes !== originalItem.notes ||
            currentData.season !== originalItem.season ||
            currentData.episode !== originalItem.episode;
        }
        return false;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const hasDataChanges = hasDataItemChanged(seriesItemData, item);

        if (hasDataChanges) {
            const updatedData = {
                ...seriesItemData,
                categoryId: item.categoryId,  
                type: item.type, 
                updatedAt: new Date().toISOString(), 
            };
    
            setSeriesItemData(updatedData);
            onSubmit(updatedData);
        } else {
            onSubmit(seriesItemData);
        }
        onClose();
    };
    

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault()
        setTimeout(()=>{updateData()},300)
        onClose()
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
        copyTextToClipboard(seriesItemData.notes);
        setNotesTextCopiedVisible(true);
        setTimeout(()=>{
            setNotesTextCopiedVisible(false);
        },2000);
    };


    return (
        <form onSubmit={handleSubmit} className='update-series-item-form form'>
            
            <div className='form__title form__updating-title'>
                Updating series:
                <div className='item-name'>{item.name}</div>

                <div className='item-status'>
                    <img
                        src={seriesItemData.favorite ? filledStarImg : emptyStarImg}
                        alt='fav-status'
                        className='item-status__fav-img'
                        onClick={handleFavoriteChange}
                    />
                    <img
                        src={seriesItemData.completed ? completedFilledImg : completedEmpyImg}
                        alt='completed-status'
                        className='item-status__completed-img'
                        onClick={handleCompletedChange}
                    />
                </div>
                
            </div>

            <div className='form-body'>

                <div className='field-container name-container'>
                    <label htmlFor='name' className='form_label'>Name</label>
                    <input
                        type='text'
                        name='name'
                        className='form__input'
                        required
                        value={seriesItemData.name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className='field-container season-episode-container'>
                    <div className='field-container'>
                        <label htmlFor='season' className='form_label'>Season</label>
                        <Counter
                            min={1}
                            name='season'
                            ref={seasonInputRef}
                            value={seasonValue}
                            onChange={onChangeSeason}
                        />
                    </div>

                    <div className='field-container'>
                        <label htmlFor='episode' className='form_label'>Episode</label>
                        <Counter
                            min={1}
                            name='episode'
                            ref={episodeInputRef}
                            value={episodeValue}
                            onChange={onChangeEpisode}
                        />
                    </div>
                </div>

                <div className='field-container'>
                    <div className='notes-label'>
                        <label htmlFor='notes' className='form__label'>Notes</label>
                        <p className={`copy-notes-text ${notesTextCopiedVisible ? 'visible' : ''}`}>Copied to clipboard</p>
                        <button
                            className={`copy-notes-button ${!seriesItemData.notes ? 'disabled' : ''}`}
                            onClick={handleCopyNotes}
                        >
                            <img src={copyImg} className='copy-notes-button__img' alt='copy-img' />
                        </button>
                    </div>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={seriesItemData.notes}
                        onChange={handleNotesChange}
                        rows={2}
                        cols={50}
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