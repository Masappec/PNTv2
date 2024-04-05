import { useEffect, useState } from "react";
import LandingPresenter from "./LandingPresenter"
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";
import { ColourOption } from "../../../utils/interface";
import { useNavigate } from "react-router-dom";
import EstablishmentEntity from "../../../domain/entities/Establishment";
import { setEstablishments } from "../../../infrastructure/Slice/EstablishmentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/Store";

interface Props {
    usecase: PublicUseCase;
}

const LandingContainer = (props: Props) => {
    const [faq, setFaq] = useState<FrequencyAsked[]>([])
    const [isSearching, SetSearching] = useState<boolean>()
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const dispatch = useDispatch()
    const navigate = useNavigate()




    useEffect(() => {
        props.usecase.getPedagogyArea().then((res) => {
            setFaq(res.faq)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect(() => {
        props.usecase.getEstablishments().then(res => {
            const result = res.results.map((item) => item.data)
            const final: EstablishmentEntity[] = []
            result.map((item) => {
                item.map((_item) => {
                    final.push(_item)
                })
            })
            dispatch(setEstablishments(final))

        }).catch(() => {
            console.log("Error")
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
        const filter = _establishments.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
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
            countEntities={0}
            countFiles={0}
            loadOptions={loadOptions}
            onSelect={onSelect}
        />
    )

}

export default LandingContainer;