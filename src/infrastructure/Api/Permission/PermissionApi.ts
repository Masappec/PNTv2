import { AxiosInstance } from "axios";
import PermissionEntity from "../../../domain/entities/PermissionEntity";


class PermissionApi{

    apiBaseUrl: AxiosInstance;

    path = import.meta.env.VITE_PATH_AUTH;

    constructor(apiBaseUrl: AxiosInstance) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async getPermissions(){
        try {
            const response = await this.apiBaseUrl.get<PermissionEntity[]>(this.path+'/permission/list');

            if (response.status !== 200) {
                throw new Error('Error al obtener la lista de permisos.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al obtener la lista de permisos.';

            throw new Error(error_);
        }
    }
}

export default PermissionApi;