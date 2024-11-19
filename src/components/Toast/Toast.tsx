import { useEffect, useState } from 'react';
import { useDataContext } from '../../context/DataContext'
import './Toast.scss'
import { Spin } from '../Spin/Spin';

interface ToastTypes {
    
}

export const Toast: React.FC<ToastTypes> = () => {
    const {changesSaved} = useDataContext();

    return (
        <div className={`toast ${changesSaved ? '' : 'visible'}`}>
            <Spin />
        </div>
    )
}