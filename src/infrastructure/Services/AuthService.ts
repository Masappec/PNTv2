// AuthService.js

import { AxiosInstance } from "axios";
import AuthApi from "../Api/Auth/AuthApi";
import SessionService from "./SessionService";
import UserEntity from "../../domain/entities/UserEntity";

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
  
        return new UserEntity(userData.user.id, userData.user.username, userData.user.email, userData.user.firstName, userData.user.lastName);
      } catch (error) {
        throw new Error('Error al autenticar el usuario. Verifica tus credenciales.');
      }
    }
  
    async register(userDetails) {
      try {
        // Llama al método de registro en el servicio de API
        const newUser = await this.api.register(userDetails);
  
  
        return newUser;
      } catch (error) {
        throw new Error('Error al registrar el usuario.');
      }
    }
  
    // Otros métodos relacionados con la lógica de autenticación pueden ir aquí
  }
  
  export default AuthService;
  