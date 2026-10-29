import axios from 'axios';

import { assets } from '@/config/assets';

export const axiosService = axios.create({
    baseURL: `${assets.backendUrl}/api/`,
    withCredentials: true
});