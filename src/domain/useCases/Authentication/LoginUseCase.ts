// LoginUseCase.js

import AuthService from "../../../infrastructure/Services/AuthService";

class LoginUseCase {
    authService:AuthService;
    constructor(authService:AuthService) {
      this.authService = authService;

    }
  
    async execute(username:string, password:string) {
        // Lógica de autenticación
        const user = await this.authService.authenticate(username, password);
  
        return user;
      
    }
  }
  
  export default LoginUseCase;
  