
import { FormEvent, useEffect, useState } from "react"
import RegisterPresenter from "./RegisterPresenter"
import RegisterUseCase from "../../../domain/useCases/Authentication/RegisterUseCase"
import ConfigurationUseCase from "../../../domain/useCases/Configuration/ConfigurationUseCase"
import FormFieldsEntity from "../../../domain/entities/FormFieldsEntity"
import { ROLE_CIUDADANO } from "../../../utils/constans"
import { RegisterDto } from "../../../infrastructure/Api/Auth/interface"
import ScreenMessage from "../../Common/ScreenMessage/ScreenMessage"
import { useNavigate } from "react-router-dom"
import { IOncalculate } from "../../Common/PasswordMeter"

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
  const [isEnable, setIsEnable] = useState(false)

  useEffect(() => {
    setError('')
    configUseCase.execute(ROLE_CIUDADANO, 'Usuario').then((res) => {
      setConfig(res)
    }).catch((e) => {
      setError(e.message)
    })
  }, [])




  const onChangePassword = (data: IOncalculate) => {

    if (data.percentage === 100) {
      setIsEnable(true)
    } else {
      setIsEnable(false)
    }
  };


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (data.disability === undefined) {
      data.disability = false
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
    if (!data.email.includes('@')) {
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
      isEnable={isEnable}
      onChangePassword={onChangePassword}

    /> : <ScreenMessage message="¡Tu cuenta ha sido creada!" type="
Para poderla utilizar, solo revisa los mensajes recibidos en tu correo electrónico (el que escribiste en el formulario de registro) para encontrar un mensaje de este portal. Dentro de este mensaje encontrarás un enlace que debes presionar para activar tu cuenta. Una vez que lo hayas realizado, podrás ingresar con tu usuario y clave al Portal de Transparencia.

Si no encuentras el correo enviado, favor revisa en tu carpeta de mensajes no deseados o spam. =)
" >

      <div className="flex flex-row items-center justify-center  gap-16 mt-8 w-full">


        <button
          onClick={() => {
            history('/ingreso')

          }}
          className=" text-xl text-white font-medium hover:bg-primary-200 bg-primary-500 w-[300px]  py-2 rounded-lg shadow-xl">
          Ir a la página de ingreso a tu cuenta
        </button>

      </div>
    </ScreenMessage>

}
export default RegisterContainer