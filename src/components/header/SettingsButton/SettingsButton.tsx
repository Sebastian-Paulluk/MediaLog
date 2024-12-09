import './SettingsButton.scss';
import settingsImg from '../../../assets/images/settings.png';
import React from 'react';
import { Link } from 'react-router-dom';

interface SettingsButtonTypes {
    
}

export const SettingsButton: React.FC<SettingsButtonTypes> = () => {
    

    return (
        <Link to='/settings'>
            <div className='settings-button'>
                <img src={settingsImg} alt='settings' className='settings-button__img' />
            </div>
        </Link>
    )
}