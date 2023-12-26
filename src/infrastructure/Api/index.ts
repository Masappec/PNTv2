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
        if (error instanceof Error){
            return Promise.reject(error);
        }else{
            return Promise.reject(new Error('Error de conexión'));
        }
    }
)
export default api;
