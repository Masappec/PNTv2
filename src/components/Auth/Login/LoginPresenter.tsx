import  { FormEvent } from 'react'
import Title from '../../Common/Title/index'
import Input from '../../Common/Input';
import Contrasenia from '../../Common/Contrasenia/index';
import Alert from '../../Common/Alert';
import img from '@assets/imagen.svg'
import Spinner from '../../Common/Spinner';
import { Button } from 'flowbite-react';

interface LoginPresenterProps {
    email: string;
    password: string;
    error: string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setEmail: (e: string) => void;
    setPassword: (e: string) => void;
    setError: (e: string) => void;
    isloading?: boolean;
}


const LoginPresenter = ({ ...props }: LoginPresenterProps) => {
    return (
        <>
            <div className='bg-primary-600 h-screen flex'>
                <div className='items-center lg:flex xl:flex 2xl:flex justify-center h-auto flex-col flex-auto justify-items-start hidden' >
                    <Title title="Crea tu solicitud" text="Solicita información a las entidades públicas." color='white' />
                    <img src={img} alt='imagen' className='w-1/2 h-1/2' />
                </div>

                <div className="bg-white flex xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-full  text-center  items-center ">
                    <form className="mb-20 mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="Bienvenido de nuevo!" text="" color='black' />
                        {
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        <div className="flex-row justify-center items-center">

                            <div className="flex flex-col m-2 items-center">
                                <Input type="text" placeholder="Usuario" className="w-72"
                                    value={props.email}
                                    onChange={(e) => props.setEmail(e.target.value)}
                                />

                            </div>
                            <div className="flex flex-col m-2 items-center">
                                <Input type="password" placeholder="Contraseña" className="w-72"
                                    value={props.password}
                                    onChange={(e) => props.setPassword(e.target.value)}
                                />
                            </div>

                            {
                                props.isloading ? <Spinner /> : 
                                <div className="flex flex-col m-2 items-center">
                                    <Button className="w-72 justify-center flex bg-primary-600" type="submit" >
                                        Ingresar
                                    </Button>
                                </div>
                            }
                            

                        </div>
                        <Contrasenia text='Olvidaste tu contraseña?' path='/auth/forgot-password' />
                        <Contrasenia text='Registrate' path='/registro' />

                    </form>
                </div>

            </div>

        </>
    )
}

export default LoginPresenter