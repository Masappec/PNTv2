import { AxiosInstance } from "axios";
import { RoleCreateRequest, RoleListAvailableResponse, RoleListResponse } from "./interface";


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

    async createRole(role: RoleCreateRequest) {
        try {
            const response = await this.apiBaseUrl.post(this.path+'/role/create', role);

            if (response.status !== 201) {
                throw new Error('Error al crear el rol.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al crear el rol.';

            throw new Error(error_);
        }
    }

    async detailRole(id: string) {
        try {
            const response = await this.apiBaseUrl.get(this.path+'/role/detail/' + id);

            if (response.status !== 200) {
                throw new Error('Error al obtener el rol.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al obtener el rol.';

            throw new Error(error_);
        }
    }

    async updateRole(id: string, role: RoleCreateRequest) {
        try {
            const response = await this.apiBaseUrl.put(this.path+'/role/update/' + id, role);

            if (response.status !== 200) {
                throw new Error('Error al actualizar el rol.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al actualizar el rol.';

            throw new Error(error_);
        }
    }

    async deleteRole(id: string) {
        try {
            const response = await this.apiBaseUrl.delete(this.path+'/role/delete/' + id);

            if (response.status !== 200) {
                throw new Error('Error al eliminar el rol.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al eliminar el rol.';

            throw new Error(error_);
        }
    }


    async getRoleListAvailable(){
        try {
            const response = await this.apiBaseUrl.get<RoleListAvailableResponse[]>(this.path+'/role/list/avaliable')

            if (response.status !== 200) {
                throw new Error('Error al obtener la lista de roles disponibles.');
            }

            return response.data;

        } catch (error:any) {
            
            const error_ = error.response?.data?.message || 'Error al obtener la lista de roles disponibles.';

            throw new Error(error_);
        }
    }
}

export default RoleApi;