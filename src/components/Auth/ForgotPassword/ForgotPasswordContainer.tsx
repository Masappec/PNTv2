import { FormEvent, useState } from "react";
import PasswordResetUseCase from "../../../domain/useCases/Authentication/PasswordResetUseCase";
import ForgotPasswordPresenter from "./ForgotPasswordPresenter"

interface IProps {
    usecase: PasswordResetUseCase;
}


const ForgotPasswordContainer = (
    { usecase }: IProps
) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isloading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        usecase.execute(email).then(() => {
            setIsLoading(false)
            setSuccess("Revisa tu correo electrónico para ver si hay un enlace para restablecer tu contraseña. Si no aparece en unos minutos, revisa tu carpeta de correo no deseado.")
        }).catch((error) => {
            setIsLoading(false)
            setError(error.message)

        })

    }
    return (
        <ForgotPasswordPresenter
            email={email}
            error={error}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            setError={setError}
            isloading={isloading}
            key={""}
            setSuccess={setSuccess}
            success={success}

        />
    )
}

export default ForgotPasswordContainer;