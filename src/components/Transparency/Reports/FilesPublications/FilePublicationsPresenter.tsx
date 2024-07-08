
import Table from "../../../Common/Table/index"
import { IReportRow } from "../../../../infrastructure/Api/Reports/interface"



interface Props {
    data: IReportRow[]
    error: string | null
   
    page: number
    setPage: (page: number) => void
   


    from: number
    to: number
    total: number
    totalPage: number
    limits: number[];
    onExport: () => void;
    
}

const FilePublicationPresenter = (props: Props) => {



    return (
        <>
        <section className="flex justify-between">
            <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                Archivos Publicados Por Mes / {new Date().getFullYear()}

            </h2>

            <div className="flex justify-end">
                    <button className='inline-flex w-full items-center gap-2 rounded-md border border-primary px-5 py-2.5 text-center text-xs font-medium text-gray-600 transition-colors hover:bg-primary hover:text-white focus:outline-none'

                    onClick={props.onExport}
                >Exportar</button>
            </div>
        </section>

            <section className='h-min rounded-md bg-gray-100'>


                <Table<IReportRow>
                    show={false}
                    limits={props.limits}
                    sorteable={false}
                
                    columns={[
                        {
                            title: "N°",
                            render: (row, index) => (
                                <p>{index + 1}</p>
                            )
                        },
                        {
                            title: "Mes",
                            key: "mes",
                            render: (row) => (
                                <p>
                                    {row.mes}
                                </p>
                            )
                        },
                        {
                            title: "Tipo de Transparencia",
                            key: "first_name",
                            render: (row) => (
                                <p>
                                    {row.tipo}
                                </p>
                            )
                        },
                        {
                            title: "Descripción de Transparencia",
                            key: "date",
                            render: (solicity) => (
                                <p>{
                                    solicity.descripcion
                                }</p>
                            )
                        },

                        {
                            title: "Enlace a archivo",
                            key: "date",
                            render: (solicity) => (
                                <a href={solicity.enlace} target="_blank" rel="noreferrer" className="text-primary underline">
                                    {solicity.enlace}
                                </a>
                                    
                            )
                        },





                    ]}
                    currentPage={props.page}
                    data={props.data}
                    description="aquí se muestran las instituciones registradas en el sistema"
                    length={0}

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


export default FilePublicationPresenter;