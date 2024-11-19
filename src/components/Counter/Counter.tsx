import { useState } from 'react'
import './Counter.scss'

interface CounterTypes {
    
}

export const Counter = () => {
    const [counterValue, setCounterValue] = useState<number>(0)

    const handleSubtract =(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setCounterValue(Math.max(0, counterValue - 1))
    }

    const handleAdd =(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setCounterValue( counterValue + 1)
    }

    const onChange =(e: React.ChangeEvent<HTMLInputElement>) =>{
        setCounterValue(Number(e.target.value))
    }

    return (
        <div className='counter'>
            <button className='counter-subtract-button' onClick={handleSubtract}>-</button>
            <input type='number' className='cunter-value' onChange={onChange} value={counterValue}></input>
            <button className='counter-add-button' onClick={handleAdd}>+</button>
        </div>
    )
}