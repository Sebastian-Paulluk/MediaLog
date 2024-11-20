import React, { useEffect, useState } from 'react';
import './Counter.scss';

interface CounterProps {
    min: number;
    name: string;
    value: number;
    onChange: (value: number) => void;
}

export const Counter = React.forwardRef<HTMLInputElement, CounterProps>(
    ({ min, name, value, onChange }, ref) => {

        const handleSubtract = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            const newValue = Math.max(min, value - 1);
            onChange(newValue);
        };

        const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            const newValue = value + 1; 
            onChange(newValue);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = Number(e.target.value);
            onChange(newValue);  
        };

        return (
            <div className="counter">
                <button className="counter-subtract-button" onClick={handleSubtract}>
                    -
                </button>
                <input
                    type="number"
                    className="counter-value"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    ref={ref}
                />
                <button className="counter-add-button" onClick={handleAdd}>
                    +
                </button>
            </div>
        );
    }
);

Counter.displayName = 'Counter';