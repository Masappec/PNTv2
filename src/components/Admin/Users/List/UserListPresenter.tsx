import UserEntity from "../../../../domain/entities/UserEntity"
import Badge from "../../../Common/Badge"
import Table from "../../../Common/Table"
import Modal from "../../../Common/Modal"
import Alert from "../../../Common/Alert"
import Title from "../../../Common/Title"
import { FaCheckCircle, FaEdit } from "react-icons/fa"
import { IoCloseCircleOutline } from "react-icons/io5";



interface Props {

    users: UserEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (user: UserEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    nextPage: number
    previousPage: number
    setPage: (page: number) => void
    visibleModal: boolean
    selectedUser: UserEntity | null,
    setVisibleModal: (visible: boolean) => void
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (user: UserEntity) => void,
    type_alert:"success" | "warning" | "info" | "error" 
}

export const UserListPresenter = (props: Props) => {
    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">

                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                    width="w-[500px]"
                >
                    {
                        props.error && <Alert type={props.type_alert} message={props.error} onClose={() => { }} />
                    }
                    <Title title={`¿Desea ${
                        props.selectedUser?.is_active ? "inactivar" : "activar"
                    
                    } este Usuario "${props.selectedUser?.first_name} ${props.selectedUser?.last_name}" ?`} color="black" text="" />
                    <div className="space-x-4 flex justify-center items-center mt-5">
                        <button
                            onClick={() => {
                                props.onConfirmDelete()
                            }
                            }
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                            Si
                        </button>
                        <button
                            onClick={() => {
                                props.onCancelDelete()
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">
                            No
                        </button>
                    </div>
                </Modal>
            </div>
            <div className="flex justify-between items-center mt-5">
                <Table
                    columns={[
                        {
                            render: (row: UserEntity) => (
                                <p>{row.first_name + " " + row.last_name}</p>
                            ),
                            title: "Nombre",

                        },
                        {
                            render: (row: UserEntity) => (
                                <p>{row.email}</p>
                            ),
                            title: "Correo"
                        },
                        {
                            render: (row: UserEntity) => (
                                row.group?.map((group, index) => (
                                    <Badge key={index} text={group.name} color="primary" />
                                ))
                            ),
                            title: "Rol"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>{row.username}</p>
                            ),
                            title: "Usuario"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>
                                    <Badge text={row.is_active ? "Activo" : "Inactivo"} color={row.is_active ? "success" : "danger"} />
                                </p>
                            ),
                            title: "Estado"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>
                                    <button
                                        onClick={() => {
                                            props.onEdit(row)
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaEdit />
                                    </button>
                                    <button
                                    
                                        //add alt
                                        onClick={() => {
                                            props.onDelete(row)

                                        }
                                        }
                                        className={" text-white font-bold py-2 px-4 rounded-2xl" + (row.is_active ? " bg-red-500 hover:bg-red-700" : " bg-green-500 hover:bg-green-700")}>
                                        {
                                            row.is_active ? <IoCloseCircleOutline /> : <FaCheckCircle />
                                        }
                                    </button>
                                </p>
                            ),
                            title: "Acciones"
                        }
                    ]}

                    description={props.users.length === 0 ? "No hay usuarios" : "Consulta los usuarios registrados"}
                    length={props.users.length}
                    onAdd={props.onAdd}
                    onFilter={() => { }}
                    onImport={() => { }}
                    textAdd="Agregar usuario"
                    textImport="Importar usuarios"
                    title="Usuarios"
                    data={props.users}
                    currentPage={props.page}
                    onNext={() => props.setPage(props.nextPage)}
                    onPrevious={() => props.setPage(props.previousPage)}
                    onSearch={props.onSearch}
                    search={props.search}
                />
            </div>


        </div>
    )
}

export default UserListPresenter