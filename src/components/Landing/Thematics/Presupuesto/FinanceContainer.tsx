

import { useEffect, useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi"
import FinancePresenter from "./FinancePresenter"
import { ColourOption } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { ResponsePresupuestos } from "../../../../infrastructure/Api/PublicDataApi/interface";
import axios from "axios";
import { Transform } from "../../../../utils/transform";

interface Props {
    usecase: PublicDataApi;
}
const FinanceContainer = (props: Props) => {


    const [isSearching, SetSearching] = useState<boolean>(false)
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
    const [ruc, setRuc] = useState<string>("")
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    const [data, setData] = useState<ResponsePresupuestos[]>([])
    const [alert, setAlert] = useState<{
        type: 'info' | 'success' | 'warning' | 'error',
        message: string
    }>({
        type: 'info',
        message: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])

    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }


        if (isSearching) {
            return;
        }

        SetSearching(true)
        const filter = listEnt.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        }).slice(0, 3)
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

    const handleSearch = () => {
        setAlert({
            type: 'info',
            message: ''
        })
        if (ruc == "") {
            setAlert({
                type: 'error',
                message: 'Selecciona un establecimiento'
            })
            return
        }
        if (month == 0) {
            setAlert({
                type: 'error',
                message: 'Selecciona un mes'
            })
            return
        }

        if (year == 0) {
            setAlert({
                type: 'error',
                message: 'Selecciona un año'
            })
            return
        }
        setLoading(true)
        props.usecase.getPresupuestoData({
            month: month,
            ruc: ruc,
            year: year
        }).then((data) => {
            setData(data)
            if (data.length == 0) {
                setAlert({
                    type: 'warning',
                    message: 'No hay datos para mostrar'
                })
            }
            setLoading(false)
        }).catch(() => {
            setAlert({
                type: 'error',
                message: 'Error al obtener los datos'
            })
            setLoading(false)
        })

    }


    const onDownloadPDF = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            });

            // Crear un Blob a partir de la respuesta del archivo CSV
            const blob = new Blob([res.data], { type: 'application/csv' });

            // Crear un FileReader para leer el contenido del blob
            const reader = new FileReader();
            reader.onload = function (event) {
                const text = event.target?.result as string;

                // Aquí puedes procesar el texto del CSV

                Transform.fromCsvToPdf(text, name, 'Presupuesto');
            };

            reader.readAsText(blob);

        } catch (error) {
            console.error('Error al descargar el CSV:', error);
        }
    };


    const onDownloadExcel = async (url: string, name: string) => {
        try {
            const res = await axios.get(url, {
                responseType: 'blob'
            });

            // Crear un Blob a partir de la respuesta del archivo CSV
            const blob = new Blob([res.data], { type: 'application/csv' });

            // Crear un FileReader para leer el contenido del blob
            const reader = new FileReader();
            reader.onload = function (event) {
                const text = event.target?.result as string;

                // Aquí puedes procesar el texto del CSV

                Transform.fromCsvToXlxs(text, name);
            };

            reader.readAsText(blob);

        } catch (error) {
            console.error('Error al descargar el CSV:', error);
        }
    }

    return (

        <FinancePresenter
            page={0}
            from={0}
            to={0}
            total={10}
            totalPage={10}
            setPage={() => { }}
            length={0}
            loadOptions={loadOptions}
            month={month}
            onChangeEstablishment={(e) => setRuc(e)}
            onSearch={handleSearch}
            onSelectMonth={(e) => setMonth(e)}
            onSelectYear={(e) => setYear(e)}
            selectedYear={year}
            data={data}
            loading={loading}
            alert={alert}
            setAlert={(alert) => setAlert(alert)}
            onDownloadExcel={(url, name) => onDownloadExcel(url, name)}
            onDownloadPDF={(url, name) => onDownloadPDF(url, name)}

        />

    )

}

export default FinanceContainer