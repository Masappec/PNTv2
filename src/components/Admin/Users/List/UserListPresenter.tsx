import UserEntity from "../../../../domain/entities/UserEntity"
import Badge from "../../../Common/Badge"
import Table from "../../../Common/Table/index"
import Modal from "../../../Common/Modal"
import Alert from "../../../Common/Alert"
import { FaCheckCircle, FaEdit } from "react-icons/fa"
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from 'react-icons/hi';



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
    type_alert: "success" | "warning" | "info" | "error"
}

export const UserListPresenter = (props: Props) => {
    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">

                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                >
                    {
                        props.error && <Alert type={props.type_alert} message={props.error} onClose={() => { }} />
                    }


                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {`¿Desea ${props.selectedUser?.is_active ? "inactivar" : "activar"

                            } este Usuario "${props.selectedUser?.first_name} ${props.selectedUser?.last_name}" ?`}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => props.onConfirmDelete()}>
                            {"Si, Estoy seguro"}
                        </Button>
                        <Button color="gray" onClick={() => props.onCancelDelete()}>
                            No, Cancelar
                        </Button>
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
                    isImport={true}
                    onImport={props.onImport}
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