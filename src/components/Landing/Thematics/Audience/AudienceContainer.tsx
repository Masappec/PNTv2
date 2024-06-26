import { useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";
import AudiencePresenter from "./AudiencePresenter"
import { AudienceRequest, AudienceResponse } from "../../../../infrastructure/Api/PublicDataApi/interface";


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
        month:0,
        names: "",
        year:0
    })
    const [res, setRes] = useState<AudienceResponse[]>([])



    const handleSearch = async () => {
        try {
            SetSearching(true)
            console.log(data)
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
            onSelectDate={(year, month) => setData({ ...data, year, month })}
            setAlert={setAlert}
            setName={(names) => setData({ ...data, names })}

        />

    )

}

export default AudienceContainer