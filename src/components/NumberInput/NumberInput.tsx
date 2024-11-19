import { InputNumber } from 'antd'
import './NumberInput.scss'
import { forwardRef } from 'react';
import type { InputNumberProps } from 'antd';

interface NumberInputTypes {
    value: number,
    name?: string,
    min?: number
    onChange: (newValue: number) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputTypes>(({  value, name, min, onChange }, ref) => {

    const handleChange: InputNumberProps['onChange'] = (value) => {
        if (typeof value === 'number') { 
            onChange(value);
        } else if (typeof value === 'string') {
            const parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {  
                onChange(parsedValue);
            }
        }
    }

    return (
        <div className='number-input'>
            <InputNumber name={name} ref={ref} min={min} value={value} onChange={handleChange} />
        </div>
    );
});