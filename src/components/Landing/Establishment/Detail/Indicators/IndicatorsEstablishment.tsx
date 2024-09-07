
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import PublicDataApi from "../../../../../infrastructure/Api/PublicDataApi";
import Insignia from "../../../../Common/Insignia";
import { IndicatorResponse } from "../../../../../infrastructure/Api/PublicDataApi/interface";


interface Props {
    usecase: PublicDataApi,
    establishment_id: number,
    year: number,
    qrUrl: string,
    establishment_name: string
}

const IndicatorsEstablishment = (props: Props) => {


    const [res, setRes] = useState<IndicatorResponse>({
        total_atendidas: 0,
        total_recibidas: 0,
        total_score: 0,
        atendidas: [],
        recibidas: [],
        score_activa: 0,
        score_saip: 0
    });
    const date = new Date();
    const monthName = date.toLocaleString('es-ES', { month: 'long' });

    const [line, setLine] = useState<ApexOptions>({
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
                name: "Recibidas",
                data: [],
                color: "#8BDDF9",
            },
            {
                name: "Atendidas",
                data: [],
                color: "#1A7290",
            }

        ],
    });

    const [chartPieSolicities, setChartPieSolicities] = useState<ApexOptions>({
        chart: {
            id: "donut",
            width: 500,
        },
        dataLabels: {
            enabled: false,
        },

        series: [10, 9, 8],
        labels: [],
        colors: ["#1A7290", "#5CA9C3", "#e2e8f0"],
    });

    const [score, setScore] = useState<ApexOptions>({
        chart: {
            height: 280,
            type: "radialBar"
        },

        series: [67],
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "14px",
            markers: {
                width: 10,
                height: 10,
                radius: 10,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10
            }
        },
        colors: ["#1A7290", "#e2e8f0", "#e2e8f0"],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "70%"
                },

                dataLabels: {
                    name: {
                        offsetY: -10,
                        show: true,
                        color: "#1A7290",
                        fontSize: "13px"
                    },
                    value: {
                        color: "#1A7290",
                        fontSize: "30px",
                        show: true,
                        formatter: function (val) {
                            return val.toString() + "/100"
                        }
                    },
                }
            }
        },

        stroke: {
            lineCap: "round",
        },
        labels: ["Cumplimiento"],

    });

    const getColorBasedOnScore = (score: number) => {
        const baseColor = "#6FC5E2"; // Gris para puntajes bajos
        if (score >= 75) {
            return "#28a745"; // Verde para puntajes altos
        } else if (score >= 50) {
            return "#ffc107"; // Amarillo para puntajes medios
        } else {
            return baseColor; // Color base para puntajes bajos
        }
    };
    useEffect(() => {

        props.usecase.getEstablishmentData({
            establishment_id: props.establishment_id,
            year: props.year
        }).then((response) => {
            console.log(response);
            setRes(response);
            setLine({
                ...line,
                series: [
                    {
                        name: "Recibidas",
                        data: response.recibidas,
                        color: "#5CA9C3",
                    },
                    {
                        name: "Atendidas",
                        data: response.atendidas,
                        color: "#1A7290",
                    }
                ]

            })

            setChartPieSolicities({
                ...chartPieSolicities,
                series: [response.total_atendidas, response.total_recibidas],
                labels: ["Atendidas", "Recibidas"],
            })

            setScore({
                ...score,
                series: [response.total_score || 0],
                colors: [getColorBasedOnScore(response.total_score || 0)],
                labels: [labelScore(response.total_score || 0)],
                //set color value
                plotOptions: {
                    ...score.plotOptions,
                    radialBar: {
                        ...score.plotOptions?.radialBar,
                        dataLabels: {
                            ...score.plotOptions?.radialBar?.dataLabels,
                            value: {
                                ...score.plotOptions?.radialBar?.dataLabels?.value,
                                color: getColorBasedOnScore(response.total_score),
                            },
                            name: {
                                ...score.plotOptions?.radialBar?.dataLabels?.name,
                                color: getColorBasedOnScore(response.total_score),
                            }
                        }
                    }
                }
            })
        }).catch((error) => {
            console.error('Error durante la solicitud:', error);
        });

    }, [props.establishment_id, props.year]);


    const labelScore = (score: number) => {
        if (score >= 75) {
            return "Excelente";
        } else if (score >= 50) {
            return "Bueno";
        } else {
            return "Regular";
        }
    };


    return (
        <>

            <section className='my-16 flex flex-col gap-y-4 md:flex-row md:items-end' id="indicadores">
                <h2 className='text-balance text-2xl font-normal leading-tight md:text-[40px]'>
                    Indicadores
                </h2>
                <div className='h-[1px] w-full bg-gray-400'>



                </div>

            </section>

            <div className="flex flex-row gap-1">

                <div className="container h-fit px-3 relative w-3/5">
                    <div className="absolute -top-10 -right-5">
                        {
                            res.total_score >= 75 ? <Insignia />
                                : null
                        }

                    </div>
                    <div className=" border rounded-2xl  p-6">
                        <h2 className="text-start font-semibold text-sm">
                            Estado de cumplimiento actual
                        </h2>
                        <h2 className="text-2xl mt-2 font-extrabold">

                        </h2>
                        <Chart
                            options={score}
                            series={score.series}
                            type="radialBar"
                            width={330}

                        />
                        <div className="flex flex-row mt-4 border-2 border-black ">

                            <div className="flex-col border-r-2 border-black">
                                <img src={props.qrUrl} alt="insignia" />

                            </div>
                            <div className="flex-col ml-2 ">
                                <p className="text-sm">
                                    {props.establishment_name}
                                </p>
                                <p className="text-sm text-primary font-bold">
                                    Cumplimiento LOTAIP - {monthName} {new Date().getFullYear()}
                                </p>
                                <p className="text-cyan-800 text-sm  font-bold">
                                    {res.total_score}/100
                                </p>
                                <p className="text-sm">
                                    Fecha: {new Date().toLocaleDateString()}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className=" border rounded-2xl p-6 mt-2" >
                        <h2 className="text-start font-semibold text-sm">
                            Número de solicitudes de información
                        </h2>
                        <h2 className="text-2xl mt-2 font-extrabold">

                        </h2>
                        <Chart
                            options={chartPieSolicities}
                            series={chartPieSolicities.series}
                            type="donut"
                            width={330}

                        />
                    </div>

                </div>
                <div className="container border  rounded-2xl  ">
                    <h2 className="text-start font-semibold text-sm px-5 py-5">
                        Solicitudes Recibidas vs Solicitudes Atendidas
                    </h2>

                    <Chart options={line} series={line.series} type="line" />
                </div>
            </div>

        </>

    );


};

export default IndicatorsEstablishment;