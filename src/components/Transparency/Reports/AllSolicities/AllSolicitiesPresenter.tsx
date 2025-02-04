
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
    onChangeStatus: (value: string) => void;
    onExport: () => void
}

const AllSolicitiesPresenter = (props: Props) => {



    return (
        <>
            <section className="flex justify-between">

                <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                    Solicitudes Recibidas

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
                            title: "Fecha de envío",
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
                            render: (solicity) => {
                                const calculateTimeDifference = (startDate: string | Date, endDate: string | Date) => {
                                    let start = new Date(startDate);
                                    let end = new Date(endDate);
                            
                                    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                                        console.error("Fechas inválidas:", { startDate, endDate });
                                        return { days: 0, hours: 0 };
                                    }
                            
                                    // Intercambiar si la fecha de inicio es mayor a la de fin
                                    if (start > end) {
                                        [start, end] = [end, start];
                                    }
                                
                                    const diffInMilliseconds = end.getTime() - start.getTime();
                                    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
                                    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                    return { days, hours };
                                };
                            
                                // Determinar la fecha de finalización según el estado y las condiciones adicionales
                                let endDate;
                            
                                switch (solicity.status) {
                                    case "RESPONSED":
                                        // Usar `updated_at` como fecha de fin en solicitudes respondidas
                                        endDate = solicity.updated_at;
                                        break;
                                    case "INSISTENCY_RESPONSED":
                                        endDate = solicity.updated_at
                                        break;
                            
                                    case "PRORROGA":
                                    case "NO_RESPONSED":
                                    case "INSISTENCY_NO_RESPONSED":
                                        // Verificar si la fecha actual ha alcanzado o superado `expiry_date`
                                        const currentDate = new Date();
                                        const expiryDate = new Date(solicity.expiry_date);
                            
                                        if (!isNaN(expiryDate.getTime()) && currentDate > expiryDate) {
                                            // Detener el contador en `expiry_date`
                                            endDate = solicity.expiry_date;
                                        } else {
                                            // Calcular hasta la fecha actual si aún no ha alcanzado `expiry_date`
                                            endDate = currentDate.toISOString();
                                        }
                                        break;
                            
                                    default:
                                        // Usar la fecha actual para otros estados
                                        endDate = new Date().toISOString();
                                        break;
                                }
                            
                                // Calcular la diferencia de tiempo desde la fecha de envío (start_date) hasta endDate
                                const timeDifference = calculateTimeDifference(solicity.date, endDate);
                            
                                return (
                                    <p>
                                        {timeDifference.days} días, {timeDifference.hours} horas
                                    </p>
                                );
                            }                            
                        },

                        {
                            title: "Estado",
                            key: "status",
                            classes: 'flex w-full justify-center',

                            render: (solicity) => {
                                const status = StatusSolicity[solicity.status as keyof typeof StatusSolicity]
                                const color = status?.bg || "bg-primary-500"
                                const border = color.replace("bg", "border")
                                return (
                                    <p className={`text-wrap border rounded-md px-2 py-1
                                        md:w-5/12 w-full
                                     ${border}
                                     ${color} text-white text-center
`}>

                                        <span className=' text-xs font-normal  sm:text-sm'>

                                            {status.value_2}

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


export default AllSolicitiesPresenter;
