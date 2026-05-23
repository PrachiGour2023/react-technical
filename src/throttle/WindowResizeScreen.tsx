import { useState, useEffect } from 'react';
import { useThrottle } from './useThrottle';

export function WindowResizeScreen() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const handleWindowResize = () => {
        console.log('resize render')
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    const handleThrottledValue: any = useThrottle(handleWindowResize, 1000)

    useEffect(() => {
        window.addEventListener('resize', handleThrottledValue)

        return () => {
            window.removeEventListener('resize', handleThrottledValue)
        }
    }, [])

    return (
        <>
            <h1>Resizing Using Throttle</h1>
            <h3>{windowSize.width} * {windowSize.height}</h3>
        </>
    )
}