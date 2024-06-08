import { FaClock } from "react-icons/fa"
import Table from "../../../Common/Table/index"
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
    onResponse: (item: Solicity) => void
    onHold: () => void
    onDetail: () => void


    from: number
    to: number
    total: number
    totalPage: number
    limits: number[]
    onChangesLimit: (limit: number) => void
    onChangeSort: (sort: string) => void
    columnsSort: string[]
}

const SolicityListEstablishmentPresenter = (props: Props) => {



    return (
        <>
            <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                Solicitudes

            </h2>
            <section className='mb-8 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center'>
                <div className='group relative w-full max-w-sm'>
                    <svg
                        className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-hover:text-primary'
                        stroke='currentColor'
                        fill='currentColor'
                        stroke-width='0'
                        viewBox='0 0 24 24'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                    ><path
                        d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'
                    ></path>
                    </svg>
                    <input
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                        type='text'
                        placeholder='Buscar por N° SAIP o solicitante.'

                        onChange={(e) => props.onSearch(e.target.value)}

                    />
                </div>

                <button
                    type='button'
                    onClick={props.onAdd}
                    className='inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300'>
                    <div className='inline-flex items-center gap-2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='24px'
                            viewBox='0 -960 960 960'
                            width='24px'
                            fill='currentColor'
                        ><path
                            d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                        ></path>
                        </svg>
                        <span>Nueva solicitud</span>
                    </div>
                </button>
            </section>

            <section className='h-min rounded-md bg-gray-100'>


                <Table<Solicity>
                    show={false}
                    limits={props.limits}
                    sorteable={true}
                    columns_sort={props.columnsSort}
                    onSort={props.onChangeSort}
                    onChangesLimit={props.onChangesLimit}
                    columns={[
                        {
                            title: "N°",
                            key: "index",
                            render: (solicity, index) => (
                                <a className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => props.onResponse(solicity)}
                                >{index + 1}</a>
                            )
                        },
                        {
                            title: "No. SAIP",
                            key: "number_saip",
                            render: (solicity) => (
                                <a onClick={() => props.onResponse(solicity)} className="text-blue-500
                            hover:underline cursor-pointer">
                                    {solicity.number_saip}
                                </a>
                            )
                        },
                        {
                            title: "Solicitante",
                            key: "first_name",
                            render: (solicity) => (
                                <a className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => props.onResponse(solicity)}

                                > {solicity.first_name} {solicity.last_name}</a>
                            )
                        },
                        {
                            title: "Fecha de recepción",
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
                            render: (solicity) => {
                                const status = StatusSolicity[solicity.status as keyof typeof StatusSolicity]
                                return (
                                    <p className="text-wrap border rounded-md px-2 py-1     border-primary text-primary bg-primary/10">

                                        <span className=' text-xs font-normal  sm:text-sm'>

                                            {status.value_2}

                                        </span>
                                    </p>
                                )
                            }
                        },
                        {
                            title: 'Fecha respuesta SAIP',
                            key: 'date',
                            render: (solicity) => {

                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.RESPONSED.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : "No Respondida"
                                }</p>
                            }
                        },
                        {
                            title: "Fecha insistencia",
                            key: "date",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INSISTENCY_SEND.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : "No Recibida"
                                }</p>
                            }
                        },
                        {
                            title: "Fecha R. Insistencia",
                            key: "date",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INSISTENCY_RESPONSED.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : "No Enviada"
                                }</p>
                            }
                        },
                        {
                            title: "Fecha gestión oficiosa",
                            key: "date",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INFORMAL_MANAGMENT_SEND.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleDateString() : "No Recibida"
                                }</p>
                            }
                        },
                        {
                            title: 'Insistencia/ \n Correción',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INSISTENCY_RESPONSED.key)
                                const status = StatusSolicity[element?.status as keyof typeof StatusSolicity]

                                return <p className='text-center flex justify-center'>{
                                    status?.icon ? status?.icon : <FaClock size={20} className="text-primary-500 text-center" />
                                }</p>
                            }
                        },
                        {
                            title: 'Gestión oficiosa',
                            key: 'date',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INFORMAL_MANAGMENT_SEND.key)
                                const status = StatusSolicity[element?.status as keyof typeof StatusSolicity]
                                return <p className='text-center flex justify-center'>{
                                    element ? status.icon : <FaClock size={20} className="text-primary-500 text-center" />
                                }</p>

                            },
                        },

                        {
                            title: "Acciones",
                            render: (item) => (

                                <button
                                    onClick={() => {
                                        props.onResponse(item)
                                    }}
                                    className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
                                    <span>Editar</span>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        height='20px'
                                        viewBox='0 -960 960 960'
                                        width='20px'
                                        fill='currentColor'>
                                        <path d='M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z' />
                                    </svg>
                                </button>
                            )
                        }
                    ]}
                    currentPage={props.page}
                    data={props.data}
                    description="aquí se muestran las instituciones registradas en el sistema"
                    length={0}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onAdd={props.onAdd}

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

            </section>

        </>
    )

    /*
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

                <Table<Solicity>
                    show={true}
                    limits={props.limits}
                    sorteable={true}
                    columns_sort={props.columnsSort}
                    onSort={props.onChangeSort}
                    onChangesLimit={props.onChangesLimit}
                    columns={[
                        {
                            title: "N°",
                            key: "index",
                            render: (solicity, index) => (
                                <a className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => props.onResponse(solicity)}
                                >{index + 1}</a>
                            )
                        },
                        {
                            title: "No. SAIP",
                            key: "number_saip",
                            render: (solicity) => (
                                <a onClick={() => props.onResponse(solicity)} className="text-blue-500
                            hover:underline cursor-pointer">
                                    {solicity.number_saip}
                                </a>
                            )
                        },
                        {
                            title: "Solicitante",
                            key: "first_name",
                            render: (solicity) => (
                                <a className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => props.onResponse(solicity)}

                                > {solicity.first_name} {solicity.last_name}</a>
                            )
                        },
                        {
                            title: "Fecha de recepción",
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
                            render: (solicity) => {
                                const status = StatusSolicity[solicity.status as keyof typeof StatusSolicity]
                                const bg = status?.bg || "info"
                                return (

                                    <div className="flex items-center">
                                        <Badge color={bg} className="rounded-2xl py-3 px-3">
                                            {status.value_2}
                                        </Badge>
                                    </div>
                                )
                            }
                        },
                        {
                            title: 'Fecha respuesta SAIP',
                            key: 'date',
                            render: (solicity) => {

                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.RESPONSED.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : "No Respondida"
                                }</p>
                            }
                        },
                        {
                            title: "Fecha insistencia",
                            key: "date",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INSISTENCY_SEND.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : "No Recibida"
                                }</p>
                            }
                        },
                        {
                            title: "Fecha R. Insistencia",
                            key: "date",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INSISTENCY_RESPONSED.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleString() : "No Enviada"
                                }</p>
                            }
                        },
                        {
                            title: "Fecha gestión oficiosa",
                            key: "date",
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INFORMAL_MANAGMENT_SEND.key)
                                return <p>{
                                    element ? new Date(element.created_at).toLocaleDateString() : "No Recibida"
                                }</p>
                            }
                        },
                        {
                            title: 'Insistencia/ \n Correción',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INSISTENCY_RESPONSED.key)
                                const status = StatusSolicity[element?.status as keyof typeof StatusSolicity]

                                return <p>{
                                    status?.icon ? status?.icon : <FaClock size={20} />
                                }</p>
                            }
                        },
                        {
                            title: 'Gestión oficiosa',
                            key: 'date',
                            render: (solicity) => {
                                const element = solicity.timeline.find((timeline) => timeline.status === StatusSolicity.INFORMAL_MANAGMENT_SEND.key)
                                const status = StatusSolicity[element?.status as keyof typeof StatusSolicity]
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
                                            props.onResponse(item)
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
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}
                    onAdd={props.onAdd}

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

    )*/
}


export default SolicityListEstablishmentPresenter;