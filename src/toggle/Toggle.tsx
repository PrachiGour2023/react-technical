import { useState } from 'react'
import "./index.css"

const Toggle = () => {

    const [toggleOn, setToggleOn] = useState<boolean>(false)

    const handleToggle = () => {
        setToggleOn((prev) => !prev)
    }

    return (
        <div className='container'>
            <h1>Toggle</h1>

            <div role='switch' aria-checked={toggleOn} className='switch' style={{
                backgroundColor: toggleOn ? 'red' : 'grey'
            }} onClick={handleToggle}>
                <div className='slider' style={{
                    transform: toggleOn ? "translateX(30px)" : "translateX(0)"
                }}></div>
            </div>
        </div>
    )
}

export default Toggle