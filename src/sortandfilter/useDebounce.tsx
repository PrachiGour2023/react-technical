import React, { useEffect } from 'react'

function useDebounce(value: string, delay: number) {

    const [debouncedValue, setDebouncedValue] = React.useState<string>('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue;
}

export default useDebounce