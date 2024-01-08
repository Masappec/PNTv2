import AuthService from "../../../infrastructure/Services/AuthService";


class PasswordResetUseCase {
    constructor(
        private authService:AuthService

    ) {}
    
    async execute(email:string) {
        // Lógica de autenticación
        const response = await this.authService.passwordReset(email);

        return response;
      
    }

    async confirm( token:string, newPassword:string, confirmationPassword:string) {
        // Lógica de autenticación
        if (newPassword !== confirmationPassword) {
            throw new Error("Las contraseñas no coinciden");
        }
        const response = await this.authService.passwordResetConfirm(token, newPassword);

        return response;
      
    }

    async validateToken(token:string) {
        // Lógica de autenticación
        const response = await this.authService.validateToken(token);

        return response;
      
    }

}

export default PasswordResetUseCase;