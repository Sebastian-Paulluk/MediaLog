import { useEffect, useRef, useState } from 'react';
import { ItemTypes, SeriesItemTypes } from '../../../../types/types';
import './UpdateSeriesItemForm.scss'
import { NumberInput } from '../../../NumberInput/NumberInput';
import closeImg from '../../../../assets/images/close.png';
import emptyStarImg from '../../../../assets/images/favorite.png'
import filledStarImg from '../../../../assets/images/favorite-added.png'

interface UpdateSeriesItemFormTypes {
    item: ItemTypes;
    onClose: ()=> void;
    onSubmit: (updatedItem: Partial<ItemTypes>)=> void;
    openModal: boolean;
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
        season: isSeriesItem(item) ? item.season : 1,
        episode: isSeriesItem(item) ? item.episode : 1,
        notes: item.notes,
    });

    const updateData = () => {
        setSeriesItemData({
            name: item.name,
            favorite: item.favorite,
            season: isSeriesItem(item) ? item.season : 1,
            episode: isSeriesItem(item) ? item.episode : 1,
            notes: item.notes,
        });
    
        setSeasonValue(isSeriesItem(item) ? item.season : 1);
        setEpisodeValue(isSeriesItem(item) ? item.episode : 1);
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
                completed: item.completed,  
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


    return (
        <form onSubmit={handleSubmit} className='update-series-item-form form'>
            
            <div className='form__title form__updating-title'>
                Updating series:
                <div className='item-name'>{item.name}</div>
                <div className='fav-status'>
                    <img
                        src={seriesItemData.favorite ? filledStarImg : emptyStarImg}
                        alt='fav-status'
                        className='fav-status__img'
                        onClick={handleFavoriteChange}
                    />
                </div>
            </div>

            <div className='form-body'>

                <div className='field-container name-container'>
                    <label htmlFor='name' className='form_label'>Name:</label>
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
                        <NumberInput
                            min={1}
                            name='season'
                            ref={seasonInputRef}
                            value={seasonValue}
                            onChange={onChangeSeason}
                        />
                    </div>

                    <div className='field-container'>
                        <label htmlFor='episode' className='form_label'>Episode</label>
                        <NumberInput
                            min={1}
                            name='episode'
                            ref={episodeInputRef}
                            value={episodeValue}
                            onChange={onChangeEpisode}
                        />
                    </div>
                </div>

                <div className='field-container'>
                    <label htmlFor='notes' className='form_label'>Notes:</label>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={seriesItemData.notes}
                        onChange={handleNotesChange}
                        rows={5}
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