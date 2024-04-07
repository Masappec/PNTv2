
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import { useNavigate } from "react-router-dom"
import ConfigurationUseCase from "../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../domain/entities/FormFieldsEntity"
import { ROLE_CIUDADANO } from "../../../utils/constans"
import { RegisterDto } from "../../../infrastructure/Api/Auth/interface"

const RegisterContainer = ({ usecase, configUseCase }: {
  usecase: RegisterUseCase,
  configUseCase: ConfigurationUseCase
}) => {




  const [data, setData] = useState({
    accept_terms: false,
    age_range: '',
    city: '',
    confirm_password: '',
    first_name: '',
    gender: '',
    identification: '',
    last_name: '',
    password: '',
    phone: '',
    province: '',
    race: '',
    username: '',
    disability: false
  } as RegisterDto)
  const [error, setError] = useState<string>('')
  const history = useNavigate()
  const [loading, setLoading] = useState(false)

  const [config, setConfig] = useState<FormFieldsEntity[]>([])

  useEffect(() => {
    setError('')
    configUseCase.execute(ROLE_CIUDADANO, 'Usuario').then((res) => {
      setConfig(res)
    }).catch((e) => {
      setError(e.message)
    })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (data.disability === undefined) {
      data.disability = false
    }
    if (data.confirm_password !== data.password) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }
    usecase.authService.register(data as RegisterDto).then(() => {
      setLoading(false)
      return history("/ingreso")
    }
    ).catch((e) => {
      setError(e.message)
      setLoading(false)
    })

  }

  const handleData = (name: string, value: string | boolean) => {

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
      isLoading={loading}

    />
  )
}
export default RegisterContainer