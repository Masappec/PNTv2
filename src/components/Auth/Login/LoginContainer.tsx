import LoginUseCase from "../../../domain/useCases/Authentication/LoginUseCase"
import LoginPresenter from "./LoginPresenter"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const LoginContainer = ({ useCase }: {
  useCase: LoginUseCase

}) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isloading, setIsLoading] = useState<boolean>(false)

  const history = useNavigate()

  useEffect(() => {
    setError(null)

  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    useCase.authService.authenticate(email, password)
    .then(() => {
      setIsLoading(false)
      return history('/admin')
    })
    .catch((e) => {
      setIsLoading(false)
      setError(e.message)
    })


  }
  return (
    <LoginPresenter

      email={email}
      password={password}
      error={error}
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      setError={setError}
      isloading={isloading}

    />
  )
}
export default LoginContainer