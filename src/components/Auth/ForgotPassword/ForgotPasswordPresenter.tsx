import { FormEvent } from "react";
import Alert from "../../Common/Alert";
import Input from "../../Common/Input";
import Title from "../../Common/Title";
import img from '../../../assets/forgot_password.svg'
import Spinner from "../../Common/Spinner";
import Button from "../../Common/Button";
import Contrasenia from "../../Common/Contrasenia";
import { Link } from "react-router-dom";

interface ForgotPasswordPresenterProps {
    email: string;
    error: string | null;
    success: string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setEmail: (e: string) => void;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
    isloading?: boolean;
}
const ForgotPasswordPresenter = (props: ForgotPasswordPresenterProps) => {

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
                        <Link to='/auth/login' className="text-lg text-slate-50 bg-primary-400 hover:bg-cyan-300 p-3 rounded-lg text-center">
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
                    <Title title="Recupera tu cuenta" text="Para ingresar tus solicitudes necesitas acceder a tu cuenta" color='white' />
                    <img src={img} alt='imagen' className='w-1/2 h-1/2' />
                </div>

                <div className="bg-white flex xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-full  text-center  items-center ">
                    <form className="mb-20 mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="¿Olvidaste tu contraseña?" text="A continuación ingresa tu correo" color='black' />
                        {
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        {
                            props.success && <Alert message={props.success} type="success" onClose={() => props.setSuccess('')} />
                        }
                        <div className="flex-row justify-center items-center">

                            <div className="flex flex-col m-2 items-center">
                                <Input type="text" placeholder="Correo" width="w-72"
                                    value={props.email}
                                    onChange={(e) => props.setEmail(e.target.value)}
                                />

                            </div>

                            {
                                props.isloading ? <Spinner /> : <Button title="Enviar Enlace" width="w-72" />
                            }


                        </div>
                        <Contrasenia text='Inicia sesión' path='/auth/login' />


                    </form>
                </div>

            </div>

        </>
    )
}

export default ForgotPasswordPresenter;