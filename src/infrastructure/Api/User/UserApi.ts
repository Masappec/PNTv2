import { AxiosInstance } from "axios";
import { User, UserListResponse } from "./interface";
import { MessageTranslation } from "../../../utils/data";
import UserEntity from "../../../domain/entities/UserEntity";
import UserMapper from "../../../domain/mappers/UserMapper";



class UserApi {
    apiBaseUrl: AxiosInstance;

    path = import.meta.env.VITE_PATH_AUTH;

    constructor(apiBaseUrl: AxiosInstance) {
        this.apiBaseUrl = apiBaseUrl;
    }
    


    async getUserList(search?: string,page?: number) {
        try {
            const response = await this.apiBaseUrl.get<UserListResponse>(this.path+'/user/list' + 
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

        } catch (error) {
            throw new Error('Error al conectar con el servidor de autenticación.');
        }
    }
}

export default UserApi;