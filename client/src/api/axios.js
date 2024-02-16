import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const adminAxios = axios.create({
    baseURL: BASE_URL + '/admin',
    withCredentials: true,
});
