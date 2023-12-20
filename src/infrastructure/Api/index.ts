import axios from 'axios';
import { URL_API } from '../../utils/constans';
import SessionService from '../Services/SessionService';

const api = axios.create({
  baseURL: URL_API,
   
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
        return Promise.reject(error);
    }
)
export default api;
