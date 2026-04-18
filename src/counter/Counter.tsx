import { useState } from 'react'
import './index.css'

const Counter = () => {

    const [count, setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount((prev) => prev + 1)
    }

    const handleDecrement = () => {
        setCount((prev) => prev - 1)
    }

    const handleReset = () => {
        setCount(0)
    }

    return (
        <div className='container'>
            <h3>Counter {count}</h3>
            <button className='button' onClick={handleIncrement}>Increment</button>
            <button className='button' onClick={handleDecrement}>Decrement</button>
            <button className='button' onClick={handleReset}>Reset</button>
        </div>
    )
}

export default Counter