
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import {  useNavigate } from "react-router-dom"

const RegisterContainer= ({usecase}:{
  usecase: RegisterUseCase
}) => {

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [identification, setIdentification] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const [error,setError] =useState<string>('')
  const history = useNavigate()

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
      username: email,
      address: address,
      city: city,
      country: country,
      identification: identification,
      phone: phone,
      province: province,
    }).then(() => {
      return history("/")
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
      identification={identification}
      phone={phone}
      address={address}
      country={country}
      city={city}
      province={province}
      setIdentification={setIdentification}
      setPhone={setPhone}
      setAddress={setAddress}
      setCountry={setCountry}
      setCity={setCity}
      setProvince={setProvince}
      
      />
    )
}
export default RegisterContainer