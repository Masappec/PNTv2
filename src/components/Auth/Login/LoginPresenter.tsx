import { FormEvent } from "react";
import Alert from "../../Common/Alert";
import Spinner from "../../Common/Spinner";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {LogoPortal} from "../../Common/LogoPortal";




interface LoginPresenterProps {
  email: string;
  password: string;
  error: string | null;
  remenber: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  setError: (e: string) => void;
  setRemenber: (value: boolean) => void;
  isloading?: boolean;
  showPassword: boolean;
  handleShowPassword: () => void;

}

const LoginPresenter = ({ ...props }: LoginPresenterProps) => {
  return (
   
  
 <>
    <section className='section-container py-16'>
      <form
        onSubmit={props.handleSubmit}
        className='mx-auto max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
        <LogoPortal className='mx-auto mb-4 max-w-60' />

        <p className='mx-auto w-full text-balance text-center text-lg text-slate-600'>
          Ingresa tus credenciales para acceder al portal
        </p>
        {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}

        <section className='mt-4 grid grid-cols-1 items-start justify-center gap-4 text-start'>
          
          <div>
            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'
              >Usuario
            </label>
            <input
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
              type='text'
              placeholder='Escribe tu nombre de usuario'
              name='username'
              
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
            />
          </div>

         
          <div>
            <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'
              >Contraseña
            </label>

            <div className='relative'>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                type={props.showPassword ? "text" : 'password'}
                placeholder='Ingresa tu contraseña'
                name='confirm_password'
                
                value={
                  props.password
                }
                onChange={(e) =>
                  props.setPassword(e.target.value)
                }
              />
              <button
                type='button'
                className='absolute right-0 top-0 p-2 text-gray-600 outline-primary hover:cursor-pointer'
                onClick={props.handleShowPassword}>
                  
                   {props.showPassword ? (
                      <IoEyeOffOutline size={22} className=" font-bold text-gray-600" />
                    ) : (
                      <IoEyeOutline size={22} className=" font-bold text-gray-600" />
                    )
                  }
                 
              </button>
            </div>
          </div>

          <p className='text-end text-sm'>
            <a
              className='font-medium text-primary hover:underline hover:underline-offset-2'
              href='/auth/forgot-password'>¿Olvidaste tu Contraseña?  </a>
          </p>
          {props.isloading ? (
                <Spinner />
              ) : (

          <button
            type='submit'
            className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'
            data-astro-source-file='C:/Users/asanluca/Documents/pro/layouts/src/components/transparencia/Header.astro'
            data-astro-source-loc='84:197'>
            Ingresar
          </button>
              )
            }

          <p className='mt-4 text-center text-sm text-gray-900'>
            ¿Aún no has creado tu cuenta? &nbsp;
             <a
              className='font-medium text-primary hover:underline hover:underline-offset-2'
              href='/registro'>Regístrate
              </a>
          </p>
            <p className='mt-4 text-center text-sm text-gray-900'>
              ¿Cómo creas una cuenta y para qué la necesitas? &nbsp;
              <a
                className='font-medium text-primary hover:underline hover:underline-offset-2'
                href='/tutoriales'>Revisa nuestros tutoriales
              </a>
            </p>
        </section>
      </form>
    </section>
  </>
    

  );
};

export default LoginPresenter;





 {/* <header className="border-b-2 border-dark-400 dark:border-primary-600">
        <nav className="bg-primary-600 border-gray-900 px-4 lg:px-6 py-10 dark:bg-gray-800"></nav>
      </header>
      <div className="bg-white h-screen md:flex lg:flex xl:flex ">
        <div className="items-center hidden lg:flex xl:flex 2xl:flex  pr-56 bg-emerald-50 h-full w-2/5  ">
          <div className=" border-l-2 border-gray-400 ml-2 md:ml-16  justify-items-start h-full "></div>
          <div className=" pl-10  relative">
            <img
              src={logo}
              alt="imagen"
              className=" flex items-center justify-center w-96 max-w-screen-2xl h-auto mb-60 -mt-32 "
            />
            <p className="mt-36 text-2xl text-slate-400  ">
              Portal <br /> Nacional <br />
              de Transparencia
            </p>
          </div>
        </div>
        <div className="absolute top-52 h-24 w-6 ml-14 bg-primary-600  hidden lg:block"></div>
        <div className="bg-white w-full mt-10 xl:mt-20 lg:mt-20  lg:ml-36 flex justify-center">
          <form
            className="border  border-slate-50 xl:shadow-lg h-2/3 md:h-2/5 xl:h-fit lg:h-2/3  rounded-lg text-center  items-center"
            onSubmit={props.handleSubmit}
          >
            <div className="flex flex-row justify-center w-full items-center visible xl:hidden md:hidden">
              <img
                src={logo}
                className="mr-3 h-20 justify-center"
                alt="Logo de la defensoria del pueblo"
                tabIndex={1}
              />
            </div>
            <div className="hidden xl:flex lg:flex ">
              <Title title="Ingresar al Portal" text="" color="black" />

            </div>
            <h3>
              <p className="text-2xl font-bold mt-5 mb-2 text-center text-black xl:hidden  lg:hidden visible">
                Ingresar al Portal
              </p>
            </h3>
            <p className="text-lg text-center   text-slate-500  ">
              ¡Bienvenido! Por favor ingrese sus datos.
            </p>
            {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}
            <div className="flex-row justify-center items-start mt-7 text-start ">
              <div className="flex flex-col m-2 items-center mt-10">
                <Input
                  type="text"
                  placeholder="Usuario"
                  className="w-80"
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col m-2 items-center ">

                <div className="relative m-7">

                  <Input
                    type={props.showPassword ? "text" : 'password'}
                    placeholder='Contraseña'
                    className="w-80"
                    value={
                      props.password
                    }
                    onChange={(e) =>
                      props.setPassword(e.target.value)
                    }

                  />
                  <button
                    type="button"
                    className="absolute end-2 top-12  hover:cursor-pointer text-gray-600"
                    onClick={props.handleShowPassword}
                  >
                    {props.showPassword ? (
                      <IoEyeOffOutline />
                    ) : (
                      <IoEyeOutline />
                    )}
                  </button>

                </div>
              </div>
              <div className="flex flex-col-2  xl:mt-6   mt-5">

                <div className="text-primary-500 text-xs ml-6 font-semibold">
                  {" "}
                  <Contrasenia
                    text="Reiniciar Contraseña"
                    path="/auth/forgot-password"
                  />
                </div>{" "}
              </div>

              {props.isloading ? (
                <Spinner />
              ) : (
                <div className="flex flex-col m-2 items-center">
                  <Button
                    className="w-80 justify-center flex bg-primary-600 rounded-3xl"
                    type="submit"
                  >
                    Ingresar
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col-2  mt-6 mb-12 ">
              <span className="xl:ml-24 ml-9   text-slate-500  ">
                ¿Aún no tienes cuenta?
              </span>
              <div className="text-primary-500 text-base font-semibold lg:-ml-7 md:-ml-7">
                <Contrasenia text="Registrate" path="/registro" />{" "}
              </div>

            </div>
            <div className="flex flex-row justify-center w-full items-center visible xl:hidden md:hidden bg-[#F4FBFE] h-full">
              <p className="mt-12 mb-16 text-base text-gray-500 font-medium   ">
                Portal Nacional
                de Transparencia
              </p>
            </div>
          </form>
        </div>
      </div>
        */}