
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import {  useNavigate } from "react-router-dom"
import ConfigurationUseCase from "../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../domain/entities/FormFieldsEntity"
import { ROLE_CIUDADANO } from "../../../utils/constans"
import { RegisterDto } from "../../../infrastructure/Api/Auth/AuthApi"

const RegisterContainer= ({usecase,configUseCase}:{
  usecase: RegisterUseCase,
  configUseCase: ConfigurationUseCase
}) => {

  


  const [data,setData] = useState({})
  const [error,setError] =useState<string>('')
  const history = useNavigate()

  const [config, setConfig] = useState<FormFieldsEntity[]>([])

  useEffect(() => {
    setError('')
    configUseCase.execute(ROLE_CIUDADANO,'Usuario').then((res) => {
      setConfig(res)
    }).catch((e) => {
      setError(e.message)
    })
  }, [])

   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    usecase.authService.register(data as RegisterDto).then(() => {
      return history("/login")
    }
    ).catch((e) => {
      setError(e.message)
    })
    
   }

   const handleData = ( name: string, value: string|boolean)=>{
    setData({ ...data, [name]: value });
  }
    return (
      <RegisterPresenter
      data={data as RegisterDto}
      fields={config}
      handleSubmit={handleSubmit}
      setData={handleData}
      error={error}
      setError={setError}
      
      />
    )
}
export default RegisterContainer