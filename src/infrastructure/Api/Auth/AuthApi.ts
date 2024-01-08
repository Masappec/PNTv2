// AuthApi.js

import { AxiosInstance } from "axios";
import { AUTH_PATH } from "..";
import { LoginResponseDto, RegisterDto } from "./interface";



class AuthApi {

    apiBaseUrl:AxiosInstance;

    constructor(apiBaseUrl:AxiosInstance) {
      this.apiBaseUrl = apiBaseUrl;
    }
  
    async login(username:string, password:string) {
      try {
        const response = await this.apiBaseUrl.post<LoginResponseDto>(AUTH_PATH+'/login/', {
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
    async register(userData:RegisterDto) {
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

    async passwordReset(email:string){
      try {
        const response = await this.apiBaseUrl.post(AUTH_PATH+'/password_reset/', {
          "email": email,
        });

        if (response.status !== 200) {
          throw new Error('Error al solicitar el cambio de contraseña.');
        }

        return response.data;

      } catch (error:any) {
        const error_ = error.response?.data?.message || 'Error al solicitar el cambio de contraseña.';
        throw new Error(error_);
      }
    }


    async passwordResetConfirm( token:string, new_password:string){
      try {
        const response = await this.apiBaseUrl.post(AUTH_PATH+'/password_reset/confirm/', {
          "token": token,
          "password": new_password,
        });

        if (response.status !== 200) {
          throw new Error('Error al solicitar el cambio de contraseña.');
        }

        return response.data;

      } catch (error:any) {
        const error_ = error.response?.data?.message || 'Error al solicitar el cambio de contraseña.';
        throw new Error(error_);
      }
    }

    async validateToken(token:string){
      try {
        const response = await this.apiBaseUrl.post(AUTH_PATH+'/password_reset/validate_token/', {
          "token": token,
        });

        if (response.status !== 200) {
          throw new Error('Error al validar el token.');
        }

        return response.data;

      } catch (error:any) {
        const error_ = error.response?.data?.message || 'Error al validar el token.';
        throw new Error(error_);
      }
    }
    

    async activateAccount(uid:string,token:string){
      try {
        const response = await this.apiBaseUrl.get(AUTH_PATH+'/activate/'+uid+'/'+token+'/');

        if (response.status !== 200) {
          throw new Error('Error al activar la cuenta.');
        }

        return response.data;

      } catch (error:any) {
        const error_ = error.response?.data?.message || 'Error al activar la cuenta.';
        throw new Error(error_);
      }
    }
  }
  
  export default AuthApi;
  