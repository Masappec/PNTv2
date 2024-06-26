
import { useEffect, useState } from "react";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";
import { PersonalRemunerations, RequestPersonalApi } from "../../../../infrastructure/Api/PublicDataApi/interface";
import PersonalPresenter from "./PersonalPresenter";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { ColourOption } from "../../../../utils/interface";

interface Props {
    usecase: PublicDataApi;
}
const PersonalContainer = (props: Props) => {



    const [alert, setAlert] = useState<{
        type: 'info' | 'success' | 'warning' | 'error',
        message: string
    }>({
        type: 'info',
        message: ''
    })
    const [isSearching, SetSearching] = useState<boolean>()

    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [data, setData] = useState<RequestPersonalApi>({
        institution: "",
        names: "",
    })
    const [res, setRes] = useState<PersonalRemunerations[]>([])
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])



    const handleSearch = async () => {
        try {
           
            if (!data.names) {
                setAlert({
                    type: 'error',
                    message: 'Ingresa un nombre'
                })
                return
            }

            if (!data.institution) {
                setAlert({
                    type: 'error',
                    message: 'Selecciona una institución'
                })
                return
            }
            SetSearching(true)
            setAlert({
                type: 'info',
                message: ''
            })
            const res = await props.usecase.getPersonalData({
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

        <PersonalPresenter
            onInstitutionChange={(value) => setData({ ...data, institution: value })}
            onSearch={handleSearch}
            loadOptions={loadOptions}
            onNameChange={(value) => setData({ ...data, names: value })}
            data={res}
            alert={alert}
            setAlert={setAlert}
            
        />

    )

}

export default PersonalContainer