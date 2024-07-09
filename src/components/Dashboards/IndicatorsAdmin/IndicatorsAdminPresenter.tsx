import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { PublicDataApiResponse } from "../../../infrastructure/Api/PublicDataApi/interface";
import { useEffect, useState } from "react";
import TablePublic from "../../Common/TablePublic";
import { Link } from "react-router-dom";


interface Props {

  data: PublicDataApiResponse;
}
const IndicatorsAdminPresenter = (props: Props) => {



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
        series: [props.data.entites_total.not_updated, props.data.entites_total.not_updated],
        labels: ["Actualizadas",
          "No actualizadas"],
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
              Entidades con Transparencia Activa
            </h2>
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
        <div className="flex flex-col md:flex-row mt-10 w-full rounded-2xl justify-center gap-5 p-5 shadow-lg">
          <div className="flex flex-col w-full md:w-1/2 bg-white p-5 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-center">
              Top 20 Entidades más visitadas
            </h4>
            <TablePublic
              columns={[
                {
                  title: 'Institución',
                  render: (row) => <span className="text-gray-700 font-medium">
                    <Link to={`/entidades/${row.slug}`}
                      className='uppercase cursor-pointer text-primary hover:underline hover:underline-offset-2'

                    >
                      {row.name}
                    </Link>
                  </span>
                },
                {
                  title: 'Visitas',
                  render(row) {
                    return (
                      <span className="text-gray-500">{row.visits}</span>
                    );
                  }
                }
              ]}
              data={props.data.top_20_most_visited}
              Notpaginable={true}
            />
          </div>

          <div className="flex flex-col w-full md:w-1/2 bg-white p-5 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4 text-center">
              Top 20 de entidades que están al día
            </h4>
            <TablePublic
              columns={[
                {
                  title: 'Institución',
                  render: (row) => <span className="text-gray-700 font-medium">
                    <Link to={`/entidades/${row.establishment.slug}`}
                      className='uppercase cursor-pointer text-primary hover:underline hover:underline-offset-2'

                    >
                      {row.establishment.name}
                    </Link>
                  </span>
                },
                {
                  title: 'Puntaje',
                  render(row) {
                    return (
                      <span className="text-gray-500">{row.score}/100</span>
                    );
                  }
                }
              ]}
              data={props.data.top_20}
              Notpaginable={true}
            />
          </div>
        </div>


      </div>
    </div>
  );
};

export default IndicatorsAdminPresenter;
