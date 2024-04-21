import Select from "../../Common/Select";
import Chart from "react-apexcharts";

const IndicatorsAdminPresenter = () => {
  const options = {
    chart: {
      id: "bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
  };

  const options1 = {
    chart: {
      id: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    series: [60, 10, 30],
    labels: ["A", "B", "C"],
    colors: ["#1A7290", "#5CA9C3", "#e2e8f0"],
  };
  const options2 = {
    chart: {
      id: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    series: [30, 70],
    labels: ["A", "B"],
    colors: ["#1A7290", "#7DBACF"],
  };
  const line = {
    chart: {
      id: "line",
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
  };

  return (
    <div className="container">
      <div className="border-gray-300 py-5 border-b  ">
        <h2 className="text-2xl font-semibold text-black ml-2">Indicadores</h2>
      </div>
      <div className="grid grid-rows-1 grid-flow-col space-x-2 w-[650px] pl-48 mt-12">
        <div className=" flex  flex-col h-[44px]  mt-5 w-[219px]  gap-2">
          <Select
            placeholder={"Entidades"}
            value={""}
            onChange={() => {}}
            options={[
              {
                value: "",
                label: "Seleccionar",
              },
            ]}
          />
        </div>
        <div className=" flex  flex-col h-[44px]  mt-5 w-[179px]  gap-2">
          <Select
            placeholder={"Periodo"}
            value={""}
            onChange={() => {}}
            options={[
              {
                value: "",
                label: "Año: Todos",
              },
            ]}
          />
        </div>

        <div className=" flex  flex-col h-[44px] mt-5 w-[179px] gap-2">
          <Select
            placeholder={"Meses"}
            value={""}
            onChange={() => {}}
            options={[
              {
                value: "",
                label: "Meses: Todos",
              },
            ]}
          />
        </div>
      </div>
      <div className="ml-48 mt-16">
        <div className="grid grid-rows-1 grid-flow-col space-x-2 w-[600px] ">
          <div className="container border w-[290px] h-[222px] px-5 py-6 rounded-3xl ">
            <h2 className="text-start font-semibold text-sm">Usuarios</h2>
            <h2 className="text-2xl mt-2 font-extrabold">55222</h2>
            <Chart
              options={options1}
              series={options1.series}
              type="donut"
              width={230}
            />
          </div>
          <div className="container border w-[290px] h-[222px] px-3 py-6 rounded-3xl ">
            <h2 className="text-start font-semibold text-sm">
              Número de solicitudes de información
            </h2>
            <h2 className="text-2xl mt-2 font-extrabold">55222</h2>
            <Chart
              options={options2}
              series={options2.series}
              type="donut"
              width={230}
            />
          </div>
        </div>

        <div className="container border mt-10 w-[602px] rounded-2xl  ">
          <h2 className="text-start font-semibold text-sm px-5 py-5">
            Solicitudes Atendidas
          </h2>

          <Chart
            options={options}
            series={options.series}
            type="bar"
            width={570}
          />
        </div>
        <div className="container border mt-10 w-[602px] rounded-2xl  ">
          <h2 className="text-start font-semibold text-sm px-5 py-5">
            Solicitudes Atendidas
          </h2>

          <Chart options={line} series={line.series} type="line" width={570} />
        </div>
      </div>
    </div>
  );
};

export default IndicatorsAdminPresenter;
