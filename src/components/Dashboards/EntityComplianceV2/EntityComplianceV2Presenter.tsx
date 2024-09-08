import { FaCalendarAlt } from "react-icons/fa";
import Table from "../../Common/Table";
import { CalendarMonth } from "../../Common/CalendarYear";
import { useState } from "react";
import { ComplianceEstablisment } from "../../../infrastructure/Api/PublicDataApi/interface";
import { Pagination } from "../../../infrastructure/Api";



interface Props {

    data: Pagination<ComplianceEstablisment>;
    current: number;
    pageSize: number;
    from: number;
    to: number;
    total: number;
    total_pages: number;
    onPaginate: (page: number) => void;
    onSearch: (search: string) => void


    month: number;
    onSelectedMonth: (month: number) => void;
    onSelectedYear: (year: number) => void;
    year: number;

}
const EntityComplianceV2Presenter = (props: Props) => {
    const [visible, setVisible] = useState<boolean>(false);

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]



    return (
        <>


            <h2 className='mb-14 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary '>
                {"Cumplimiento de Entidades"}

            </h2>
            <section className='mb-4 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center mt-7'>
                <div className='w-full max-w-md'>
                    <div className='group relative'>
                        <svg
                            className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-focus-within:text-primary group-hover:text-primary'
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
                            placeholder='Buscar por nombre de la institución'
                            onChange={(e) => { props.onSearch(e.target.value) }}
                        />
                    </div>
                </div>

                <div className="">

                    <button className="text-primary hover:text-primary-dark
                        focus:outline-none focus:ring-2 focus:ring-primary-dark
                        rounded-md px-3 py-2 border-2 w-96"
                        type="button"
                        onClick={() => setVisible(!visible)}
                    >

                        <FaCalendarAlt className=" mt-1 absolute" />
                        <span className="-ml-10"> Escoge el mes: {
                            meses[props.month - 1]
                        }
                        </span>
                        &nbsp;
                        <span className="text-sm font-semibold">
                            {props.year}
                        </span>




                    </button>
                    <CalendarMonth
                        visible={visible}
                        onMonthSelect={(month) => props.onSelectedMonth(month + 1)}
                        onYearSelect={(year) => props.onSelectedYear(year)}
                        setVisible={setVisible}
                    />
                </div>
            </section>
            <section className='h-min rounded-md bg-gray-100'>
                <Table
                    show={false}
                    columns={[
                        {
                            title: "Institución",
                            render: (row) => (
                                <p className="text-left text-wrap">{row.name}</p>
                            )
                        },
                        {
                            title: "Transparencia Activa Publicados/Total",
                            render: (row) => (
                                <p >{row.total_published_ta }/{row.total_numeral_ta}</p>
                            )
                        },
                        {
                            title: "Transparencia Pasiva Recibidas/Respondidas",
                            render: (row) => (
                                <p  >{ row.total_solicities_rec}/{row.total_solicities_res}</p>
                            )
                        },
                        {
                            title: "Transparencia Focalizada Publicados",
                            render: (row) => (
                                <p >{row.total_tf }</p>
                            )
                        },
                        {
                            title: "Transparencia Colaborativa Publicados",
                            render: (row) => (
                                <p  >{row.total_tc }</p>
                            )
                        },



                    ]}
                    data={props.data.results}
                    currentPage={props.data.current}
                    from={props.from}
                    onChangePage={props.onPaginate}
                    to={props.to}
                    total={props.total}
                    totalPages={props.total_pages}
                    onSearch={props.onSearch}

                />
            </section>

        </>
    );
};

export default EntityComplianceV2Presenter