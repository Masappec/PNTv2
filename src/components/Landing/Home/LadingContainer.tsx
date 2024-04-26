import { useEffect, useState } from "react";
import LandingPresenter from "./LandingPresenter"
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { ColourOption } from "../../../utils/interface";
import { useNavigate } from "react-router-dom";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/Store";

interface Props {
    usecase: PublicUseCase;
}

const LandingContainer = (props: Props) => {
    const [faq, setFaq] = useState<FrequencyAsked[]>([])
    const [isSearching, SetSearching] = useState<boolean>()
    const navigate = useNavigate()
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)

    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])

    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])


    useEffect(() => {
        props.usecase.getPedagogyArea().then((res) => {
            setFaq(res.faq)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])



    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }

        if (inputValue.length < 5) {
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

    const onSelect = (value: ColourOption) => {
        console.log("OBJETO SELECCIONADO", value)


        navigate(`/entidades/${value.value}`)
    }


    return (
        <LandingPresenter
            faq={faq}
            countEntities={listEnt.length}
            countFiles={0}
            loadOptions={loadOptions}
            onSelect={onSelect}
        />
    )

}

export default LandingContainer;