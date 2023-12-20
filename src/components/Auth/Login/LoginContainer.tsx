import LoginPresenter from "./LoginPresenter"
import { FormEvent, useEffect, useState } from "react"

const LoginContainer= () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setError('')
    
  }, [])

   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   }
    return (
      <LoginPresenter

      email={email}
      password={password}
      error={error}
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      
      />
    )
}
export default LoginContainer