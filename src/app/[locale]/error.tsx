'use client';

import { useEffect } from 'react';
import { ErrorComponent } from '@/app/[locale]/components';

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