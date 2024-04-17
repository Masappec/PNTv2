import { FaEdit, FaClock } from "react-icons/fa"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { Badge, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { Solicity } from "../../../../domain/entities/Solicity"
import { StageSolicity, StatusSolicity, StatusStageSolicity } from "../../../../utils/enums"



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
                            title: "Entidad",
                            render: (solicity) => (
                                <p className="text-sm font-semibold flex-nowrap col-span-10">
                                    {
                                        solicity.estblishment_name && solicity.estblishment_name.length > 20 ? solicity.estblishment_name.substring(0, 20) + "..." : solicity.estblishment_name

                                    }
                                </p>
                            ),
                            width: 2
                        },
                        {
                            title: "Fecha de recepción",
                            render: (solicity) => (
                                <p>{
                                    solicity.date ? new Date(solicity.date).toLocaleDateString() : ""
                                }</p>
                            )
                        },
                        {
                            title: 'Fecha respuesta',
                            render: (solicity) => {

                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.RESPONSE)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleDateString() : ""
                                }</p>
                            }
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
                            title: "SAIP",
                            render: (solicity) => {
                                console.log(solicity)
                                const status = StatusSolicity[solicity.status as keyof typeof StatusSolicity]
                                const bg = status?.bg || "info"
                                return (

                                    <div className="flex items-center">
                                        <Badge color={bg} className="rounded-2xl py-3 px-3">
                                            {status.icon}
                                            {status.value}
                                        </Badge>
                                    </div>
                                )
                            }
                        },
                        {
                            title: "Fecha insistencia/correción",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INSISTENCY)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleDateString() : ""
                                }</p>
                            }
                        },
                        {
                            title: "Fecha entrega",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.RESPONSE_INSISTENCY)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleDateString() : ""
                                }</p>
                            }

                        },
                        {
                            title: 'Días transcurridos',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.RESPONSE_INSISTENCY)
                                return <p>{
                                    element ? Math.floor((new Date().getTime() - new Date(element.created_at).getTime()) / (1000 * 60 * 60 * 24)) : ""
                                }</p>
                            }
                        },
                        {
                            title: 'Insistencia/Correción',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INSISTENCY)
                                const status = StatusStageSolicity[element?.status as keyof typeof StatusStageSolicity]

                                return <p>{
                                    element ? status.icon : <FaClock size={20} />
                                }</p>
                            }
                        },
                        {
                            title: 'Fecha gestión oficiosa',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StageSolicity.INFORMAL_MANAGEMENT)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleDateString() : ""
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
                            title: 'No. SAIP',
                            render: (solicity) => (
                                <p>{
                                    solicity.number_saip
                                }</p>
                            )
                        },


                        {
                            title: "Acciones",
                            render: (item) => (
                                <div className="flex items-center">


                                    <button
                                        onClick={() => {
                                            props.onEdit(item)
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaEdit />
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