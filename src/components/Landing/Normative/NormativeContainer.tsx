import { useEffect, useState } from "react";
import PedagogyAreaUseCase from "../../../domain/useCases/PedagogyArea/PedagogyAreaUseCase";
import NormativePresenter from "./NormativePresenter"
import { Normative } from "../../../domain/entities/PedagodyAreaEntity";

interface Props {
    usecase: PedagogyAreaUseCase
}


const NormativeContainer = (props:Props) => {

    const [Normative, setNormative] = useState<Normative[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        props.usecase.getPedagogyArea().then((res)=>{
            setNormative(res.normatives)
            setLoading(false)
        }).catch((err)=>{
            setError(err.message)
            setLoading(false)
        })
    }, [])

    return (
        <NormativePresenter 
        normatives={Normative}
        error={error}
        loading={loading}
        setError={setError}
        key={Math.random()}
        />
    )
}
export default NormativeContainer;