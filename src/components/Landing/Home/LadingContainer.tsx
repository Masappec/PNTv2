import { useEffect, useState } from "react";
import LandingPresenter from "./LandingPresenter"
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { ColourOption } from "../../../utils/interface";
import { useNavigate } from "react-router-dom";
import { Options } from "react-select";

interface Props {
    usecase: PublicUseCase;
}

const LandingContainer = (props: Props) => {
    const [faq, setFaq] = useState<FrequencyAsked[]>([])
    const [isSearching, SetSearching] = useState<boolean>()

    const navigate = useNavigate()




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

        props.usecase.getEstablishments(inputValue).then(res => {
            const result = res.results.map((item) => item.data)
            const final: ColourOption[] = []
            result.map((item) => {
                item.map((_item) => {
                    final.push({
                        value: _item.slug || "",
                        label: _item.name,
                        color: "#00B8D9"
                    })
                })
            })
            SetSearching(false)
            callback(final)
        }).catch(() => {
            callback([])
        })
    }

    const onSelect = (value: Options<ColourOption>) => {
        console.log("OBJETO SELECCIONADO", value)
        if (value.length === 0) {
            return;
        }

        navigate(`/entidades/${value[0].value}`)
    }


    return (
        <LandingPresenter
            faq={faq}
            countEntities={0}
            countFiles={0}
            loadOptions={loadOptions}
            onSelect={onSelect}
        />
    )

}

export default LandingContainer;