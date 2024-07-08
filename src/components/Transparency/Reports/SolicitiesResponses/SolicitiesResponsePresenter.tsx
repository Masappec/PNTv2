
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
    onChangeStatus: (value: string) => void
    onExport: () => void

}

const SolicitiesResponsePresenter = (props: Props) => {



    return (
        <>
            <section className="flex justify-between">

                <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                    Solicitudes Respondidas

                </h2>
                <div className="flex justify-end">
                    <button className='inline-flex w-full items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-center text-xs font-medium text-gray-600 transition-colors hover:bg-primary hover:text-white focus:outline-none'

                        onClick={props.onExport}
                    >Exportar</button>
                </div>
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
                            title:"Fecha de envío",
                            key:"date",
                            render:(solicity)=>(
                                <p>{
                                    solicity.date ? new Date(solicity.date).toLocaleString() : ""
                                }</p>
                            )
                        },
                        {
                            title: "Fecha de respuesta",
                            key: "date",
                            render: (solicity) => {
                            const timeline = solicity.timeline.find((item) => item.status === StatusSolicity.RESPONSED.key)
                            const date = timeline?.created_at || ""
                            return    <p>{
                                    solicity.date ? new Date(date).toLocaleString() : ""
                                }</p>
                            }
                        },

                        

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


}


export default SolicitiesResponsePresenter;