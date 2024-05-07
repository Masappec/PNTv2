import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import Alert from "../../../Common/Alert";
import PermissionEntity from "../../../../domain/entities/PermissionEntity";
import Checkbox from "../../../Common/Checkbox";
import Input from "../../../Common/Input";
import RoleEntity from "../../../../domain/entities/RoleEntity";
import Spinner from "../../../Common/Spinner";

interface RoleEditPresenterProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error: string | null;
    success: string | null;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    onCancel: () => void;
    permissions: { type: string, list: PermissionEntity[] }[];
    onSelected: (checked: boolean, permission: PermissionEntity) => void;
    isSelected: (e: PermissionEntity) => boolean;
    setRole: (data:RoleEntity) => void;
    role: RoleEntity;
}

const RoleEditPresenter = (props: RoleEditPresenterProps) => {
    if (!props.role.id) return (<div className="flex items-center py-5 justify-center">
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
                                    Crear un nuevo Rol
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para crear un nuevo rol
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
                                    Crear
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
                        <div className="flex flex-col mb-5 w-1/2">
                        <Input   placeholder="Nombre del rol"
                        onChange={(e) => props.setRole({...props.role, name: e.target.value})}
                        value={props.role.name}

                        />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <h5 className="text-gray-700 text-sm font-bold mb-2">
                                Permisos
                            </h5>
                        </div>


                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                props.permissions.map((type) => (
                                    <div>
                                        <h5 className="text-gray-700 text-sm font-bold mb-2">{type.type}</h5>
                                        {type.list.map((permission) => (
                                            <Checkbox
                                                id={permission.id + ""}
                                                label={permission.name}
                                                checked={props.isSelected(permission)}
                                                onChange={(checked) => props.onSelected(checked, permission)}
                                            />
                                        ))}
                                    </div>
                                ))
                            }
                            </div>



                    </div>

                </section>
            </form>
        </div>
    )
}

export default RoleEditPresenter;