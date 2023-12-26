import { FormEvent } from 'react'
import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Input from '../../Common/Input';
import Contrasenia from '../../Common/Contrasenia';
import img from '@assets/login.svg'
import Alert from '../../Common/Alert';
import Select from '../../Common/Select';

interface RegisterPresenterProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    identification: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    province: string;
    type_person: string;

    error: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setFirstName: (e: string) => void;
    setLastName: (e: string) => void;
    setEmail: (e: string) => void;
    setPassword: (e: string) => void;
    setConfirmPassword: (e: string) => void;
    setError: (e: string) => void;

    setIdentification: (e: string) => void;
    setPhone: (e: string) => void;
    setAddress: (e: string) => void;
    setCountry: (e: string) => void;
    setCity: (e: string) => void;
    setProvince: (e: string) => void;
    setTypePerson: (e: string) => void;

}

const RegisterPresenter = ({ ...props }: RegisterPresenterProps) => {
    return (
        <>
            <div className='bg-sky-700 min-h-screen flex  '>
                <div className='items-center lg:flex xl:flex 2xl:flex justify-center h-auto flex-col flex-auto justify-items-start hidden' >
                    <Title title="Solicita información a las entidades públicas." text="Es tu derecho" color='white' />
                    <img src={img} alt='imagen' className='w-1/2 h-1/2' />
                </div>

                <div className="bg-white flex xl:w-2/3 2xl:w-2/3 lg:w-2/3 w-full  text-center  items-center ">
                    
                    <form className="mb-20 w-full mt-15 " onSubmit={props.handleSubmit}>
                        <Title title="Crea una cuenta" text="" color='black' />
                        {
                                props.error && <Alert message={props.error} type="error" onClose={() => props.setError('')} />
                            }
                        <div className="grid grid-cols-2">
                           

                            <div className="flex-col py-5">
                                <Input type="text" placeholder="nombre" width="w-60"
                                    value={props.firstName}
                                    onChange={(e) => props.setFirstName(e.target.value)}
                                />
                            
                                <Input type="text" placeholder="apellido" width="w-60"
                                    value={props.lastName}
                                    onChange={(e) => props.setLastName(e.target.value)}
                                /> 

                                <Select
                                    placeholder="Tipo de persona"
                                    options={[
                                        { value: "natural", label: "Natural" },
                                        { value: "juridica", label: "Juridica" },
                                    ]}
                                    onChange={(e) => props.setTypePerson(e.target.value)}
                                    
                                />
                                <Input type="email" placeholder="correo" width="w-60"
                                    value={props.email}
                                    onChange={(e) => props.setEmail(e.target.value)}
                                /> 
                                <Input type="password" placeholder="Ingresar contraseña" width="w-60"
                                    value={props.password}
                                    onChange={(e) => props.setPassword(e.target.value)}
                                /> 
                                <Input type="password" placeholder="confirmar contraseña" width="w-60"
                                    value={props.confirmPassword}
                                    onChange={(e) => props.setConfirmPassword(e.target.value)}
                                />
                                
                            </div>
                            
                            <div className="flex-col">
                            <Input type="text" placeholder="Identificación" width="w-60"
                                    value={props.identification}
                                    onChange={(e) => props.setIdentification(e.target.value)}
                                /> 
                                <Input type="tel" placeholder="Teléfono" width="w-60"
                                    value={props.phone}
                                    onChange={(e) => props.setPhone(e.target.value)}
                                /> 

                                <Input type="text" placeholder="Dirección" width="w-60"
                                    value={props.address}
                                    onChange={(e) => props.setAddress(e.target.value)}
                                /> 
                                <Input type="text" placeholder="País" width="w-60"
                                    value={props.country}
                                    onChange={(e) => props.setCountry(e.target.value)}
                                /> 

                                <Input type="text" placeholder="Ciudad" width="w-60"
                                    value={props.city}
                                    onChange={(e) => props.setCity(e.target.value)}
                                /> 
                                <Input type="text" placeholder="Provincia" width="w-60"
                                    value={props.province}
                                    onChange={(e) => props.setProvince(e.target.value)}
                                />

                            </div>
                            

                            
                        </div>
                        <Button title="Register" width="w-60" />
                            <Contrasenia text='Ya tienes cuenta? Inicia Session' path='/' />

                    </form>
                </div>

            </div>

        </>
    )
}

export default RegisterPresenter