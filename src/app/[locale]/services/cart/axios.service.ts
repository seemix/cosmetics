import axios from 'axios';

import { assets } from '@/app/[locale]/assets/assets';

export const axiosService = axios.create({
    baseURL: `${assets.backendUrl}/api/carts/`,
    withCredentials: true
});