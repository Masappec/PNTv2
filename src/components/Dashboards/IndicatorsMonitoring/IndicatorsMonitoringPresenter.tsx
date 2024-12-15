
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import PublicDataApi from "../../../infrastructure/Api/PublicDataApi";
import Insignia from "../../Common/Insignia";
import { IndicatorResponse } from "../../../infrastructure/Api/PublicDataApi/interface";
import { BiCopyAlt } from "react-icons/bi";
import { Tooltip } from "flowbite-react";
import CustomInputSearch from "../../Common/CustomInputSearch";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/Store";
import { ColourOption } from "../../../utils/interface";
import { generarQR } from "../../../utils/options";


interface Props {
    usecase: PublicDataApi,
    year: number,
}

const IndicatorsMonitoringPresenter = (props: Props) => {


    const [res, setRes] = useState<IndicatorResponse>({
        total_atendidas: 0,
        total_recibidas: 0,
        total_score: 0,
        atendidas: [],
        recibidas: [],
        score_activa: 0,
        score_saip: 0,
        day_frencuency_publish: 0,
        day_frencuency_response: 0,
        ta_published: 0,
    });
    const todas = EstablishmentEntity.generateAllEstablishment('')

    const [entity, setEntity] = useState<EstablishmentEntity>(todas);
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])

    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])
    const [qr, setQr] = useState<string>("")

    
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
    const [isSearching, SetSearching] = useState<boolean>(false)

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
            establishment_id: entity.id||0,
            year: props.year
        }).then((response) => {
            console.log(response);
            setRes(response);
            setLine({
                ...line,
                series: [
                    {
                        name: "Recibidas",
                        data: response.recibidas||0,
                        color: "#5CA9C3",
                    },
                    {
                        name: "Atendidas",
                        data: response.atendidas||0,
                        color: "#1A7290",
                    }
                ]

            })

            setChartPieSolicities({
                ...chartPieSolicities,
                series: [response.total_atendidas||0, response.total_recibidas||0],
                labels: ["Atendidas", "Recibidas"],
            })
            const imgQR = generarQR(window.location.protocol + "//" + window.location.host + "/entidades/" + entity.slug + "#indicadores")
            setQr(imgQR)
            setScore({
                ...score,
                series: [response.total_score||0],
                colors: [getColorBasedOnScore(response.total_score||0)],
                labels: [labelScore(response.total_score||0)],
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

    }, [entity, props.year]);


    const labelScore = (score: number) => {
        if (score >= 75) {
            return "Excelente";
        } else if (score >= 50) {
            return "Bueno";
        } else {
            return "Regular";
        }
    };


    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }


        if (isSearching) {
            return;
        }

        SetSearching(true)
        const _filter = listEnt.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        const filter: EstablishmentEntity[] = []

        filter.push(todas, ..._filter)
        SetSearching(false)
        callback(filter.map((item) => {
            const data: ColourOption = {
                value: item.identification || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))
    }

    return (
        <>

            <section className='my-16 flex flex-col gap-y-4 md:flex-row md:items-end' id="indicadores">
                <div className="border-gray-300 py-5 flex  justify-center w-full p-2">
                    <h2 className="text-2xl font-semibold text-black ml-2 justify-center">Indicadores Por Entidad</h2>
                </div>

            </section>
            <div className='flex flex-col gap-2 p-2'>
                <label className='text-gray-500 text-sm'>
                    Institución
                </label>
                <CustomInputSearch
                    loadOptions={loadOptions}
                    onSearch={()=>{}}
                    onSelect={(value) => {
                        const _est = listEnt.find((item) => item.identification === value.value);
                        if (_est) {
                            setEntity(_est)
                        }
                    }}
                    NoVisibleLabel={true}
                />

            </div>
            <div className="border-gray-300 py-5 flex  justify-center w-full p-2">
                <h2 className="text-2xl font-semibold text-black ml-2 justify-center">
                    {entity.name}
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">

                <div className="container h-fit px-3 relative">
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
                        <div className="flexmt-4">
                            <img src={qr} alt="insignia" />
                            <Tooltip content="QR copiado" trigger="click">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(qr);
                                    }}
                                    className="border border-primary text-white rounded-lg px-2 py-1 ml-2"
                                >
                                    <BiCopyAlt className="text-primary" />
                                </button>
                            </Tooltip>
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
                <div className="container border col-span-2  rounded-2xl  ">
                    <h2 className="text-start font-semibold text-sm px-5 py-5">
                        Solicitudes Recibidas vs Solicitudes Atendidas
                    </h2>

                    <Chart options={line} series={line.series} type="line" />
                </div>
            </div>

        
        
        </>

        

    );


};

export default IndicatorsMonitoringPresenter;