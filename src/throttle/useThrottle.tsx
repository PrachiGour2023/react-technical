import { useRef, useCallback } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number) {
    let lastExecuted = useRef(0);

    return useCallback(() => {
        let now = Date.now();
        let elapsedTime = now - lastExecuted.current;

        if (elapsedTime >= delay) {
            callback();
            lastExecuted.current = now
        }
    }, [callback, delay])
}