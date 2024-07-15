import Select from "../../../Common/Select"
import { ChangeEvent, FormEvent } from "react"
import Alert from "../../../Common/Alert"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import UserEntity from "../../../../domain/entities/UserEntity"
import FormFieldsEntity from "../../../../domain/entities/FormFieldsEntity"
import Spinner from "../../../Common/Spinner"
import PasswordMeter, { IOncalculate } from "../../../Common/PasswordMeter"

interface UserCreatePresenterProps {

    data: UserEntity;
    setData: (name: string, value: string | boolean) => void;
    onChangeRole: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error: string | null;
    success: string | null;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    onCancel: () => void;
    roles_list: RoleEntity[]
    fields: FormFieldsEntity[];
    loading: boolean;
    isDisabled: boolean;
    showPassword: boolean;
    handleShowPassword: () => void;
    onChangePassword: (data: IOncalculate) => void;
    loadingSubmit: boolean;
    isEstablishmentUser: boolean;

}

const UserCreatePresenter = (props: UserCreatePresenterProps) => {

    return (
        <>
            <p className='my-8 max-w-3xl items-center text-sm text-primary'>
                Completa todos los campos y selecciona "Crear usuario" para añadir un nuevo usuario al portal.
            </p>

            <form
                onSubmit={props.handleSubmit}
                className='mx-auto max-w-2xl items-center rounded-lg border border-gray-100 px-6 py-10 text-center shadow-md'
                data-astro-source-loc='19:114'>
                <section
                    className='mt-4 grid grid-cols-1 items-start justify-center gap-4 text-start'
                    data-astro-source-loc='26:92'>
                    {
                        props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                    }
                    {
                        props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                    }
                    {
                        props.loading && <Spinner />
                    }
                    {
                        props.roles_list.length > 1 &&
                        <Select placeholder="Rol"
                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'

                            options={

                                [
                                    {
                                        value: "",
                                        label: "Seleccione un rol"
                                    }
                                ].concat(props.roles_list.map((role) => {
                                    return {
                                        value: role.id + "",
                                        label: role.name
                                    }
                                }))
                            }
                            onChange={(e) => props.onChangeRole(e)}
                        />
                    }
                    {
                        props.fields.map((field) => {
                            return field.type_field === "password" ?
                                <div className='relative'>
                                    <div>
                                        <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                            {field.description}
                                        </label>
                                        <div className='relative'>
                                            <input
                                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                                type={props.showPassword ? 'text' : 'password'}
                                                placeholder={field.description}
                                                name={field.name}
                                                onChange={(e) =>
                                                    props.setData(field.name, e.target.value)
                                                }
                                            />
                                            <button
                                                type='button'
                                                onClick={props.handleShowPassword}

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
                                        {
                                            field.name === "password" && (

                                                <PasswordMeter
                                                    onCalculate={props.onChangePassword}
                                                    password={props.data[field.name as keyof UserEntity] as string || ""}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                : field.type_field == "select" ?
                                    <div>
                                        <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                            {field.description}
                                        </label>
                                        <Select
                                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                            name={field.name}

                                            value={props.data[field.name as keyof UserEntity] as string}
                                            onChange={(e) => props.setData(field.name, e.target.value)}
                                            options={
                                                [{
                                                    value: "",
                                                    label: "Seleccione una opción"
                                                }].concat(field.options?.map((option) => {
                                                    return {
                                                        value: option.id + "",
                                                        label: option.name
                                                    }
                                                }) || [])
                                            }
                                            disabled={field.name === 'establishment_id' && props.isEstablishmentUser}
                                        />
                                    </div> :
                                    <div data-astro-source-loc='28:16'>
                                        <label
                                            className='text-sm font-medium text-gray-900'
                                            data-testid='flowbite-label'
                                            data-astro-source-loc='30:16'>
                                            {field.description}
                                        </label>
                                        <input
                                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                            type='text'
                                            onChange={(e) =>
                                                props.setData(field.name, e.target.value)
                                            }
                                            placeholder={"Ingresa " + field.description}
                                            name={field.name}
                                            data-astro-source-loc='32:14'
                                        />
                                    </div>

                        })
                    }


                </section>
                {
                    props.loadingSubmit ? <Spinner /> :
                        <button
                            type='submit'
                            disabled={props.isDisabled}

                            className='mt-8 w-full rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400'
                            data-astro-source-loc='249:42'>
                            Crear usuario
                        </button>
                }

                <button
                    type='button'
                    onClick={props.onCancel}

                    className='mt-8 w-full rounded-full bg-gray-400 px-6 py-3
                     text-base font-medium text-white transition-opacity hover:opacity-80 focus:outline-none 
                     focus:ring-2 focus:ring-blue-100'
                    data-astro-source-loc='249:42'>
                    Cancelar
                </button>


            </form>
        </>
    )



}

export default UserCreatePresenter