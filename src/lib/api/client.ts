import axios from 'axios';

import { env } from '@/config/env';

/** Browser-side API client; sends the Payload session cookies cross-origin. */
export const apiClient = axios.create({
	baseURL: `${env.apiUrl}/`,
	withCredentials: true,
});
