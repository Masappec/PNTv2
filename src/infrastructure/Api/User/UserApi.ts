import { AxiosInstance } from "axios";

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface UserListResponse {
    count: number;
    next: string;
    previous: string;
    results: User[];
}

class UserApi {
    apiBaseUrl:AxiosInstance;

    constructor(apiBaseUrl:AxiosInstance) {
      this.apiBaseUrl = apiBaseUrl;
    }


    async getUserList() {
        try {
            const response = await this.apiBaseUrl.get<UserListResponse>('/v1/auth/user/list');
            
            if (response.status !== 200) {
            throw new Error('Error al obtener la lista de usuarios.');
            }
    
            return response.data;
         
        } catch (error) {
            throw new Error('Error al conectar con el servidor de autenticación.');
        }
        }
}

export default UserApi;