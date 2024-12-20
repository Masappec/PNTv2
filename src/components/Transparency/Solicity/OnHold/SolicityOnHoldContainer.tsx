import {   useState } from "react"
import SolicityOnHoldPresenter from "./SolicityOnHoldPresenter"
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase"

interface Props{
    usecase:SolicityUseCase;
    solicity_id:number;
    onSuccessComment:()=>void;
}
const SolicityOnHoldContainer = (props: Props) => {

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    

    const handleSubmit = () => {
        const files: number[] = [];

        setLoading(true)
        props.usecase.commentSolicity(comment, props.solicity_id, files).then(() => {
            setLoading(false)
            setSuccess("Comentario agregado con éxito")
            setComment('')
            props.onSuccessComment()
        }).catch(() => {
            setLoading(false)
            setError("Error al agregar comentario")
        })
        
    }

   



    return (
        <>
        <SolicityOnHoldPresenter
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
            success={success}
            setError={setError}
            setComment={setComment}
            setSuccess={setSuccess}
            comment={comment}
        />
        </>
    )
    
}



export default SolicityOnHoldContainer