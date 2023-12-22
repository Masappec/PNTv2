import UserApi from "../Api/User/UserApi";


class UserService{

    userApi: UserApi;

    constructor(userApi: UserApi) {
        this.userApi = userApi;
    }


    async getUserList() {
        try {
            const response = await this.userApi.getUserList();

    
            return response;
        } catch (error) {
            throw new Error('Error al conectar con el servidor de autenticación.');
        }
    }
}
export default UserService;