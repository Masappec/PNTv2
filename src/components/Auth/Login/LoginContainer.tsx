import LoginUseCase from "../../../domain/useCases/Authentication/LoginUseCase"
import SessionService from "../../../infrastructure/Services/SessionService"
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
        const userSession = SessionService.getUserData()
        const exist = user &&
         user.user_permissions?.map((item) => item.codename).includes('view_solicity') 
         console.log(user)
        if (exist) {
          if (!userSession.is_superuser){
            history('/admin/solicity')

          }else{
            history('/admin')

          }
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