'use client';

import { useEffect } from 'react';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function GlobalError({ error }: ErrorProps) {

    useEffect(() => {
        console.error('Unhandled error:', error);
    }, [error]);

    return <ErrorComponent error={error.message}/>

}