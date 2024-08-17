import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { PublicDataApiResponse, Top20 } from "../../../infrastructure/Api/PublicDataApi/interface";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../Common/Table";
import { CalendarMonth } from "../../Common/CalendarYear";
import { FaCalendarAlt } from "react-icons/fa";


interface Props {

  data: PublicDataApiResponse;
  top_20: Top20[];
  current: number;
  pageSize: number;
  from : number;
  to : number;
  total: number;
  total_pages: number;
  onPaginate: (page: number) => void;
  onSelectedMonth: (month: number) => void;
  year: number;
  month: number;
  onSelectedYear: (year: number) => void;
}
const IndicatorsAdminPresenter = (props: Props) => {

  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = { month: 'long' };
  const mesActual = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);

  const [chartPieSolicities, setChartPieSolicities] = useState<ApexOptions>({
    chart: {
      id: "donut",
    },
    dataLabels: {
      enabled: false,
    },

    series: [],
    labels: [],
    colors: ["#1A7290", "#5CA9C3", "#e2e8f0"],
  });


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
  const [chartLine, setChartLine] = useState<ApexOptions>({
    chart: {
      id: "line",
    },

    xaxis: {
      categories: [
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
      ],
    },
    stroke: {
      curve: "smooth",
    },

    series: [
      {
        name: "series-1",
        data: [0, 100, 100, 200, 100, 300, 200, 100, 200, 300, 400, 400],
        color: "#337FA6",
      },

    ],
  });

  useEffect(() => {
    if (props.data) {
      setChartPieSolicities({
        chart: {
          id: "donut",
          width: 1000,
          height: 1000,

        },
        dataLabels: {
          enabled: false,
          formatter: function (val, opts) {
            console.log(val, opts);
            return opts.w.config.series[opts.seriesIndex];
          }

        },
        series: [props.data.entites_total.updated, props.data.entites_total.not_updated, props.data.entites_total.nearly_updated],
        labels: ["Actualizadas",
          "No actualizadas", "Incompletas"],
        colors: ["#1A7290", "#7DBACF"],
      });




      setChartLine({
        ...chartLine,
        series: [
          {
            name: "Atendidas",
            data: [...props.data.solicities.atendidas],
            color: "#337FA6",
          },
          {
            name: "Recibidas",
            data: [...props.data.solicities.recibidas],
            color: "#337FA6",
          },
        ],
      });
    }
  }, [props.data]);


  return (
    <div className="h-full overflow-y-hidden bg-white">
      <div className="border-gray-300 py-5 flex  justify-center w-full">
        <h2 className="text-2xl font-semibold text-black ml-2 justify-center">Indicadores</h2>
      </div>

      <div className="mt-16">



        <div className="flex flex-col md:flex-row mt-10 w-full rounded-2xl justify-center gap-5 p-5shadow-lg">
          <div className="container w-auto border  h-fit px-3 py-6 rounded-3xl">
            <h2 className="text-start font-semibold text-sm">
            Instituciones que han publicado sus datos de transparencia en el Portal
            </h2>
            <h2 className="text-start font-semibold text-primary text-sm mt-2 ml-3">
            Escoge el mes 
            </h2>
            <div className="relative">

              <button className="text-primary hover:text-primary-dark
              focus:outline-none focus:ring-2 focus:ring-primary-dark
              rounded-md px-3 py-2"
                type="button"
                onClick={() => setVisible(!visible)}
              >
                <span className="text-sm font-semibold">
                  {
                    meses[props.month - 1]
                  }
                </span>
                &nbsp;
                <span className="text-sm font-semibold">
                  {props.year}
                </span>
                
                <FaCalendarAlt />
                

              </button>
              <CalendarMonth
                visible={visible}
                onMonthSelect={(month) => props.onSelectedMonth(month + 1)}
                onYearSelect={(year) => props.onSelectedYear(year)}
                setVisible={setVisible}
              />
            </div>

            <Chart
              options={chartPieSolicities}
              series={chartPieSolicities.series}
              type="donut"
              width={500}

            />
          </div>
          <div className="container border   w-1/2 rounded-2xl  ">
            <h2 className="text-start font-semibold text-sm px-5 py-5">
              Cantidad total de solicitudes recibidas vs atendidas
            </h2>

            <Chart options={chartLine} series={chartLine.series} type="line" />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-10 w-full rounded-2xl justify-center gap-5 p-5 shadow-lg">
          <div className="flex flex-col w-full  bg-white p-5 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-center">
            Lista de entidades ordenadas según la cantidad de consultas sobre transparencia que reciben en el  Portal
            </h4>
            <br />
            <h4 className="text-xl font-semibold mb-4 text-center">
            Listado de todas
            </h4>            
            <Table
              columns={[
                {
                  title: 'Institución',
                  render: (row) => <span className="flex items-center">
                    <Link
                      to={`/entidades/${row.slug}`}
                      className='uppercase 
                                                text-wrap
                                                cursor-pointer text-primary hover:underline
                                            justify-start
                                            hover:underline-offset-2'>
                      {row.name}
                    </Link>

                  </span>
                  ,
                  classes: 'justify-start'
                },
                {
                  title: 'Total de consultas '  + mesActual ,
                  render(row) {
                    return (
                      <span className="text-gray-500">{row.visits}</span>
                    );
                  }
                }
              ]}
              data={props.data.top_20_most_visited}
              show={props.data.top_20_most_visited.length > 0}
            />
          </div>

          <div className="flex flex-col w-full  bg-white p-5 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-center">
          Listado de instituciones según su cumplimiento de atención de solicitudes de acceso a la información pública
            </h4>
            <h4 className="text-xl font-semibold mb-4 text-center">
              Entidades y su cumplimiento
            </h4>
            <Table<Top20>

              columns={[
                {
                  title: 'Institución',
                  render: (row) => <span className="flex items-center">
                    <Link
                      to={`/entidades/${row.establishment.slug}`}
                      className='uppercase 
                                                text-wrap
                                                cursor-pointer text-primary hover:underline
                                            justify-start
                                            hover:underline-offset-2'>
                      {row.establishment.name}
                    </Link>

                  </span>
                  ,
                },
                {
                  title: 'Score SAIP',
                  render(row) {
                    return (
                      <span className="text-gray-500">{row.score}/100</span>
                    );
                  }
                },
                {
                  title: 'Total Solicitudes Recibidas',
                  render(row) {
                    return (
                      <span className="text-gray-500">{row.recibidas}</span>
                    );
                  }
                },
                {
                  title: 'Total Solicitudes Atendidas',
                  render(row) {
                    return (
                      <span className="text-gray-500">{row.atendidas}</span>
                    );
                  }
                },
                {
                  title:'Total Prórrogas Solicitadas',
                  render(row){
                    return(
                      <span className="text-gray-500">{row.prorrogas}</span>
                    )
                  }
                },
                {
                  title:'Total Insistencias de Solicitudes',
                  render(row){
                    return(
                      <span className="text-gray-500">{row.insistencias}</span>
                    )
                  }
                },
                {
                  title:'Total Solicitudes sin Respuesta',
                  render(row){
                    return(
                      <span className="text-gray-500">{row.no_respuestas}</span>
                    )
                  }
                }
              ]}
              data={props.top_20}
              show={true}
              currentPage={props.current}
              from={props.from}
              onChangePage={props.onPaginate}
              to={props.to}
              total={props.total}
              totalPages={props.total_pages}
            />
          </div>
        </div>


      </div>
    </div>
  );
};

export default IndicatorsAdminPresenter;
