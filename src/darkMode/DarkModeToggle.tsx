import { useState } from 'react'
import './index.css'

const DarkModeToggle = () => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const toggleMode = (): void => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className={`container ${isDarkMode ? 'dark-mode': 'light-mode'}`}>
            <h2>Dark Mode Toggle</h2>
            <div className='toggle-container'>
                <label className='switch'>
                    <input type="checkbox" checked={isDarkMode} onChange={toggleMode} />
                    <span className='slider'></span>
                </label>
            </div>
        </div>
    )
}

export default DarkModeToggle