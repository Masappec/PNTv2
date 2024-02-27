import { FaCheckCircle, FaEdit } from "react-icons/fa"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { IoCloseCircleOutline } from "react-icons/io5"
import Badge from "../../../Common/Badge"
import { Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"



interface Props {
    establishments: EstablishmentEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (role: EstablishmentEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    setPage: (page: number) => void
    setVisibleModal: (visible: boolean) => void
    visibleModal: boolean
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (RoleEntity: EstablishmentEntity) => void
    selectedEstablishment: EstablishmentEntity | null
    from: number
    to: number
    total: number
    totalPage: number
}

const EstablishmentListPresenter = (props:Props)=>{
    return (
        <div className="container">
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
                    {`¿Desea ${
                        props.selectedEstablishment?.is_active ? "desactivar" : "activar"
                    } esta Entidad "${props.selectedEstablishment?.name}" ?`} 
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
                            title: "Nombre",
                            render: (row: EstablishmentEntity) => (
                                <p>{row.name}</p>
                            )
                        },
                        {
                            title: "Abreviatura",
                            render: (row: EstablishmentEntity) => (
                                <p>{row.abbreviation}</p>
                            )
                        },
                        {
                            title: "Maxima autoridad",
                            render: (row: EstablishmentEntity) => (
                                <p>{row.highest_authority +" " +row.first_name_authority +" "+ row.last_name_authority}</p>
                            )
                        },
                        {
                            title: "Estado",
                            render: (row: EstablishmentEntity) => (
                                <Badge
                                    color={row.is_active ? "success" : "danger"}
                                    text={row.is_active ? "Activo" : "Inactivo"}
                                />
                            )
                        },
                        {
                            title: "Acciones",
                            render: (row: EstablishmentEntity) => (
                                <div className="flex items-center">
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
                                </div>
                            )
                        }
                    ]}
                    currentPage={props.page}
                    data={props.establishments}
                    description="aquí se muestran las instituciones registradas en el sistema"
                    length={props.establishments.length}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Agregar Institución"
                    textImport="Importar Instituciones"
                    title="Instituciones"
                    key={"roles-table"}
                    onChangePage={props.setPage}
                    from={props.from}
                    to={props.to}
                    total={props.total}
                    totalPages={props.totalPage}


                />
            </div>
        </div>
    )
}
export default EstablishmentListPresenter