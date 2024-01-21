import { AxiosInstance } from "axios";
import { User, UserListResponse } from "./interface";
import { MessageTranslation } from "../../../utils/data";
import UserEntity from "../../../domain/entities/UserEntity";
import UserMapper from "../../../domain/mappers/UserMapper";
import { Pagination } from "..";



class UserApi {
    apiBaseUrl: AxiosInstance;

    path = import.meta.env.VITE_PATH_AUTH;

    constructor(apiBaseUrl: AxiosInstance) {
        this.apiBaseUrl = apiBaseUrl;
    }
    


    async getUserList(search?: string,page?: number) {
        try {
            const response = await this.apiBaseUrl.get<Pagination<User>>(this.path+'/user/list' + 
            (search || page ? '?' : '') +
            (search ? 'search=' + search : '') +
            (search && page ? '&' : '') +
            (page ? 'page=' + page : ''));
            

            if (response.status !== 200) {
                throw new Error('Error al obtener la lista de usuarios.');
            }

            return response.data;

        } catch (error) {
            throw new Error('Error al conectar con el servidor de autenticación.');
        }
    }

    async createUser(user: UserEntity) {
        try {
            const response = await this.apiBaseUrl.post<MessageTranslation<User>>(this.path+'/user/create', UserMapper.fromDomainToApi(user));

            if (response.status !== 201) {
                throw new Error('Error al crear el usuario.');
            }

            return response.data;

        } catch (error:any) {
            const error_ = error.response?.data?.message || 'Error al crear el usuario.';

            throw  new Error(error_);
        }
    }


    async updateUser(user: UserEntity) {
        try {
            const response = await this.apiBaseUrl.put<MessageTranslation<User>>(this.path+'/user/update/'+user.id, UserMapper.fromDomainToApi(user));

            if (response.status !== 200) {
                throw new Error('Error al actualizar el usuario.');
            }

            return response.data;

        } catch (error:any) {
            const error_ = error.response?.data?.message || 'Error al actualizar el usuario.';

            throw  new Error(error_);
        }
    }


    async deleteUser(id: string) {
        try {
            const response = await this.apiBaseUrl.delete(this.path+'/user/delete/'+id);

            
            return response.status;

        } catch (error:any) {
            const error_ = error.response?.data?.message || 'Error al eliminar el usuario.';

            throw  new Error(error_);
        }
    }


    async getUser(id: string) {
        try {
            const response = await this.apiBaseUrl.get<User>(this.path+'/user/detail/'+id);

            if (response.status !== 200) {
                throw new Error('Error al obtener el usuario.');
            }

            return response.data;

        } catch (error:any) {
            const error_ = error.response?.data?.message || 'Error al obtener el usuario.';

            throw  new Error(error_);
        }
    }

}

export default UserApi;