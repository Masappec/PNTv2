// LoginUseCase.js

import AuthService from "../../../infrastructure/Services/AuthService";
import EstablishmentService from "../../../infrastructure/Services/EstablishmentService";
import SessionService from "../../../infrastructure/Services/SessionService";

class LoginUseCase {
  authService: AuthService;
  establishment: EstablishmentService;
  constructor(authService: AuthService, establishment: EstablishmentService) {
    this.authService = authService;
    this.establishment = establishment;

  }

  async execute(username: string, password: string) {
    // Lógica de autenticación
    const user = await this.authService.authenticate(username, password);
    const est = await this.establishment.getByUserSession();

    SessionService.setEstablishmentData(JSON.stringify(est));
    return user;

  }
}

export default LoginUseCase;
