// AuthApi.js

import { AxiosInstance } from "axios";

class AuthApi {

    apiBaseUrl:AxiosInstance;

    constructor(apiBaseUrl:AxiosInstance) {
      this.apiBaseUrl = apiBaseUrl;
    }
  
    async login(username:string, password:string) {
      try {
        const response = await this.apiBaseUrl.post('/v1/auth/login/', {
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
        const response = await this.apiBaseUrl.post('/v1/auth/register/', userData);

        if (response.status !== 201) {
          throw new Error('Error al registrar el usuario.');
        }

        return response.data;

      } catch (error) {
        throw new Error('Error al conectar con el servidor de autenticación.');
      }

    }
  
    // Otros métodos relacionados con la autenticación pueden ir aquí
  }
  
  export default AuthApi;
  