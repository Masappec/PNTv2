import { useNavigate, useParams } from "react-router-dom"
import ConfirmPasswordPresenter from "./ConfirmPasswordPresenter"
import PasswordResetUseCase from "../../../domain/useCases/Authentication/PasswordResetUseCase"
import { FormEvent, useEffect, useState } from "react"

interface IProps{
    usecase: PasswordResetUseCase
}

const ConfirmPasswordContainer = ({usecase}:IProps) => {

    const { token }= useParams<{token:string}>()
    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [isloading, setIsloading] = useState<boolean>(false)


    useEffect(()=>{
        usecase.validateToken(token||"").then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
            navigation("/aut/login")
        })
    },[token])
     
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsloading(true)
        usecase.confirm(token||"",password,confirmPassword).then(()=>{
            setIsloading(false)
            setSuccess("Se ha cambiado tu contraseña, ahora puedes iniciar sesión")
        }).catch((err)=>{
            setIsloading(false)
            setError(err.message)
        })

    }

    return (
        <ConfirmPasswordPresenter
            confirmPassword={confirmPassword}
            error={error}
            handleSubmit={handleSubmit}
            password={password}
            setConfirmPassword={setConfirmPassword}
            setError={setError}
            setPassword={setPassword}
            isloading={isloading}
            key={"reset-password"}
            setSuccess={setSuccess}
            success={success}
        />
    )
}

export default ConfirmPasswordContainer