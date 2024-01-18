import { useEffect, useState } from "react";
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import ActivateAccountPresenter from "./ActivateAccountPresenter"
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
    usecase : RegisterUseCase;        
}


const ActivateAccountContainer = (props: IProps) => {

    const {uid, token} = useParams<{uid: string, token: string}>()
    const navigation = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [description, setDescription] = useState("")
    const [buttonText, setButtonText] = useState("")
    

    useEffect(() => {
        
        
        props.usecase.activate(uid||"", token||"").then(() => {
            setLoading(false)
            setTitle("¡Tu cuenta ha sido activada!")
            setSubtitle("¡Ya puedes iniciar sesión con tu correo electrónico y contraseña!")
            setDescription("Si tienes alguna duda o problema, no dudes en contactarnos.")
            setButtonText("Iniciar sesión")


        }).catch((err) => {
            setLoading(false)
            setError(err.message)
            setTitle("¡Hubo un error!")
            setSubtitle("No se pudo activar tu cuenta")
            setDescription(err.message)
            setButtonText("Regresar al inicio")
        })
    }, [])
    


    const handleOnSubmit = () => {
        if (error) {
            navigation("/")
        } else {
            navigation("/ingreso")
        }
    }

    return (
        <ActivateAccountPresenter 
        buttonText={buttonText}
        description={description}
        error={error}
        onSubmit={handleOnSubmit}
        subtitle={subtitle}
        title={title}
        isLoading={loading}/>
    )

}

export default ActivateAccountContainer