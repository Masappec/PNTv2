import { LuCheck, LuX } from "react-icons/lu"
import Input from "../../../Common/Input"
import Select from "../../../Common/Select"
import { ChangeEvent, FormEvent } from "react"
import Alert from "../../../Common/Alert"
import RoleEntity from "../../../../domain/entities/RoleEntity"
import UserEntity from "../../../../domain/entities/UserEntity"
import FormFieldsEntity from "../../../../domain/entities/FormFieldsEntity"
import Spinner from "../../../Common/Spinner"

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

}

const UserEditPresenter = (props: UserEditPresenterProps) => {
    if (!props.data.id && props.loading)
        return (<div className="flex items-center py-5 justify-center">
            <Spinner />
        </div>)


    return (
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
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuX className="w-5 h-5" />
                                <span>
                                    Cancelar
                                </span>
                            </button>

                            <button
                                type="submit"
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuCheck className="w-5 h-5" />
                                <span>
                                    Guardar
                                </span>
                            </button>
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
                            />
                        }
                        <div className="grid xl:grid-cols-3 gap-4">

                            {
                                props.fields.map((field) => {
                                    return (
                                        field.type_field === 'select' ? <div className="flex  flex-col m-2 ">

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
                                            />
                                        </div> :
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
    )
}

export default UserEditPresenter