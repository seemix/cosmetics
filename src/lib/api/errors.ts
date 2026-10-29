import axios from 'axios';

type ApiErrorResponse = {
	errors?: { message: string }[];
	error?: string;
};

export type StockIssue = {
	product: string;
	requested: number;
	/** Rounded down to a multiple of 5 (min 1 while in stock); only for signed-in users. */
	available?: number;
};

type InsufficientStockResponse = {
	code?: string;
	items?: StockIssue[];
};

/** Items from a 409 INSUFFICIENT_STOCK order response, or null for any other error. */
export function getStockIssues(error: unknown): StockIssue[] | null {
	if (
		axios.isAxiosError<InsufficientStockResponse>(error) &&
		error.response?.status === 409 &&
		error.response.data?.code === 'INSUFFICIENT_STOCK'
	) {
		return error.response.data.items ?? [];
	}
	return null;
}

export function getErrorMessage(error: unknown): string {
	if (axios.isAxiosError<ApiErrorResponse>(error)) {
		return (
			error.response?.data?.errors?.[0]?.message ??
			error.response?.data?.error ??
			'Unknown error'
		);
	}
	return 'Unknown error';
}
