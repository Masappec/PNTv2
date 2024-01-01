import UserEntity from "../../domain/entities/UserEntity";
import UserApi from "../Api/User/UserApi";


class UserService{

    userApi: UserApi;

    constructor(userApi: UserApi) {
        this.userApi = userApi;
    }


    async getUserList(search?: string,page?: number) {
        try {
            const response = await this.userApi.getUserList(search,page);

    
            return response;
        } catch (error) {
            throw new Error('Error al conectar con el servidor de autenticación.');
        }
    }

    async createUser(user: UserEntity) {
        try {
            const response = await this.userApi.createUser(user);

            return response;
        } catch (error:any) {
            const _error = error?.message || 'Error al registrar el usuario.';
            throw new Error(_error);
        }
    }
}
export default UserService;