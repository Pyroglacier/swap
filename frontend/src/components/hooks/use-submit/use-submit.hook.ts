import { useEffect } from 'react';

export function useSubmit(handleSubmit: () => void) {
    const onKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [onKeyUp]);
}
