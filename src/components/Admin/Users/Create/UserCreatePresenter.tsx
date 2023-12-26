import { LuCheck, LuX } from "react-icons/lu"
import Input from "../../../Common/Input"
import Select from "../../../Common/Select"
import { FormEvent } from "react"
import Alert from "../../../Common/Alert"
import RoleEntity from "../../../../domain/entities/RoleEntity"

interface UserCreatePresenterProps {
    
    type_person: string
    name: string
    last_name: string
    email: string
    identification: string
    phone: string
    address: string
    country: string
    city: string
    province: string
    role: number
    setTypePerson: (type_person: string) => void
    setName: (name: string) => void
    setLastName: (last_name: string) => void
    setEmail: (email: string) => void
    setIdentification: (identification: string) => void
    setPhone: (phone: string) => void
    setAddress: (address: string) => void
    setCountry: (country: string) => void
    setCity: (city: string) => void
    setProvince: (province: string) => void
    setRole: (role: number) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error: string | null;
    success: string | null;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    onCancel: () => void;
    roles_list: RoleEntity[]

}

const UserCreatePresenter = (props:UserCreatePresenterProps) => {


    
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
                                    Crear un nuevo usuario
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos para crear un nuevo usuario
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

                    <div  className="mt-10">
                    {
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        {
                            props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                        }
                        <div className="flex  mt-5">
                            <div className="flex-col mx-20">
                                <Select placeholder="Tipo de Persona" options={[
                                    {
                                        value: "",
                                        label: "Seleccione un tipo de persona"
                                    },
                                    {
                                        value: "natural",
                                        label: "Natural"
                                    },
                                    {
                                        value: "juridico",
                                        label: "Juridico"
                                    }
                                ]}
                                onChange={(e) => props.setTypePerson(e.target.value)}
                                />
                                <Input type="text" placeholder="Nombre" onChange={(e) => props.setName(e.target.value)} />
                                <Input type="text" placeholder="Apellido" onChange={(e) => props.setLastName(e.target.value)} />
                                <Input type="email" placeholder="Correo" onChange={(e) => props.setEmail(e.target.value)} />

                            </div>
                            <div className="flex-col mx-20">

                                <Input type="text" placeholder="Identificación" onChange={(e) => props.setIdentification(e.target.value)} />
                                <Input type="tel" placeholder="Telefono" onChange={(e) => props.setPhone(e.target.value)} />
                                <Input type="text" placeholder="Dirección" onChange={(e) => props.setAddress(e.target.value)} />
                            </div>
                            <div className="flex-col mx-20">
                                <Input type="text" placeholder="País" onChange={(e) => props.setCountry(e.target.value)} />
                                <Input type="tel" placeholder="Ciudad" onChange={(e) => props.setCity(e.target.value)} />
                                <Input type="text" placeholder="Provincia" onChange={(e) => props.setProvince(e.target.value)} />
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
                                onChange={(e) => props.setRole(parseInt(e.target.value))}
                                />
                            </div>



                        </div>

                    </div>

                </section>
            </form>
            </div>
    )
}

export default UserCreatePresenter