// AuthService.js

import AuthApi from "../Api/Auth/AuthApi";
import SessionService from "./SessionService";
import UserEntity from "../../domain/entities/UserEntity";
import { RegisterDto } from "../Api/Auth/interface";
import AuthMapper from "../../domain/mappers/AuthMapper";

class AuthService {
    api:AuthApi;
    constructor(api:AuthApi) {
      this.api = api;
    }
  
    async authenticate(username:string, password:string) : Promise<UserEntity>{
      try {
        // Llama al método de autenticación en el servicio de API
        const userData = await this.api.login(username, password);


        SessionService.setAccessToken(userData.access);
        SessionService.setRefreshToken(userData.refresh);
        SessionService.setUserData(JSON.stringify(userData.user));
        SessionService.setPersonData(JSON.stringify(userData.person))
        return AuthMapper.fromApiToDomain(userData);
      } catch (error) {
        throw new Error('Error al autenticar el usuario. Verifica tus credenciales.');
      }
    }
  
    async register(userDetails:RegisterDto) {
      try {
        // Llama al método de registro en el servicio de API
        const newUser = await this.api.register(userDetails);
  
  
        return new UserEntity(newUser.id, newUser.username, newUser.email, newUser.firstName, newUser.lastName);
      } catch (error:any) {
        throw new Error(error?.message || 'Error al registrar el usuario.');
      }
    }
  

    async passwordReset(email:string){
      try {
        // Llama al método de registro en el servicio de API
        const response = await this.api.passwordReset(email);
  
        return response;
      } catch (error:any) {
        throw new Error(error?.message || 'Error al solicitar el cambio de contraseña.');
      }
    }


    async passwordResetConfirm(token:string, newPassword:string){
      try {
        // Llama al método de registro en el servicio de API
        const response = await this.api.passwordResetConfirm(token, newPassword);
  
        return response;
      } catch (error:any) {
        throw new Error(error?.message || 'Error al solicitar el cambio de contraseña.');
      }
    }


    async validateToken(token:string){
      try {
        // Llama al método de registro en el servicio de API
        const response = await this.api.validateToken(token);
  
        return response;
      } catch (error:any) {
        throw new Error(error?.message || 'Error al solicitar el cambio de contraseña.');
      }
    }

    async activateAccount(uid:string, token:string){
      try {
        // Llama al método de registro en el servicio de API
        const response = await this.api.activateAccount(uid, token);
  
        return response;
      } catch (error:any) {
        throw new Error(error?.message || 'Enlace de activación inválido.');
      }
    }
    // Otros métodos relacionados con la lógica de autenticación pueden ir aquí
  }
  
  export default AuthService;
  