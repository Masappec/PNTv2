import { FaEdit, FaTrash } from "react-icons/fa";
import RoleEntity from "../../../../domain/entities/RoleEntity";
import Table from "../../../Common/Table/index";
import Modal from "../../../Common/Modal";
import Alert from "../../../Common/Alert";
import { Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";


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

        <div className=" w-full">
            <div className="flex items-center py-5 justify-center">

                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                >
                    {
                        props.error && <Alert type="error" message={props.error} onClose={() => { }} />
                    }


                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {`¿Desea eliminar este Rol "${props.selectedRole?.name}" ?`}
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
                    show= {true}
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