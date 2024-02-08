import { useEffect, useState } from "react";
import LandingPresenter from "./LandingPresenter"
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import { FrequencyAsked } from "../../../domain/entities/PedagodyAreaEntity";

interface Props {
    usecase: PublicUseCase;
}

const LandingContainer = (props: Props) => {
    const [faq, setFaq] = useState<FrequencyAsked[]>([])

    useEffect(() => {
        props.usecase.getPedagogyArea().then((res)=>{
            setFaq(res.faq)
        }).catch((err)=>{
            console.log(err.message)
        })
    }, [])

    return (
        <LandingPresenter 
        faq={faq}
        />
    )

}

export default LandingContainer;