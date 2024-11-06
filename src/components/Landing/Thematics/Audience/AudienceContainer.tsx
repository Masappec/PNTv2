import { useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";
import AudiencePresenter from "./AudiencePresenter"
import { AudienceRequest, AudienceResponse } from "../../../../infrastructure/Api/PublicDataApi/interface";
import { DatePnt } from "../../../../utils/date";


interface Props {
    usecase: PublicDataApi;
}
const AudienceContainer = (props: Props) => {
    console.log(props)

    const [alert, setAlert] = useState<{
        type: 'info' | 'success' | 'warning' | 'error',
        message: string
    }>({
        type: 'info',
        message: ''
    })
    const [isSearching, SetSearching] = useState<boolean>(false)

    const [data, setData] = useState<AudienceRequest>({
        month: new DatePnt().getMonthOneBased(),
        names: "",
        year:new Date().getFullYear()
    })
    const [month, setMonth] = useState<number>(new DatePnt().getMonthOneBased());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [res, setRes] = useState<AudienceResponse[]>([])



    const handleSearch = async () => {
        try {
            SetSearching(true)
            data.month = month
            data.year = year
            setAlert({
                type: 'info',
                message: ''
            })
            const res = await props.usecase.getAudienciasData(data)
            setRes(res)
            if (res.length === 0) {
                setAlert({
                    type: 'warning',
                    message: 'No se encontraron resultados'
                })
            }
            SetSearching(false)
        } catch (error) {
            SetSearching(false)
            setAlert({
                type: 'error',
                message: 'Error al obtener los datos'
            })
        }
    }



    
    return (

        <AudiencePresenter
            alert={alert}
            data={res}
            loading={isSearching}
            onSearch={handleSearch}
            setAlert={setAlert}
            setName={(names) => {
                setData({ 
                    ...data,
                    names
                })
            }}
            onSelectMonth={(month) => {
                
                setMonth(month)
            }}
            onSelectYear={(year) => {
                setYear(year)
            }}

        />

    )

}

export default AudienceContainer