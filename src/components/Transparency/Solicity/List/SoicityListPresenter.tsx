
import Table from "../../../Common/Table/index"

import { Solicity } from "../../../../domain/entities/Solicity"
import { StatusSolicity } from "../../../../utils/enums"
import Alert from "../../../Common/Alert"



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

    setError: (errors: string) => void
    from: number
    to: number
    total: number
    totalPage: number;
    limits: number[]
    onChangesLimit: (limit: number) => void
    onChangesSort: (sort: string) => void
    columnsSort: string[];
    onChangeStart: (start: string) => void
    onChangeEnd: (end: string) => void
}

const SolicityListPresenter = (props: Props) => {
    return (
        <div className="">
            <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                Solicitudes

            </h2>
            {
                props.error ? <Alert
                    type="error"
                    message={props.error}
                    onClose={() => { props.setError("")}}
                />: null
            }
            <section className='mb-8 flex flex-col items-end 
            justify-between gap-4 sm:flex-row sm:items-center'>
                <div className="flex flex-row gap-6 w-full">
                    <div>


                    <label className='text-gray-500 text-sm'>Buscar</label>
                    <div className='group relative w-full max-w-xs mt-1'>
                        
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
                            placeholder='Buscar por N° SAIP o Entidad.'

                            onChange={(e) => props.onSearch(e.target.value)}

                        />
                     
                    </div>
                    </div>
                    <div className='flex flex-row gap-2'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-gray-500 text-sm'>
                                Desde
                            </label>
                            <input
                                type="date"
                                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                                placeholder="Desde"
                                onChange={(e) => props.onChangeStart(e.target.value)}
                            />
                            
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-gray-500 text-sm'>
                                Hasta
                            </label>
                        <input
                            type="date"
                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                            placeholder="Hasta"
                            onChange={(e) => props.onChangeEnd(e.target.value)}
                        />
                        </div>
                    </div>

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
            <div className="">
                <Table
                    show={false}
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
                                <a
                                    className="text-blue-500 hover:courser-pointer hover:underline"
                                    onClick={() => props.onEdit(solicity)}
                                >{solicity.estblishment_name}</a>
                            ),
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