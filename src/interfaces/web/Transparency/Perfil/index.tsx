import { ChangeEvent, FormEvent, useState } from 'react'
import SessionService from '../../../../infrastructure/Services/SessionService'

const userData = SessionService.getUserData()
const VerPerfil = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const handleCurrentPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value)
  }

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Contraseña actual:', currentPassword)
    console.log('Nueva contraseña:', newPassword)
  }

  return (
    <section className="mx-3">
      <h1 className="font-semibold text-[25px] text-primary-500">MI PERFIL</h1>
      <hr className="border-t-2 border-gray-200" />

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex w-full gap-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="userName" className="text-gray-600">
              Usuario
            </label>
            <input value={userData.username} className="rounded-md border-gray-300" id="userName" type="text" />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="text-gray-600">
              Correo
            </label>
            <input value={userData.email} className="rounded-md border-gray-300" id="email" type="text" />
          </div>
        </div>

        <div className="flex w-full gap-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="nombres" className="text-gray-600">
              Nombres
            </label>
            <input value={userData.first_name} className="rounded-md border-gray-300" id="nombres" type="text" />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="apellidos" className="text-gray-600">
              Apellidos
            </label>
            <input value={userData.last_name} className="rounded-md border-gray-300" id="apellidos" type="text" />
          </div>
        </div>

        <h1 className="font-medium text-[20px] text-primary-500 mt-10">Cambiar Contraseña</h1>
        <hr className="border-t-2 border-gray-200" />
        <div className="flex w-full gap-4 mb-4 mt-8">
          <div className="flex flex-col w-1/2">
            <label htmlFor="current" className="text-gray-600">
              Constraseña Actual
            </label>
            <input className="rounded-md border-gray-300" id="current" type="text" value={currentPassword} onChange={handleCurrentPasswordChange} />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="newPass" className="text-gray-600">
              Nueva Constraseña
            </label>
            <input className="rounded-md border-gray-300" id="newPass" type="text" value={newPassword} onChange={handleNewPasswordChange} />
          </div>
        </div>

        <button type="submit" className="bg-primary-600 border-none rounded-md text-white w-52 hover:bg-primary-500 h-10">
          Guardar
        </button>
      </form>
    </section>
  )
}

export default VerPerfil
