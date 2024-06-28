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
  const [remenber, setRemenber] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const history = useNavigate()

  useEffect(() => {
    setError(null)

  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    useCase.execute(email, password)
      .then((user) => {
        setIsLoading(false)
        if (user === null) {
          history('/admin')
          return
        }
        const exist = user && user.user_permissions?.map((item) => item.codename).includes('view_solicity') && !user.is_superuser
        if (exist) {
          history('/admin/solicity')
        } else {
          history('/admin')
        }
      })
      .catch((e) => {
        setIsLoading(false)
        setError(e.message)
      })


  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
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
      remenber={remenber}
      setRemenber={setRemenber}
      handleShowPassword={handleShowPassword}
      showPassword={showPassword}

    />
  )
}
export default LoginContainer