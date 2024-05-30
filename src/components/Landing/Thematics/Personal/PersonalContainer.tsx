import { useSelector } from "react-redux";
import PersonalPresenter from "./PersonalPresenter";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useEffect, useState } from "react";
import { ColourOption } from "../../../../utils/interface";
import PublicDataApi from "../../../../infrastructure/Api/PublicDataApi";


interface Props{
    usecase:PublicDataApi;
}
const PersonalContainer = (props:Props) => {


    const [isSearching, SetSearching] = useState<boolean>()
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)

    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    const [year, setYear] = useState<number>(new Date().getFullYear())
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
                value: item.slug || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))
    }

    const handleSearch = ()=>{
        props.usecase.getPublicData({
            article:"19",
            establishment:"",
            fields:[],
            month:"5",
            numerals:[
                "Numeral 1.1",
                "Numeral 1.2",
                "Numeral 1.3"
            ],
            search:"",
            year:"2024"
        }).then((res)=>{
            console.log("respuesta",res)
        })
    }
    return (

        <PersonalPresenter
            loadOptions={loadOptions}
            onSelect={() => { }}
            onSelectYear={(year) => {
                setYear(year)
            }}
            selectedYear={year}
            onSearch={handleSearch}
        />

    )

}

export default PersonalContainer