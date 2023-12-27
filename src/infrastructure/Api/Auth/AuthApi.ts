// AuthApi.js

import { AxiosInstance } from "axios";
import { AUTH_PATH } from "..";


export interface RegisterDto{
    username:string,
    password:string,
    email:string,
    first_name:string,
    last_name:string,
    identification:string,
    phone:string,
    address:string,
    city:string,
    country:string,
    province:string,
}
class AuthApi {

    apiBaseUrl:AxiosInstance;

    constructor(apiBaseUrl:AxiosInstance) {
      this.apiBaseUrl = apiBaseUrl;
    }
  
    async login(username:string, password:string) {
      try {
        const response = await this.apiBaseUrl.post(AUTH_PATH+'/login/', {
            "username":username, 
            "password": password,
            });
            
        if (response.status !== 200) {
          throw new Error('Error al autenticar el usuario. Verifica tus credenciales.');
        }

        return response.data;
       
      } catch (error) {
        throw new Error('Error al conectar con el servidor de autenticación.');
      }
    }
    
    //TODO: agregar el tipo de dato de userData
    async register(userData:{
        username:string,
        password:string,
        email:string,
        first_name:string,
        last_name:string,
    }) {
      try {
        const response = await this.apiBaseUrl.post(AUTH_PATH+'/register/', userData);

        if (response.status !== 201) {
          throw new Error('Error al registrar el usuario.');
        }

        return response.data;

      } catch (error:any) {
        const error_ = error.response?.data?.message || 'Error al registrar el usuario.';
        throw new Error(error_);
      }

    }
  
    // Otros métodos relacionados con la autenticación pueden ir aquí
  }
  
  export default AuthApi;
  