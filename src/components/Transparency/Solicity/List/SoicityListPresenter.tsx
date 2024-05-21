import { FaClock } from "react-icons/fa"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { Badge, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { Solicity } from "../../../../domain/entities/Solicity"
import { StageSolicity, StatusSolicity, StatusStageSolicity } from "../../../../utils/enums"
import { FiEdit2 } from "react-icons/fi"



interface Props {
    data: Solicity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (item: Solicity) => void
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
    totalPage: number;
    limits: number[]
    onChangesLimit: (limit: number) => void
}

const SolicityListPresenter = (props: Props) => {
    return (
        <div className="">
            <div className="flex items-center py-5 justify-center ">


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
            <div className="flex justify-between items-center  mt-5">
                <Table
                    show={true}
                    limits={props.limits}
                    onChangesLimit={props.onChangesLimit}
                    columns={[
                        {
                            title: "#",
                            render: (solicity, index) => (
                                <a
                                    className="text-blue-500 hover:courser-pointer hover:underline"
                                    onClick={() => props.onEdit(solicity)}
                                >{index + 1}</a>
                            )
                        },
                        {
                            title: "Entidad",
                            render: (solicity) => (
                                <p className="text-sm font-semibold flex-nowrap col-span-10">
                                    {
                                        solicity.estblishment_name

                                    }
                                </p>
                            ),
                            width: 2
                        },
                        {
                            title: "No. SAIP",
                            render: (solicity) => (
                                <a href="#" className="text-blue-500 hover:courser-pointer hover:underline"
                                    onClick={() => props.onEdit(solicity)}>
                                    {solicity.number_saip}
                                </a>

                            )
                        },
                        {
                            title: "Solicitante",
                            render: (solicity) => (
                                <p
                                    onClick={() => props.onEdit(solicity)}

                                >
                                    <a href="#" className="text-blue-500 hover:courser-pointer hover:underline"
                                        onClick={() => props.onDetail()}>
                                        {solicity.first_name} {solicity.last_name}
                                    </a>
                                </p>
                            )
                        },
                        {
                            title: "Fecha de recepción",
                            render: (solicity) => (
                                <p>{
                                    solicity.date ? new Date(solicity.date).toLocaleString() : ""
                                }</p>
                            )
                        },

                        {
                            title: "Días transcurridos",
                            render: (solicity) => (
                                <p>{
                                    solicity.date ? Math.floor((new Date().getTime() - new Date(solicity.date).getTime()) / (1000 * 60 * 60 * 24)) : ""
                                }</p>
                            )
                        },

                        {
                            title: "Estado",
                            render: (solicity) => {
                                console.log(solicity)
                                const status = StatusSolicity[solicity.status as keyof typeof StatusSolicity]
                                const bg = status?.bg || "info"
                                return (

                                    <div className="flex items-center">
                                        <Badge color={bg} className="rounded-2xl py-3 px-3">
                                            {status.value}
                                        </Badge>
                                    </div>
                                )
                            }
                        },
                        {
                            title: 'Fecha respuesta SAIP',
                            render: (solicity) => {

                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.RESPONSE)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : ""
                                }</p>
                            }
                        },
                        {
                            title: "Fecha insistencia",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INSISTENCY)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : ""
                                }</p>
                            }
                        },
                        {
                            title: "Fecha R. Insistencia",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.RESPONSE_INSISTENCY)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : ""
                                }</p>
                            }
                        },
                        {
                            title: "Fecha gestión oficiosa",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INFORMAL_MANAGEMENT)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : ""
                                }</p>
                            }
                        },
                        {
                            title: 'Insistencia/ \n Correción',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INSISTENCY)
                                const status = StatusStageSolicity[element?.status as keyof typeof StatusStageSolicity]

                                return <p>{
                                    element ? status.icon : <FaClock size={20} />
                                }</p>
                            }
                        },
                        {
                            title: 'Gestión oficiosa',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INFORMAL_MANAGEMENT)
                                const status = StatusStageSolicity[element?.status as keyof typeof StatusStageSolicity]
                                return <p>{
                                    element ? status.icon : <FaClock size={20} />
                                }</p>

                            },
                        },

                        {
                            title: "Acciones",
                            render: (item) => (
                                <div className="flex items-center">



                                    <button
                                        onClick={() => {
                                            props.onEdit(item)
                                        }}
                                        className="py-2 px-2 text-lg hover:text-blue-500">
                                        <FiEdit2 />
                                    </button>

                                </div>
                            )
                        }
                    ]}
                    currentPage={props.page}
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
            </div >
        </div >
    )
}


export default SolicityListPresenter;