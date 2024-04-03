import { FaTrash, FaEdit, FaArrowAltCircleRight, FaFileInvoice, FaUserClock } from "react-icons/fa"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { Solicity } from "../../../../domain/entities/Solicity"
import StatusBadge from "../../../Common/StatusBadge"



interface Props {
    data: Solicity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: () => void
    search: string
    setSeach: (search: string) => void
    page: number
    setPage: (page: number) => void
    setVisibleModal: (visible: boolean) => void
    visibleModal: boolean
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: () => void
    onResponse: () => void
    onHold: () => void
    onDetail: () => void


    from: number
    to: number
    total: number
    totalPage: number
}

const SolicityListPresenter = (props: Props) => {
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
                        {`¿Desea eliminar esta solicitud "" ?`}
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
                            title: "Solicitud",
                            render: (solicity) => (
                                <p>{
                                    solicity.text &&
                                        solicity?.text?.length > 50 ?
                                        solicity.text?.substring(0, 50) + "..." : solicity.text
                                }</p>
                            )
                        },
                        {
                            title: "Estado",
                            render: (solicity) => (
                                <p>
                                    <StatusBadge status={solicity.status} />
                                </p>
                            )
                        },


                        {
                            title: "Acciones",
                            render: () => (
                                <div className="flex items-center">
                                    <button
                                        onClick={() => {
                                            props.onResponse()

                                        }
                                        }
                                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaArrowAltCircleRight />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.onHold()

                                        }
                                        }
                                        className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaUserClock />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.onDetail()

                                        }
                                        }
                                        aria-label="Ver Detalles"

                                        className="bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaFileInvoice />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.onEdit()
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.onDelete()

                                        }
                                        }
                                        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaTrash />
                                    </button>

                                </div>
                            )
                        }
                    ]}
                    currentPage={1}
                    data={props.data}
                    description="aquí se muestran las instituciones registradas en el sistema"
                    length={0}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Crear Solicitud"
                    textImport="Importar Solicitudes"
                    title="Solicitudes"
                    key={""}
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


export default SolicityListPresenter;