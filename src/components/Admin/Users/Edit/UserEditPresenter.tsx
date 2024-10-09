
import Select from "../../../Common/Select"
import { ChangeEvent, FormEvent } from "react"
import Alert from "../../../Common/Alert"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import UserEntity from "../../../../domain/entities/UserEntity"
import FormFieldsEntity from "../../../../domain/entities/FormFieldsEntity"
import Spinner from "../../../Common/Spinner"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import PasswordMeter, { IOncalculate } from "../../../Common/PasswordMeter"
import CustomInputSearch from "../../../Common/CustomInputSearch"
import { ColourOption } from "../../../../utils/interface"

interface UserEditPresenterProps {

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
    establishment: EstablishmentEntity | null;
    onEstablishmentSelect : (option:ColourOption)=>void
    establishmentSelected: ColourOption
    isDisabled: boolean;
    showPassword: boolean;
    handleShowPassword: () => void;
    onChangePassword: (data: IOncalculate) => void;
    loadingSubmit: boolean;
    isEstablishmentUser: boolean;
    onLoadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
}

const UserEditPresenter = (props: UserEditPresenterProps) => {
    if (!props.data.id && props.loading)
        return (<div className="flex items-center py-5 justify-center">
            <Spinner />
        </div>)

    return (
        <>
            <p className='my-8 max-w-3xl items-center text-sm text-primary'>
                Completa todos los campos y selecciona "Guardar" para añadir un nuevo usuario al portal.
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
                            selected={{
                                value: props.data.group && props.data.group?.length > 0 ? props.data.group[0].id+"":""
                            }}
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
                                                value={props.data[field.name as keyof UserEntity] as string}

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
                                :field.name === 'establishment_id' && !props.isEstablishmentUser ? 
                                <CustomInputSearch
                                    loadOptions={props.onLoadOptions}
                                    onSearch={() => {}}
                                        onSelect={props.onEstablishmentSelect}
                                        value={props.establishmentSelected}
                                    
                                    
                                />
                                
                                :field.type_field == "select" ?
                                    <div>
                                        <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                            {field.description}
                                        </label>
                                        <Select
                                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                            name={field.name}
                                            selected={
                                                field.name == 'establishment_id' ?
                                                    props.establishment ?
                                                        {
                                                            value: props.establishment.id + "",
                                                        } : undefined : 
                                                        {
                                                            value: props.data[field.name as keyof UserEntity] as string
                                                        }
                                            }
                                                onChange={(e) => (field.name !== 'establishment_id' || !props.isEstablishmentUser)
                                                    && props.setData(field.name, e.target.value)}
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
                                        />
                                    </div> :
                                    field.type_field == "checkbox" ?
                                    <div >
                                        <label className='text-sm font-medium text-gray-900' data-testid='flowbite-label'>
                                            {field.description}
                                        </label>
                                        <input
                                            className='block w-5 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                            type='checkbox'
                                            onChange={(e) =>
                                                props.setData(field.name, e.target.checked)
                                            }
                                            name={field.name}
                                            checked={props.data[field.name as keyof UserEntity] as boolean}

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
                                            value={props.data[field.name as keyof UserEntity] as string}

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
                            Guardar
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

    /*return (
        <div className="container">
            <div className="flex items-center py-5 justify-center">


            </div>
            <form className="flex  mt-5" onSubmit={props.handleSubmit}>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Actualizar Usuario "{props.data.first_name + " " + props.data.last_name}" ({props.data.username})
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para actualizar el usuario.
                            </p>
                        </div>
                        <div className="flex items-center mt-4 gap-x-3">

                            <button
                                type="button"
                                onClick={props.onCancel}
                                disabled={props.isDisabled}
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-gray-400 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-200">
                                <LuX className="w-5 h-5" />
                                <span>
                                    Cancelar
                                </span>
                            </button>

                            {
                                props.loadingSubmit ? <Spinner /> :
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-primary-400 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-600">
                                        <LuCheck className="w-5 h-5" />
                                        <span>
                                            Guardar
                                        </span>
                                    </button>
                            }
                        </div>
                    </div>

                    <div className="mt-10">
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
                            <Select placeholder="Rol" options={

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
                                selected={{
                                    value: props.data && props.data.group && props.data.group[0]
                                        ? props.data.group[0].id + "" : "",
                                }}
                            />
                        }
                        <div className="grid xl:grid-cols-3 gap-4">

                            {
                                props.fields.map((field) => {
                                    return (field.type_field === "password" ?
                                        <div className="relative mt-2">

                                            <Input
                                                type={props.showPassword ? "text" : field.type_field}
                                                placeholder={field.description}
                                                className="w-60"
                                                value={
                                                    props.data[field.name as keyof UserEntity] as string || ""
                                                }
                                                onChange={(e) =>
                                                    props.setData(field.name, e.target.value)
                                                }
                                                name={field.name}
                                            />
                                            <button
                                                type="button"
                                                className="absolute left-64 top-12  hover:cursor-pointer text-gray-600"
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
                                                        password={props.data[field.name as keyof UserEntity] as string || ""}
                                                    />
                                                )
                                            }
                                        </div> :
                                        field.type_field === 'select' ? (
                                            field.name === 'establishment_id' && props.isEstablishmentUser ?
                                                <div className="flex  flex-col m-2">
                                                    <Select
                                                        placeholder={field.description}
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
                                                        selected={
                                                            field.name == 'establishment_id' ?
                                                                props.establishment ?
                                                                    {
                                                                        value: props.establishment.id + "",
                                                                    } : undefined : undefined
                                                        }
                                                        disabled={true}
                                                    />
                                                </div>

                                                : <div className="flex  flex-col m-2 ">

                                            <Select
                                                placeholder={field.description}
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
                                                selected={
                                                    field.name == 'establishment_id' ?
                                                        props.establishment ?
                                                            {
                                                                value: props.establishment.id + "",
                                                            } : undefined : undefined
                                                }
                                            />
                                        </div> ):
                                            <div className="flex  flex-col m-2">
                                                <Input type={field.type_field}
                                                    placeholder={field.description} width="w-60"
                                                    value={props.data[field.name as keyof UserEntity] as string}
                                                    onChange={(e) => props.setData(field.name, e.target.value)}
                                                />
                                            </div>
                                    )
                                })
                            }



                        </div>

                    </div>

                </section>
            </form>
        </div>
    )*/
}

export default UserEditPresenter