import './SettingsButton.scss';
import settingsImg from '../../../assets/images/settings.png';
import React from 'react';

interface SettingsButtonTypes {
    
}

export const SettingsButton: React.FC<SettingsButtonTypes> = () => {

    return (
        <div className='settings-button'>
            <img src={settingsImg} alt='settings' className='settings-button__img' />
        </div>
    )
}