// LoginUseCase.js

import AuthService from "../../../infrastructure/Services/AuthService";

class RegisterUseCase {
    authService:AuthService;
    constructor(authService:AuthService) {
      this.authService = authService;

    }
  
    async execute(userdata:{
        username : string,
        password : string,
        email : string,
        first_name : string,
        last_name : string,
    }) {
        // Lógica de autenticación
        const user = await this.authService.register(
            userdata
        );
  
        return user;
      
    }
  }
  
  export default RegisterUseCase;
  