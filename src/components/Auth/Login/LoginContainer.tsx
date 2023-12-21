import { redirect } from "react-router-dom"
import LoginUseCase from "../../../domain/useCases/Authentication/LoginUseCase"
import LoginPresenter from "./LoginPresenter"
import { FormEvent, useEffect, useState } from "react"

const LoginContainer = ({ useCase }: {
  useCase: LoginUseCase

}) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)

  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useCase.authService.authenticate(email, password)
    .then(() => {
      return redirect('/admin')
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