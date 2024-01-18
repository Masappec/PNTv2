import Title from "../../Common/Title"
import img from '../../../assets/reset_password.svg'
import { FormEvent } from "react";
import Input from "../../Common/Input";
import Alert from "../../Common/Alert";
import Spinner from "../../Common/Spinner";
import Button from "../../Common/Button";
import { Link } from "react-router-dom";
import PasswordMeter from "../../Common/PasswordMeter";


interface ConfirmPasswordPresenterProps {
    error: string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setError: (e: string) => void;
    isloading?: boolean;
    password: string;
    setPassword: (e: string) => void;
    confirmPassword: string;
    setConfirmPassword: (e: string) => void;
    success: string | null;
    setSuccess: (e: string) => void;

}
const ConfirmPasswordPresenter = (props:ConfirmPasswordPresenterProps) => {
    
    if (props.success) {
        return (
            <div className='bg-sky-700 h-screen flex'>
                <div className='items-center lg:flex xl:flex 2xl:flex justify-center h-auto flex-col flex-auto justify-items-start hidden' >
                    <Title title="Recupera tu cuenta" text="Para ingresar tus solicitudes necesitas acceder a tu cuenta" color='white' />
                    <img src={img} alt='imagen' className='w-1/2 h-1/2' />
                </div>

                <div className="bg-white flex xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-full  text-center  items-center justify-center">

                    <div className="mb-20 mt-15 column justify-center items-center">
                        <div className="bg-white p-6 rounded-lg  max-w-md">
                            <p className="text-base text-gray-50 bg-green-500 p-3 rounded-lg text-center font-bold">
                                {props.success}
                            </p>
                        </div>
                        <Link to='/ingreso' className="text-lg text-slate-50 bg-primary-400 hover:bg-cyan-300 p-3 rounded-lg text-center">
                            Inicia sesión
                        </Link>

                    </div>

                </div>
            </div>
        )
    }
    return (
        <>
        <div className='bg-sky-700 h-screen flex'>
                <div className='items-center lg:flex xl:flex 2xl:flex justify-center h-auto flex-col flex-auto justify-items-start hidden' >
                    <Title title="Ultimo paso para recuperar tu cuenta" text="Crea una contraseña y accede a tus solicitudes" color='white' />
                    <img src={img} alt='imagen' className='w-1/2 h-1/2' />
                </div>

                <div className="bg-white flex xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-full  text-center  items-center ">
                    <form className="mb-20 mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="Crea una nueva contraseña" text="A continuación ingresa tu nueva contraseña" color='black' />
                        {
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        <div className="flex-row justify-center items-center">

                            <div className="flex flex-col m-2 items-center">
                                <Input type="password" placeholder="Nueva Contraseña" width="w-72"
                                    value={props.password}
                                    onChange={(e) => props.setPassword(e.target.value)}
                                />
                                <PasswordMeter  password={props.password} />

                            </div>
                            <div className="flex flex-col m-2 items-center">
                                <Input type="password" placeholder="Repita la Contraseña" width="w-72"
                                    value={props.confirmPassword}
                                    onChange={(e) => props.setConfirmPassword(e.target.value)}
                                />
                                <PasswordMeter password={props.confirmPassword} />

                            </div>

                            {
                                props.isloading ? <Spinner /> : <Button title="Confirmar" width="w-72" />
                            }
                            

                        </div>


                    </form>
                </div>

            </div>

        </>
    )

}

export default ConfirmPasswordPresenter