import { useRef, useState } from 'react';
import { SeriesItemTypes } from '../../../../types/types';
import './AddSeriesItemForm.scss'
import closeImg from '../../../../assets/images/close.png';
import emptyStarImg from '../../../../assets/images/favorite.png'
import filledStarImg from '../../../../assets/images/favorite-added.png'
import { Counter } from '../../../Counter/Counter';

interface AddSeriesItemFormTypes {
    categoryId: string;
    itemType: string;
    onSubmit: (newItem:  SeriesItemTypes)=> void;
    onClose: ()=> void;
}

export const AddSeriesItemForm: React.FC<AddSeriesItemFormTypes> = ({ categoryId, itemType ,onSubmit, onClose}) => {
    const [seasonValue , setSeasonValue] = useState<number>(1);
    const [episodeValue , setEpisodeValue] = useState<number>(1);
    const seasonInputRef = useRef<HTMLInputElement>(null)
    const episodeInputRef = useRef<HTMLInputElement>(null)
    const [newSeriesData , setNewSeriesData] = useState({
        type: itemType,
        name: '',
        season: 1,
        episode: 1,
        notes: '',
        completed: false,
        favorite: false,
        categoryId: categoryId,
        updatedAt: new Date().toISOString(),
    });

    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSeriesData({
            ...newSeriesData,
            name: e.target.value
        })
    }

    const handleFavoriteChange = () => {
        setNewSeriesData(prevData => ({
            ...prevData,
            favorite: !prevData.favorite,
        }));
    };

    const onChangeSeason = (newValue: number) => {
        setSeasonValue(newValue)
        setNewSeriesData({
            ...newSeriesData,
            season: newValue
        })
    }

    const onChangeEpisode = (newValue: number) => {
        setEpisodeValue(newValue)
        setNewSeriesData({
            ...newSeriesData,
            episode: newValue
        })
    }

    const handleNotesChange =(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewSeriesData({
            ...newSeriesData,
            notes: e.target.value
        })
    }

    const resetInputs = () => {
        setTimeout(()=>{
            setSeasonValue(1);
            setEpisodeValue(1);
            setNewSeriesData({
                type: itemType,
                name: '',
                season: 1,
                episode: 1,
                notes: '',
                completed: false,
                favorite: false,
                categoryId,
                updatedAt: new Date().toISOString(),
            });
        }, 300)
    }

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault()
        resetInputs()
        onClose()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(newSeriesData)
        resetInputs()
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className='add-series-item-form form'>

            <div className='form__title'>
                Adding serie

                <div className='item-status'>
                    <img
                        src={newSeriesData.favorite ? filledStarImg : emptyStarImg}
                        alt='fav-status'
                        className='item-status__fav-img'
                        onClick={handleFavoriteChange}
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
                        value={newSeriesData.name}
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
                    <label htmlFor='notes' className='form_label'>Notes</label>
                    <textarea
                        className='form__notes'
                        name='notes'
                        value={newSeriesData.notes}
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
                <button className='form__submit-button'> Add </button>
                <button className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>

        </form>
    )
}