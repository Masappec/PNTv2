// LoginUseCase.js

import AuthService from '../../../infrastructure/Services/AuthService'
import UserEntity from '../../entities/UserEntity'
import AuthMapper from '../../mappers/AuthMapper'

class RegisterUseCase {
  authService: AuthService
  constructor(authService: AuthService) {
    this.authService = authService
  }

  async execute(userdata: UserEntity) {
    // Lógica de autenticación
    const user = await this.authService.register(AuthMapper.fromDomainToDTO(userdata))

    return user
  }

  async activate(uid: string, token: string) {
    const response = await this.authService.activateAccount(uid, token)
    return response
  }

  async changePassword(current: string, newPass: string) {
    const response = await this.authService.changePassword(current, newPass)
    return response
  }
}

export default RegisterUseCase
