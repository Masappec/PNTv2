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

  const history = useNavigate()

  useEffect(() => {
    setError(null)

  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useCase.authService.authenticate(email, password)
    .then(() => {
      return history('/admin')
    })
    .catch((e) => {
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

    />
  )
}
export default LoginContainer