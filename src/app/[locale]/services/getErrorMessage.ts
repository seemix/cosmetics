import axios from 'axios';

type ApiErrorResponse = {
    errors?: { message: string }[];
};

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.errors?.[0]?.message ?? 'Unknown error';
    }

    return 'Unknown error';
}
