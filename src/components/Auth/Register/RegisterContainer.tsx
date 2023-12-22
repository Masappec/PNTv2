
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import { redirect } from "react-router-dom"

const RegisterContainer= ({usecase}:{
  usecase: RegisterUseCase
}) => {

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error,setError] =useState<string>('')

  useEffect(() => {
    setError('')
  }, [])

   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usecase.authService.register({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      username: email
    }).then(() => {
      return redirect('/')
    }
    ).catch((e) => {
      setError(e.message)
    })
    
   }
    return (
      <RegisterPresenter

      error={error}
      setError={setError}
      firstName= {firstName}
      lastName= {lastName}
      email= {email}
      password= {password}
      confirmPassword= {confirmPassword}
      handleSubmit={handleSubmit}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword} 
      />
    )
}
export default RegisterContainer