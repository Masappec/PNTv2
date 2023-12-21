import React, { FormEvent } from 'react'
import Title from '../../Common/Title/index'
import Button from '../../Common/Button'
import Input from '../../Common/Input';
import Contrasenia from '../../Common/Contrasenia/index';
import Alert from '../../Common/Alert';

interface LoginPresenterProps {
    email: string;
    password: string;
    error: string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setEmail: (e: string) => void;
    setPassword: (e: string) => void;
    setError: (e: string) => void;
}


const LoginPresenter = ({ ...props }: LoginPresenterProps) => {
    return (
        <>
            <div className='bg-sky-700 min-h-screen flex'>
                <div className='items-center lg:flex xl:flex 2xl:flex justify-center h-auto flex-col flex-auto justify-items-start hidden' >
                    <Title title="Crea tu solicitud" text="Solicita información a las entidades públicas." color='white' />
                </div>

                <div className="bg-white flex xl:w-2/6 2xl:w-2/6 lg:w-2/6 w-full  text-center  items-center ">
                    <form className="mb-20 mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="Bienvenido de nuevo!" text="" color='black' />
                        {
                            props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                        }
                        <div className="flex-row justify-center">

                            <div className="flex-col m-2">
                                <Input type="text" placeholder="Usuario" width="w-72"
                                    value={props.email}
                                    onChange={(e) => props.setEmail(e.target.value)}
                                />

                            </div>
                            <div className="flex-col  m-2 ">
                                <Input type="password" placeholder="Contraseña" width="w-72"
                                    value={props.password}
                                    onChange={(e) => props.setPassword(e.target.value)}
                                />
                            </div>


                            <Button title="login" width="w-72" />

                        </div>
                        <Contrasenia text='Olvidade tu contraseña?' path='#' />
                        <Contrasenia text='Registrate' path='/register' />

                    </form>
                </div>

            </div>

        </>
    )
}

export default LoginPresenter