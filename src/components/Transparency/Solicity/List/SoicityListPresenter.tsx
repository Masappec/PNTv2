import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import {  Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { Solicity } from "../../../../domain/entities/Solicity"
import { StatusSolicity } from "../../../../utils/enums"



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
    onChangesSort: (sort: string) => void
    columnsSort: string[]
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
            <div className="">
                <Table
                    show={true}
                    sorteable={true}
                    limits={props.limits}
                    onSort={props.onChangesSort}
                    onChangesLimit={props.onChangesLimit}
                    columns_sort={props.columnsSort}
                    columns={[
                        {
                            title: "N°",

                            render: (solicity, index) => (
                                <a
                                    className="text-blue-500 hover:courser-pointer hover:underline"
                                    onClick={() => props.onEdit(solicity)}
                                >{index + 1}</a>
                            )
                        },
                        {
                            title: "Entidad",
                            key: "estblishment__name",
                            render: (solicity) => (
                                <p className="text-sm font-semibold flex-wrap text-wrap col-span-10">
                                    {
                                        solicity.estblishment_name && solicity.estblishment_name

                                    }
                                </p>
                            ),
                            width: 1
                        },
                        {
                            title: "No. SAIP",
                            key: "number_saip",

                            render: (solicity) => (
                                <a href="#" className="text-blue-500 hover:courser-pointer hover:underline"
                                    onClick={() => props.onEdit(solicity)}>
                                    {solicity.number_saip}
                                </a>

                            )
                        },
                        {
                            title: "Fecha de Envío",
                            key: "date",

                            render: (solicity) => (
                                <p>{
                                    solicity.date ? new Date(solicity.date).toLocaleString() : ""
                                }</p>
                            )
                        },

                        {
                            title: "Días transcurridos",
                            key: "date",

                            render: (solicity) => (
                                <p>{
                                    solicity.date ? Math.floor((new Date().getTime() - new Date(solicity.date).getTime()) / (1000 * 60 * 60 * 24)) : ""
                                }</p>
                            )
                        },

                        {
                            title: "Estado",
                            key: "status",
                            classes: 'flex w-full justify-center',
                            render: (solicity) => {
                                const status = StatusSolicity[solicity.status as keyof typeof StatusSolicity]
                                return (
                                    
                                    <p className="text-wrap border rounded-md px-2 py-1     border-primary text-primary bg-primary/10">

                                        <span className=' text-xs font-normal  sm:text-sm'>

                                            {status.value}

                                        </span>
                                    </p>   
                                )
                            }
                        },
                        

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