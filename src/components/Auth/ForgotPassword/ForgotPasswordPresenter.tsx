
// import Input from "../../Common/Input";
// import Title from "../../Common/Title";
// import img from '../../../assets/forgot_password.svg'
// import Contrasenia from "../../Common/Contrasenia";
// import { Link } from "react-router-dom";
// import { Button } from "flowbite-react";
import { LogoPortal } from "../../Common/LogoPortal";
import Spinner from "../../Common/Spinner";
import { FormEvent } from "react";
import Alert from "../../Common/Alert";
import Contrasenia from "../../Common/Contrasenia";

interface ForgotPasswordPresenterProps {
  email: string;
  error: string | null;
  success: string | null;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setEmail: (e: string) => void;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  isloading?: boolean;
}
const ForgotPasswordPresenter = (props: ForgotPasswordPresenterProps) => {

  

  return (
    <>
      <main>
        <section className='section-container py-16'>
          <form onSubmit={props.handleSubmit}
            className='mx-auto max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
            <LogoPortal className='mx-auto mb-4 max-w-60' />

            <p className='mx-auto w-full text-balance text-center text-lg text-slate-600'>
              Ingrese la dirección de correo electrónico de tu cuenta de usuario para restablecer su
              contraseña.
            </p>
            {
              props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
            }
            {
              props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
            }

            <section className='mt-4 grid grid-cols-1 items-start justify-center gap-4 text-start'>

              <div>
                <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                  Correo Electrónico
                </label>

                <input
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                  type='text'
                  placeholder='Ingresa tu correo electrónico'
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                  
                />
              </div>
              {
                props.isloading ? <Spinner /> :

                  <button
                    type='submit'
                    className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    Recuperar Contraseña
                  </button>
              }
            </section>
            <Contrasenia text='Inicia sesión' path='/ingreso' />
          </form>
        </section>
      </main>

    </>
  )
}

export default ForgotPasswordPresenter;
{/* <div className='bg-primary-700 h-screen flex'>
                <div className='items-center lg:flex xl:flex 2xl:flex justify-center h-auto flex-col flex-auto justify-items-start hidden' >
                    <Title title="Recupera tu cuenta" text="Para ingresar tus solicitudes necesitas acceder a tu cuenta" color='white' />
                    <img src={img} alt='Recupera tu contraseña' className='w-1/2 h-1/2' />
                </div>

                <div className="bg-white flex xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-full  text-center  items-center ">
                    <form className="mb-20 mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="¿Olvidaste tu contraseña?" text="A continuación ingresa tu correo" color='black' />
                        {
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        {
                            props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                        }
                        <div className="flex-row justify-center items-center">

                            <div className="flex flex-col m-2 items-center">
                                <Input type="text" placeholder="Correo" className="w-72"
                                    value={props.email}
                                    onChange={(e) => props.setEmail(e.target.value)}
                                />

                            </div>

                            {
                                props.isloading ? <Spinner /> : 
                                <div className="flex flex-col m-2 items-center">
                                <Button className="w-72 justify-center flex bg-primary-600" type="submit" >
                                    Enviar
                                </Button>
                                </div>
                           }

 
                        </div>
                        <Contrasenia text='Inicia sesión' path='/ingreso' />


                    </form>
                </div>

            </div> */}