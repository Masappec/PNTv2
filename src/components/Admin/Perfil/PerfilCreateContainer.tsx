import { ChangeEvent, FormEvent, useState } from 'react'
import RegisterUseCase from '../../../domain/useCases/Authentication/RegisterUseCase'
import api from '../../../infrastructure/Api'
import AuthApi from '../../../infrastructure/Api/Auth/AuthApi'
import AuthService from '../../../infrastructure/Services/AuthService'
import PerfilCreatePresenter from './PerfilCreatePresenter'

const PerfilCreateContainer = () => {
  const userData = JSON.parse(localStorage.getItem('user_data')!)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  // Aquí debería ser tu instancia real de AuthService
  const authApi = new AuthApi(api)
  const authService = new AuthService(authApi)
  const usecase = new RegisterUseCase(authService)

  const handleCurrentPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value)
  }

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
  }

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Contraseña actual:', currentPassword)
    console.log('Nueva contraseña:', newPassword)
    try {
      const response = await usecase.changePassword(currentPassword, newPassword)
      console.log(response)
    } catch (error) {}
  }

  return (
    <PerfilCreatePresenter
      success="completado"
      currentPassword={currentPassword}
      newPassword={newPassword}
      handleSubmit={handleChangePassword}
      handleCurrentPasswordChange={handleCurrentPasswordChange}
      handleNewPasswordChange={handleNewPasswordChange}
      userData={userData}
    />
  )
}

export default PerfilCreateContainer
