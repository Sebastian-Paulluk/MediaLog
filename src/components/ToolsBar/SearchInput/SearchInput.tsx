import './SearchInput.scss';
import searchLightImg from '../../../assets/images/search_light.png';
import cancelImage from '../../../assets/images/cancel.png';
import { useState } from 'react';
import { useCurrentCategoryContext } from '../../../context/categoryContext';
import { useNavigate } from 'react-router-dom';

interface SearchInputTypes {
    
}

export const SearchInput: React.FC<SearchInputTypes> = () => {
    const [searchQuery , setSearchQuery] = useState('')
    const {currentCategory} = useCurrentCategoryContext()
    const navigate = useNavigate()

    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=> {
        setSearchQuery(e.target.value)
    }

    const clearSearch = () => {
        setSearchQuery('')
    }

    const search =()=> {
        if (currentCategory) {
            navigate(`search/category/${currentCategory.id}/${searchQuery}`)
        } else {
            navigate(`search/${searchQuery}`)
        }
    }

    const handleFormSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        if (searchQuery) {
            search()
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className='search-input-container'>
            <input
                type='search'
                className='search-input'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleInputChange}
            />

            {searchQuery && (
                <button
                    type='button'
                    onClick={clearSearch}
                    className='clear-search-button'
                >
                    <img
                        className='cancel-image'
                        src={cancelImage}
                        alt='cancel-img'
                    />
                </button>
            )}

            <button type='submit' className='search-button'>
                <img
                    className='search-button__img'
                    src={searchLightImg}
                    alt='button-search-img'
                />
            </button>

        </form>
    )
}