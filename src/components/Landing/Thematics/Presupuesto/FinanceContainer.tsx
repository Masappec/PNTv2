

/*import { useEffect, useState } from "react"
import { ColourOption, Row } from "../../../../utils/interface"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useSelector } from "react-redux"
import { RootState } from "../../../../infrastructure/Store"
import { RequestPublicApi, ResponsePublicApi } from "../../../../infrastructure/Api/PublicDataApi/interface"
import { sleep } from "../../../../utils/functions"*/
import { useEffect, useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi"
import FinancePresenter from "./FinancePresenter"
import { ColourOption } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { ResponsePresupuestos } from "../../../../infrastructure/Api/PublicDataApi/interface";

interface Props {
    usecase: PublicDataApi;
}
const FinanceContainer = (props: Props) => {


    const [isSearching, SetSearching] = useState<boolean>(false)
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [month, setMonth] = useState<number>(new Date().getMonth())
    const [ruc,setRuc] = useState<string>("")
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
 
    const handleSearch=()=>{
        if(ruc==""){
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
        }).then((data)=>{
            setData(data)
            if (data.length == 0) {
                setAlert({
                    type: 'warning',
                    message: 'No hay datos para mostrar'
                })
            }
            setLoading(false)
        }).catch(()=>{
            setAlert({
                type: 'error',
                message: 'Error al obtener los datos'
            })
            setLoading(false)
        })

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
            onChangeEstablishment={(e)=>setRuc(e)}
            onSearch={handleSearch}
            onSelectMonth={(e)=>setMonth(e)}
            onSelectYear={(e)=>setYear(e)}
            selectedYear={year}
            data={data}
            loading={loading}
            alert={alert}
            setAlert={(alert) => setAlert(alert)}

        />

    )

}

export default FinanceContainer