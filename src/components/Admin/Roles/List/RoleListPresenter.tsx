import { FaEdit, FaTrash } from "react-icons/fa";
import RoleEntity from "../../../../domain/entities/RoleEntity";
import Table from "../../../Common/Table";
import Modal from "../../../Common/Modal";
import Title from "../../../Common/Title";
import Alert from "../../../Common/Alert";


interface Props {
    roles: RoleEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (role: RoleEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    nextPage: number
    previousPage: number
    setPage: (page: number) => void
    setVisibleModal: (visible: boolean) => void
    visibleModal: boolean
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (RoleEntity: RoleEntity) => void
    selectedRole: RoleEntity | null
}
const RoleListPresenter = (props: Props) => {

    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">

                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                    width="w-[500px]"
                >
                    {
                        props.error && <Alert type="error" message={props.error} onClose={() => { }} />
                    }
                    <Title title={`¿Desea eliminar este Rol "${props.selectedRole?.name}" ?`} color="black" text="" />
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
                            title: "Nombre",
                            render: (row: RoleEntity) => (
                                <p>{row.name}</p>
                            )
                        },
                        {
                            title: "Acciones",
                            render: (row: RoleEntity) => (
                                <div className="flex items-center">
                                    <button
                                        onClick={() => {
                                            props.onEdit(row)
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.onDelete(row)

                                        }
                                        }
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaTrash />
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    currentPage={1}
                    data={props.roles}
                    description="Roles"
                    length={props.roles.length}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Agregar Rol"
                    textImport="Importar Roles"
                    title="Roles"
                    key={"roles-table"}



                />
            </div>
        </div>
    );
}

export default RoleListPresenter;