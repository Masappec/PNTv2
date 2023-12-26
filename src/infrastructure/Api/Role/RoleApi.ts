import { AxiosInstance } from "axios";
import { RoleListResponse } from "./interface";


class RoleApi{
    apiBaseUrl: AxiosInstance;

    path = import.meta.env.VITE_PATH_AUTH;

    constructor(apiBaseUrl: AxiosInstance) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async getRoleList(search?: string) {
        try {
            const response = await this.apiBaseUrl.get<RoleListResponse[]>(this.path+'/role/list' + (search ? '?search=' + search : ''));

            if (response.status !== 200) {
                throw new Error('Error al obtener la lista de roles.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al obtener la lista de roles.';

            throw new Error(error_);
        }
    }
}

export default RoleApi;