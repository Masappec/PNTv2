import { ChangeEvent, FormEvent } from 'react'
import Alert from '../../Common/Alert'

interface User {
  username: string
  email: string
  first_name: string
  last_name: string
}

interface perfilProps {
  userData: User
  currentPassword: string
  newPassword: string
  handleCurrentPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleNewPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  visible: boolean
  visible2: boolean
  setVisible: (value: boolean) => void
  setVisible2: (value: boolean) => void
  error: string
  setError: (value: string) => void
  setSuccess: (value: string) => void
  success: string
}

const PerfilCreatePresenter = ({ userData, ...props }: perfilProps) => {
  return (
    <section className="mx-3">
      <h1 className="font-semibold text-[25px] text-primary-500">MI PERFIL</h1>
      <hr className="border-t-2 border-gray-200" />

      <form onSubmit={props.handleSubmit} className="mt-8">
        <div className="flex w-full gap-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="userName" className="text-gray-600">
              Usuario
            </label>
            <input disabled={true} value={userData?.username} className="rounded-md border-gray-300" id="userName" type="text" />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="text-gray-600">
              Correo
            </label>
            <input disabled={true} value={userData?.email} className="rounded-md border-gray-300" id="email" type="text" />
           
          
          </div>
        </div>

        <div className="flex w-full gap-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="nombres" className="text-gray-600">
              Nombres
            </label>
            <input disabled={true} value={userData?.first_name} className="rounded-md border-gray-300" id="nombres" type="text" />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="apellidos" className="text-gray-600">
              Apellidos
            </label>
            <input disabled={true} value={userData?.last_name} className="rounded-md border-gray-300" id="apellidos" type="text" />
          </div>
        </div>

        <h1 className="font-medium text-[20px] text-primary-500 mt-10">Cambiar Contraseña</h1>
        <hr className="border-t-2 border-gray-200" />
        {
          props.error && <Alert message={props.error} type='error' onClose={() => props.setError('')} />
        }
        {
          props.success &&
            <Alert message={props.success} type='success' onClose={() => props.setSuccess('')} />
          }
        <div className="flex w-full gap-4 mb-4 mt-8">
          <div className="flex flex-col w-1/2">
            <label htmlFor="current" className="text-gray-600">
              Constraseña Actual
            </label>
            <div className='relative'>
              <input className="rounded-md w-full border-gray-300" id="current" 
            
            type={props.visible ? 'text' : 'password'}
             value={props.currentPassword} onChange={props.handleCurrentPasswordChange} />
            <button
              type='button'
              onClick={() => props.setVisible(!props.visible)}
              className='absolute right-0 top-0 p-2 text-gray-600 outline-primary hover:cursor-pointer'
            ><svg
              className='h-6 w-6'
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            ><path
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='32'
              d='M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z'
            ></path><circle
              cx='256'
              cy='256'
              r='80'
              fill='none'
              stroke-miterlimit='10'
              stroke-width='32'></circle>
              </svg></button>
            </div>

          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="newPass" className="text-gray-600">
              Nueva Constraseña
            </label>
            <div className='relative'>

            <input className="rounded-md w-full border-gray-300" id="newPass"
            
            type={props.visible2 ? 'text' : 'password'}
            
            value={props.newPassword} onChange={props.handleNewPasswordChange} />
          
            <button
              type='button'
              onClick={() => props.setVisible2(!props.visible2)}

              className='absolute right-0 top-0 p-2 text-gray-600 outline-primary hover:cursor-pointer'
            ><svg
              className='h-6 w-6'
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 512 512'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            ><path
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='32'
              d='M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z'
            ></path><circle
              cx='256'
              cy='256'
              r='80'
              fill='none'
              stroke-miterlimit='10'
              stroke-width='32'></circle>
              </svg></button>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-primary-600 border-none rounded-md text-white w-52 hover:bg-primary-500 h-10">
          Guardar
        </button>
      </form>
    </section>
  )
}

export default PerfilCreatePresenter
