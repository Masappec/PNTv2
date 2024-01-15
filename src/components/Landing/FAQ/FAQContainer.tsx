import { useEffect, useState } from "react";
import PedagogyAreaUseCase from "../../../domain/useCases/PedagogyArea/PedagogyAreaUseCase";
import FAQPresenter from "./FAQPresenter"
import { FrequencyAsked, Tutorial } from "../../../domain/entities/PedagodyAreaEntity";

interface Props {
    usecase: PedagogyAreaUseCase;
}

const FAQContainer = (props:Props) => {

    const [tutorial, setTutorial] = useState<Tutorial[]>([])
    const [faq, setFaq] = useState<FrequencyAsked[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        props.usecase.getPedagogyArea().then((res)=>{
            setTutorial(res.tutorials)
            setFaq(res.faq)
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
            setError(err)

        })
    }, [])

    return (
        <FAQPresenter
        error={error}
        faq={faq}
        loading={loading}
        tutorial={tutorial}
        key={Math.random()}
        />
    )
}

export default FAQContainer;