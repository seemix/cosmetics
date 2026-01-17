import type { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'response' in error) {
        const err = error as AxiosError<{ message?: string }>;
        return err.response?.data?.message ?? 'Unknown error';
    }
    return 'Unknown error';
}