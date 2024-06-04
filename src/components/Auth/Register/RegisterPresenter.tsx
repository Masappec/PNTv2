import { FormEvent } from "react";
import Title from "../../Common/Title";
import Input from "../../Common/Input";
import Contrasenia from "../../Common/Contrasenia";
import Alert from "../../Common/Alert";
import FormFieldsEntity from "../../../domain/entities/FormFieldsEntity";
import Select from "../../Common/Select";
import Checkbox from "../../Common/Checkbox";
import { RegisterDto } from "../../../infrastructure/Api/Auth/interface";
import { Button } from "flowbite-react";
import Spinner from "../../Common/Spinner";
import logo from "../../../assets/Home/logo-dpe 2.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import PasswordMeter, { IOncalculate } from "../../Common/PasswordMeter";
import {LogoPortal} from "../../Common/LogoPortal";
import { BsEyeSlash } from "react-icons/bs";


interface RegisterPresenterProps {
  error: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;

  setError: (e: string) => void;
  data: RegisterDto;
  setData: (name: string, value: string | boolean) => void;
  fields: FormFieldsEntity[];
  isLoading: boolean;
  handleShowPassword: () => void;
  showPassword: boolean;
  onChangePassword: (data: IOncalculate) => void;
  isEnable: boolean;
}

const RegisterPresenter = ({ ...props }: RegisterPresenterProps) => {




  return (
    <>
        <main>
    <section className='section-container py-16'>
      <form
      onSubmit={props.handleSubmit}
        className='mx-auto max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
        <LogoPortal className='mx-auto mb-4 max-w-60' />

        <p className='mx-auto w-full text-balance text-center text-lg text-slate-600'>
          ¡Bienvenido! Ingrese la siguiente información para crear su cuenta
        </p>

        {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}

        <section className='mt-4 grid grid-cols-1 items-start justify-center gap-4 text-start'>
        {props.fields.map((field) => {
                return field.type_field === "password" ? (
                  <div >
                  <label className="text-sm font-medium text-gray-900" data-testid="flowbite-label">
                    {field.description}
                    <span className='text-red-500'>*</span>
                    </label>

                    <div className='relative'>

                    <input
                      type={props.showPassword ? "text" : field.type_field}
                      placeholder={field.description}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                      value={
                        props.data[field.name as keyof RegisterDto] as string
                      }
                      onChange={(e) =>
                        props.setData(field.name, e.target.value)
                      }
                      name={field.name}
                      required
                    />
                    <button
                     type='button'
                     className='absolute right-0 top-0 p-2 text-gray-600 outline-primary hover:cursor-pointer'
                      onClick={props.handleShowPassword}
                    >
                      {props.showPassword ? (
                        <IoEyeOffOutline size={22} className=" font-bold text-gray-600" />
                      ) : (
                        <IoEyeOutline size={22} className=" font-bold text-gray-600" />
                      )}
                    </button>
                    </div>
                    {
                      field.name === "password" && (

                        <PasswordMeter
                          onCalculate={props.onChangePassword}
                          password={props.data[field.name as keyof RegisterDto] as string}
                        />
                      )
                    }
                  </div>

                )


                  : field.type_field === "select" ? (
                    <div>
                    <label className="text-sm font-medium text-gray-900" data-testid="flowbite-label">
                      {field.description}
                      <span className='text-red-500'>*</span>
                      </label>
  
                      <Select
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        options={[
                          {
                            value: "",
                            label: "Seleccione una opción",
                          },

                          ...(field.options?.map((option) => {
                            return {
                              value: option.id as string,
                              label: option.name,
                            };
                          }) as { value: string; label: string }[]),
                        ]}
                        required
                      />
                    
                    </div>
                  ) : field.type_field === "checkbox" ? (
                    <div className='mb-4 mt-8 flex items-center'>
                      <Checkbox
                  
                        checked={
                          props.data[field.name as keyof RegisterDto] as boolean
                        }
                        onChange={(e) => props.setData(field.name, e)}
                        id={field.name}

                      
                      />
                       <label htmlFor='accept_terms' className='ml-2 text-sm text-gray-900'>
                      {field.description}
          </label>

                    </div>
                  ) : (
                    <div>
                    <label className="text-sm font-medium text-gray-900" data-testid="flowbite-label">
                    {field.description}
                    <span className='text-red-500'>*</span>
                    </label>
                      <input
                        type={field.type_field}
                        placeholder={field.description}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 "
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        name={field.name}
                      />
                  


                    </div>
                  );
              })}
            </section>
        {props.isLoading ? (
              <Spinner />
            ) : (

        <button
          type='submit'
          className='w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'
          data-astro-source-file='C:/Users/asanluca/Documents/pro/layouts/src/components/transparencia/Header.astro'
          data-astro-source-loc='84:197'
          disabled={!props.isEnable}
          >
          Registrarse
        </button>
            )
          }

        <p className='mt-8 text-sm text-gray-900'>
          ¿Tienes una cuenta? <a
            className='font-medium text-primary hover:underline hover:underline-offset-2'
            href='/ingreso'>Inicia sesión
            </a >
        </p>
      </form>
        
      
    </section>
  </main>
    </>
  );
};

export default RegisterPresenter;


 {/* <header className="border-b-2 border-dark-400 dark:border-primary-600">
        <nav className="bg-primary-600 border-gray-900 px-4 lg:px-6 py-10 dark:bg-gray-800"></nav>
      </header>
      <div className="bg-white h-max mb-52 md:flex lg:flex xl:flex ">
        <div className="items-center hidden lg:flex xl:flex 2xl:flex  pr-56 bg-emerald-50 h-[100%] w-2/5  ">
          <div className=" border-l-2 border-gray-400 ml-2 md:ml-16  justify-items-start h-screen "></div>
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
              <Title title=" Registrarse en el Portal" text="" color="black" />
            </div>
            <h3>
              <p className="text-2xl font-bold mt-5 mb-2 text-center text-black xl:hidden  lg:hidden visible">
                Registrarse en el Portal
              </p>
            </h3>
            <p className="text-lg text-center   text-slate-500  ">
              ¡Bienvenido! Por favor ingrese sus datos para acceder al portal.
            </p>
            {props.error && (
              <Alert
                message={props.error}
                type="error"
                onClose={() => props.setError("")}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2  justify-center items-start mt-7 text-start ">
              {props.fields.map((field) => {
                return field.type_field === "password" ? (
                  <div className="relative m-7">
                    <span className="absolute top-0 -left-3 text-red-500 ">*</span>

                    <Input
                      type={props.showPassword ? "text" : field.type_field}
                      placeholder={field.description}
                      className="w-60"
                      value={
                        props.data[field.name as keyof RegisterDto] as string
                      }
                      onChange={(e) =>
                        props.setData(field.name, e.target.value)
                      }
                      name={field.name}
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
                    {
                      field.name === "password" && (

                        <PasswordMeter
                          onCalculate={props.onChangePassword}
                          password={props.data[field.name as keyof RegisterDto] as string}
                        />
                      )
                    }
                  </div>

                )


                  : field.type_field === "select" ? (
                    <div className="m-4 relative">
                      <Select
                        placeholder={field.description}
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        options={[
                          {
                            value: "",
                            label: "Seleccione una opción",
                          },

                          ...(field.options?.map((option) => {
                            return {
                              value: option.id as string,
                              label: option.name,
                            };
                          }) as { value: string; label: string }[]),
                        ]}
                      />
                      <span className="absolute top-0 -left-3 text-red-500 ">*</span>
                    </div>
                  ) : field.type_field === "checkbox" ? (
                    <div className="flex col-span-2 flex-row m-2 items-center relative w-full">
                      <Checkbox
                        checked={
                          props.data[field.name as keyof RegisterDto] as boolean
                        }
                        onChange={(e) => props.setData(field.name, e)}
                        id={field.name}
                        label={field.description}
                      />

                    </div>
                  ) : (
                    <div className="flex  flex-col m-2 mt-5 items-center relative ">
                      <Input
                        type={field.type_field}
                        placeholder={field.description}
                        className="w-60 "
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        name={field.name}
                      />
                      <span className="absolute top-0 left-2 text-red-500 ">*</span>


                    </div>
                  );
              })}
            </div>
            {props.isLoading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col m-2 items-center">
                <Button
                  className="w-80 justify-center flex bg-primary-600 rounded-3xl"
                  type="submit"
                  disabled={!props.isEnable}
                >
                  Registrarse
                </Button>
              </div>
            )}
            <div className="flex flex-col-2  mt-6 mb-12 ">
              <span className="xl:ml-24 ml-9   text-slate-500  ">
                ¿Ya tienes una cuenta?
              </span>
              <div className="text-primary-500 text-base font-semibold lg:-ml-7 md:-ml-7">
                <Contrasenia text="Inicia sesion" path="/ingreso" />{" "}
              </div>
            </div>
            <div className="flex flex-row justify-center w-full items-center visible xl:hidden md:hidden bg-[#F4FBFE] h-full">
              <p className="mt-12 mb-16 text-base text-gray-500 font-medium   ">
                Portal Nacional de Transparencia
              </p>
            </div>
          </form>
        </div>
      </div>
       */}