import './EditFolderForm.scss'

import closeImg from '../../../assets/images/close.png';
import { FolderTypes } from '../../../types/types';
import { useEffect, useState } from 'react';

interface EditFolderFormTypes {
        folder: FolderTypes;
        onClose: ()=> void;
        onSubmit: (updateFolder: Partial<FolderTypes>)=> void;
}

export const EditFolderForm: React.FC<EditFolderFormTypes> = ({folder, onClose, onSubmit}) => {
    const [folderData , setFolderData] = useState({
        name: folder.name
    })

    const updateData = () => {
        setFolderData({
            name: folder.name
        });
    }

    useEffect(() => {
        updateData()
    }, [folder]);

    const handleNameChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderData({
            ...folderData,
            name: e.target.value
        })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(folderData);
        onClose();
    };

    const handleCancel = (e: React.FormEvent) =>{
        e.preventDefault();
        setTimeout(()=>{updateData()},300);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="update-other-item-form form">

            <div className='form__title form__updating-title'>
                Updating:
                <div className='item-name'>{folder.name}</div>
            </div>

            <div className='form-body'>

                <label htmlFor='name' className='form__label'>Name</label>
                <input
                    className='form__input'
                    type='text'
                    name='name'
                    required
                    value={folderData.name}
                    onChange={handleNameChange}
                />

            </div>

            <button type='button' className='form__close-button' onClick={handleCancel}>
                <img className='form__close-button__img' src={closeImg} alt='close' />
            </button>

            <div className='form__buttons-container '>
                <button type='submit' className='form__submit-button'> Save changes </button>
                <button type='button' className='form__cancel-button' onClick={handleCancel}> Cancel </button>
            </div>

        </form>
    )
}