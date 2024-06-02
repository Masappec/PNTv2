import { useEffect, useState } from "react";
import IndicatorsAdminPresenter from "./IndicatorsAdminPresenter";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { RootState } from "../../../infrastructure/Store";
import { useSelector } from "react-redux";
import { ColourOption } from "../../../utils/interface";
import PublicDataApi from "../../../infrastructure/Api/PublicDataApi";
import { PublicDataApiResponse } from "../../../infrastructure/Api/PublicDataApi/interface";

interface Props{
    usecase:PublicDataApi;
}
const IndicatorsAdminContainer = (props:Props) => {
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)

    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    const [year, setYear] = useState<string>("")
    const [isSearching, SetSearching] = useState<boolean>()
    const [selectedEst, setSelectedEstablishment] = useState<string>("")
    const [data, setData] = useState<PublicDataApiResponse>({
        not_responsed: [],
        responsed: [],
        total: 0,
        total_not_responsed: 0,
        total_responsed: 0,
        users: {
            active: 0,
            inactive: 0
        }
    })
    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])

    useEffect(() => {
        props.usecase.getPublicDataCount().then((response) => {
            setData(response)
        }).catch((error) => {
            console.error(error)
        })
    }, [ ])

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
        const final = []
        final.push({
            value: "",
            label: "Todos",
            color: "#00B8D9",
        })

        final.push(...filter.map((item) => {
            const data: ColourOption = {
                value: item.id+"" || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))
        SetSearching(false)
        callback(final)
    }


    const handleEstablishment = (value: string) => {
        setSelectedEstablishment(value)
        props.usecase.getPublicDataCount(value != "" ? parseInt(value) : null, year != "" ? parseInt(year):null).then((response) => {
            setData(response)
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleChangeYear = (value: string) => {
        setYear(value)
        props.usecase.getPublicDataCount(selectedEst != "" ? parseInt(selectedEst) : null, value != "" ? parseInt(value) : null).then((response) => {
            setData(response)
        }).catch((error) => {
            console.error(error)
        })
    }
    return (


        <IndicatorsAdminPresenter

            loadOptions={loadOptions}
            onChangeEstablishment={handleEstablishment}
            onChangeYear={handleChangeYear}
            data={data}
        />

    )
}

export default IndicatorsAdminContainer;