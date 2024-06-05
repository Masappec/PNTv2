import { ApexOptions } from "apexcharts";
import SelectCommon  from "../../Common/Select";
import Chart from "react-apexcharts";
import Select from 'react-select/async'
import { ColourOption } from "../../../utils/interface";
import { Label } from "flowbite-react";
import { PublicDataApiResponse } from "../../../infrastructure/Api/PublicDataApi/interface";
import { useEffect, useState } from "react";


interface Props {
  loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void
  onChangeEstablishment: (value: string) => void;
  onChangeYear: (value: string) => void;
  data: PublicDataApiResponse;
}
const IndicatorsAdminPresenter = (props:Props) => {



  const [chartPieSolicities, setChartPieSolicities] = useState<ApexOptions>({
    chart: {
      id: "donut",
      width: 500,
    },
    dataLabels: {
      enabled: false,
    },
    
    series: [],
    labels: [],
    colors: ["#1A7290", "#5CA9C3", "#e2e8f0"],
  });

  const [chartPieUsers, setChartPieUsers] = useState<ApexOptions>({
    chart: {
      id: "donut",
      width: 500,
    },
    dataLabels: {
      enabled: false,
    },
    series: [],
    labels: [],
    colors: ["#1A7290", "#5CA9C3", "#e2e8f0"],
  });


  const [chartBar, setChartBar] = useState({
    chart: {
      id: "bar",
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
    series: [
      {
        name: "series-1",
        data: [0, 100, 100, 200, 100, 300, 200, 100, 200, 300, 400, 400],
        color: "#3781A9CC",

        stroke: {
          curve: "straight",
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 10, // ajusta este valor según lo redondeado que desees que sean los bordes
        columnWidth: "30%",
      },
    },
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

        },
        series: [props.data.total_responsed, props.data.total_not_responsed],
        labels: ["Atendidas", "No Atendidas"],
        colors: ["#1A7290", "#7DBACF"],
      });
      console.log(props.data.responsed, "responsed")

      setChartPieUsers({
        chart: {
          id: "donut",
          width: 1000,
          height: 1000,
        },
        dataLabels: {
          enabled: false,
        },
        series: [props.data.users.active, props.data.users.inactive],
        labels: ["Activos", "Inactivos"],
        colors: ["#1A7290", "#5CA9C3"],
      });

      setChartBar({
        ...chartBar,
        series: [
          {
            name: "Atendidas",
            data: [...props.data.responsed],
            color: "#3781A9CC",
            stroke: {
              curve: "straight",
            },
          },
        ],
      });

      setChartLine({
        ...chartLine,
        series: [
          {
            name: "No Atendidas",
            data: [...props.data.not_responsed],
            color: "#337FA6",
          },
        ],
      });
    }
  }, [props.data]);
  
  






  

  return (
    <div className="h-full overflow-y-hidden bg-white">
      <div className="border-gray-300 py-5 border-b flex  justify-center w-full">
        <h2 className="text-2xl font-semibold text-black ml-2 justify-center">Indicadores</h2>
      </div>
      <div className="flex   space-x-2 w-full justify-center mt-12">
        <div className="flex  flex-col h-[44px]  mt-6 w-[219px]  gap-2 ml-44">
          <Label >Entidad</Label>

          <Select
            loadOptions={props.loadOptions}
            placeholder="Buscar por entidad"
            noOptionsMessage={() => <>Sin Resultados</>}
            onChange={(value) => {
              props.onChangeEstablishment(value?.value || "")
            }}
            className="  mt-0 "
          />
        </div>
        <div className="flex  flex-col h-[44px]  mt-5 w-[179px]  gap-2">


          <SelectCommon
            placeholder={"Periodo"}
            onChange={(value) => {
              props.onChangeYear(value.target.value)
            }}
            options={[
              {
                value: "",
                label: "Año: Todos",
              },
              ...Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return {
                  value: year.toString(),
                  label: `Año: ${year}`
                }
              })
            ]}
          />
        </div>

        <div className=" flex  flex-col h-auto mt-5 w-[179px] gap-2">
          
        </div>
      </div>
      <div className="mt-16">
        {/* <div className="2xl:flex-row flex  flex-col space-x-2 w-full justify-center"> */}
          <div className="flex  mt-10 w-full rounded-2xl justify-center gap-5">
          <div className="container items-center border w-[400px] h-auto px-5 py-6 rounded-3xl ">
            <h2 className="text-start font-semibold text-sm">Usuarios</h2>
            <h2 className="text-2xl mt-2 font-extrabold">
              {props.data?.users.active+props.data?.users.inactive || 0}
            </h2>
            <Chart
              options={chartPieUsers}
              series={chartPieUsers.series}
              type="donut"
              width={300}
            />
          </div>
          <div className="container border w-[400px] h-auto px-3 py-6 rounded-3xl ">
            <h2 className="text-start font-semibold text-sm">
              Número de solicitudes de información
            </h2>
            <h2 className="text-2xl mt-2 font-extrabold">
              {props.data?.total || 0}
            </h2>
            <Chart
              options={chartPieSolicities}
              series={chartPieSolicities.series}
              type="donut"
              width={330}
              
            />
          </div>
        </div>

        <div className="flex  mt-10 w-full rounded-2xl justify-center">
          <div className="container border mt-10 w-[602px] rounded-2xl  ">
            <h2 className="text-start font-semibold text-sm px-5 py-5">
              Solicitudes Atendidas
            </h2>

            <Chart
              options={chartBar}
              series={chartBar.series}
              type="bar"
              width={570}
            />
          </div>
        </div>
        <div className="flex  mt-10 w-full rounded-2xl justify-center">

          <div className="container border mt-10 w-[602px] rounded-2xl  ">
            <h2 className="text-start font-semibold text-sm px-5 py-5">
              Solicitudes no Atendidas
            </h2>

            <Chart options={chartLine} series={chartLine.series} type="line" width={570} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndicatorsAdminPresenter;
