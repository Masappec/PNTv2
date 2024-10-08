import axios from 'axios';
import { URL_API } from '../../utils/constans';
import SessionService from '../Services/SessionService';

const api = axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

    },
});


api.interceptors.request.use(
    async (config) => {
        const token = SessionService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        if (error instanceof Error) {
            return Promise.reject(error);
        } else {
            return Promise.reject(new Error('Error de conexión'));
        }
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const url = error.config.url;
        if (error.response?.status === 401 && !url.includes('login')) {
            SessionService.clearSession();
            window.location.href = '/401'
        }
        return Promise.reject(error);
    }
)

export const AUTH_PATH = import.meta.env.VITE_PATH_AUTH;
export const ADMIN_PATH = import.meta.env.VITE_PATH_ADMIN;
export const TRANSPARENCY_PATH = import.meta.env.VITE_PATH_TRANSPARENCY;
export const PUBLIC_PATH = import.meta.env.VITE_PATH_PUBLIC;

export interface Pagination<T> {
    total: number;
    limit: number;
    next: number | null;
    previous: number | null;
    current: number;
    results: T[];
    total_pages?: number;
    from?: number;
    to: number;
}


export interface PaginationLetter<T> {
    total: number;
    results: {
        letter: string;
        data: T[];
    }[]

}


export interface BaseObject {
    created_at?: string;
    updated_at?: string;
    deleted?: boolean;
    deleted_at?: string;
    ip?: string;
    user_created?: string;
    user_updated?: string;
    user_deleted?: string;

}
export default api;
