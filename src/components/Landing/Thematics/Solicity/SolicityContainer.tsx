
import { useEffect, useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi"
import SolicityPresenter from "./SolicityPresenter"
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import { FormulariosRequest, FormulariosResponse } from "../../../../infrastructure/Api/PublicDataApi/interface";
import { ColourOption } from "../../../../utils/interface";

interface Props {
    usecase: PublicDataApi;
}
const SolicityContainer = (props: Props) => {
    const [alert, setAlert] = useState<{
        type: 'info' | 'success' | 'warning' | 'error',
        message: string
    }>({
        type: 'info',
        message: ''
    })
    const [isSearching, SetSearching] = useState<boolean>(false)

    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [data, setData] = useState<FormulariosRequest>({
        ruc: "",
    })
    const [res, setRes] = useState<FormulariosResponse[]>([])
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])



    const handleSearch = async () => {
        try {
            if (data.ruc=="") {
                setAlert({
                    type: 'error',
                    message: 'Ingresa una institución'
                })
                return
            }
            SetSearching(true)

            const res = await props.usecase.getSolicitudesData({
                ...data

            })
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
    return (

        <SolicityPresenter

            alert={alert}
            data={res}
            loadOptions={loadOptions}
            onInstitutionChange={(value) => setData({ ...data, ruc: value })}
            onSearch={handleSearch}
            setAlert={setAlert}
            loading={isSearching}


        />

    )

}

export default SolicityContainer