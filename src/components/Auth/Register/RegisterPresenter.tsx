import { FormEvent, useState } from "react";
import Alert from "../../Common/Alert";
import FormFieldsEntity from "../../../domain/entities/FormFieldsEntity";
import Select from "../../Common/Select";
import Checkbox from "../../Common/Checkbox";
import { RegisterDto } from "../../../infrastructure/Api/Auth/interface";
import Spinner from "../../Common/Spinner";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import PasswordMeter, { IOncalculate } from "../../Common/PasswordMeter";
import { LogoPortal } from "../../Common/LogoPortal";



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


  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <>
      <main>
        <section className='section-container py-16'>
          <form
            onSubmit={props.handleSubmit}
            className='mx-auto max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'>
            <LogoPortal className='mx-auto mb-4 max-w-60' />

            <p className='mx-auto w-full text-balance text-center text-lg text-slate-600'>
              ¡Recibe una cordial bienvenida! Para crear una cuenta, y poder enviar solicitudes de información a entidades, favor completa la siguiente información. ¿Tienes dudas sobre este proceso?
              &nbsp;
              <a
                className='font-medium text-primary hover:underline hover:underline-offset-2'
                href='/tutoriales'>Revisa nuestro tutorial.
              </a>

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
                        type={
                          field.name === "confirm_password" ?
                            (showConfirmPassword ? "text" : field.type_field)
                            : (props.showPassword ? "text" : field.type_field)
                        }
                        placeholder={field.helptext}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        name={field.name}

                      />
                      <button
                        type='button'
                        className='absolute right-0 top-0 p-2 text-gray-600 outline-primary hover:cursor-pointer'
                        onClick={() => {
                          if (field.name === "confirm_password") {
                            setShowConfirmPassword(!showConfirmPassword)
                          } else {
                            props.handleShowPassword()
                          }
                        }}
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
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        options={[
                          {
                            value: "",
                            label: field.helptext,
                          },

                          ...(field.options?.map((option) => {
                            return {
                              value: option.id as string,
                              label: option.name,
                            };
                          }) as { value: string; label: string }[]),
                        ]}

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
                        <a href="https://transparenciav1.dpe.gob.ec/transparencia/normativa.php" target="_blank">
                          {field.description}
                        </a>
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
                        placeholder={field.helptext}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 "
                        value={
                          props.data[field.name as keyof RegisterDto] as string
                        }
                        onChange={(e) =>
                          props.setData(field.name, e.target.value)
                        }
                        name={field.name}
                      />
                      {
                        field.name == "username" && (
                          <p className="text-xs text-gray-500">
                            Tu nombre de usuario no puede contener espacios en blanco ni símbolos. Es indistinto que lo escribas con mayúsculas o minúsculas.
                          </p>
                        )
                      }



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
