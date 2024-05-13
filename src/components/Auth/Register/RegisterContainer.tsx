
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import ConfigurationUseCase from "../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../domain/entities/FormFieldsEntity"
import { ROLE_CIUDADANO } from "../../../utils/constans"
import { RegisterDto } from "../../../infrastructure/Api/Auth/interface"
import ScreenMessage from "../../Common/ScreenMessage/ScreenMessage"
import { useNavigate } from "react-router-dom"

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
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  const [config, setConfig] = useState<FormFieldsEntity[]>([])
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  useEffect(() => {
    setError('')
    configUseCase.execute(ROLE_CIUDADANO, 'Usuario').then((res) => {
      setConfig(res)
    }).catch((e) => {
      setError(e.message)
    })
  }, [])






  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (data.disability === undefined) {
      data.disability = false
    }

    if (data.phone === '') {
      setError('Debe ingresar un número de teléfono')
      setLoading(false)
      return
    }

    //validar que phone solo sea numeros
    if (isNaN(Number(data.phone))) {
      setError('Número de teléfono inválido')
      setLoading(false)
      return
    }
    if (data.first_name === '') {
      setError('Debe ingresar un nombre')
      setLoading(false)
      return
    }

    if (data.last_name === '') {
      setError('Debe ingresar un apellido')
      setLoading(false)
      return
    }


    if (data.gender === '') {
      setError('Debe seleccionar un género')
      setLoading(false)
      return
    }

    if (data.race === '') {
      setError('Debe seleccionar una identidad cultural')
      setLoading(false)
      return
    }

    if (data.username === '*') {
      setError('Debe ingresar un correo electrónico')
      setLoading(false)
      return
    }

    //valid email
    if (!data.username.includes('@')) {
      setError('Correo electrónico inválido')
      setLoading(false)
      return
    }

    if (data.password === '') {
      setError('Debe ingresar una contraseña')
      setLoading(false)
    }


    if (data.confirm_password === '') {
      setError('Debe confirmar la contraseña')
      setLoading(false)
      return
    }




    if (data.confirm_password !== data.password) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (data.accept_terms === false) {
      setError('Debe aceptar los términos y condiciones')
      setLoading(false)
      return
    }


    usecase.authService.register(data as RegisterDto).then(() => {
      setLoading(false)
      setSuccess(true)
    }
    ).catch((e) => {
      setError(e.message)
      setLoading(false)
    })

  }

  const handleData = (name: string, value: string | boolean) => {
    console.log(name, value)
    setData({ ...data, [name]: value });
  }
  return !success ?
    <RegisterPresenter
      data={data as RegisterDto}
      fields={config}
      handleSubmit={handleSubmit}
      handleShowPassword={handleShowPassword}
      setData={handleData}
      error={error}
      setError={setError}
      isLoading={loading}
      showPassword={showPassword}



    /> : <ScreenMessage message="Registro Existoso" type="Revisa tu correo para activar tu cuenta" >
      <button onClick={() => {
        history('/ingreso')

      }}
        className="bg-primary-400 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
        Volver
      </button>
    </ScreenMessage>

}
export default RegisterContainer