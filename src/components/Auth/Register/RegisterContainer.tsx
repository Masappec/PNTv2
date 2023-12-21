
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"

const RegisterContainer= () => {

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  useEffect(() => {
    
  }, [])

   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   }
    return (
      <RegisterPresenter

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