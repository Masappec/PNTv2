import React, { FormEvent } from 'react'
import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Input from '../../Common/Input';
import Contrasenia from '../../Common/Contrasenia';

interface RegisterPresenterProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setFirstName: (e: string) => void;
    setLastName: (e: string) => void;
    setEmail: (e: string) => void;
    setPassword: (e: string) => void;
    setConfirmPassword: (e: string) => void;
}

const RegisterPresenter = ({ ...props }: RegisterPresenterProps) => {
    return (
        <>
            <div className='bg-sky-700 min-h-screen flex  '>
                <div className='items-center flex  justify-center h-auto flex-col flex-auto justify-items-start' >
                    <Title title="Solicita información a las entidades públicas." text="Es tu derecho" color='white' />

                </div>

                <div className="bg-white flex w-2/6  text-center  items-center ">
                    <form className="mb-20   mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="Crea una cuenta" text="" color='black' />
                        <div className="flex-row justify-center">

                            <div className="flex-col m-2">
                                <Input type="firstName" placeholder="nombre" width="w-72"
                                    value={props.firstName}
                                    onChange={(e) => props.setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex-col  m-2 ">
                                <Input type="lastName" placeholder="apellido" width="w-72"
                                    value={props.lastName}
                                    onChange={(e) => props.setLastName(e.target.value)}
                                /> </div>
                            <div className="flex-col  m-2 ">
                                <Input type="email" placeholder="correo" width="w-72"
                                    value={props.email}
                                    onChange={(e) => props.setEmail(e.target.value)}
                                /> </div>
                            <div className="flex-col  m-2 ">
                                <Input type="password" placeholder="Ingresar contraseña" width="w-72"
                                    value={props.password}
                                    onChange={(e) => props.setPassword(e.target.value)}
                                /> </div>
                            <div className="flex-col  m-2 ">
                                <Input type="confirmPassword" placeholder="confirmar contraseña" width="w-72"
                                    value={props.confirmPassword}
                                    onChange={(e) => props.setConfirmPassword(e.target.value)}
                                />
                            </div>


                            <Button title="Register" width="w-72" />
                            <Contrasenia text='Ya tienes cuenta? Inicia Session' path='/' />

                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}

export default RegisterPresenter