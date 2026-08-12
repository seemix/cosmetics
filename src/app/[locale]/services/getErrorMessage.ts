import axios from 'axios';

type ApiErrorResponse = {
    errors?: { message: string }[];
    error?: string;
};

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.errors?.[0]?.message ?? error.response?.data?.error ?? 'Unknown error';
    }
    return 'Unknown error';
}
