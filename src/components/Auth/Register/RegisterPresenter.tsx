import { FormEvent } from 'react'
import Title from '../../Common/Title'
import Button from '../../Common/Button'
import Input from '../../Common/Input';
import Contrasenia from '../../Common/Contrasenia';
import img from '@assets/login.svg'
import Alert from '../../Common/Alert';
import FormFieldsEntity from '../../../domain/entities/FormFieldsEntity';
import Select from '../../Common/Select';
import Checkbox from '../../Common/Checkbox';
import { RegisterDto } from '../../../infrastructure/Api/Auth/AuthApi';

interface RegisterPresenterProps {
    

    error: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  
    setError: (e: string) => void;
    data: RegisterDto;
    setData: (name: string, value: string|boolean) => void;
    fields: FormFieldsEntity[];

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

                            {
                                props.fields.map((field) => {
                                    return (
                                        field.type_field === 'select' ? <div className="flex  flex-col m-2 items-center">
                                            
                                            <Select
                                                placeholder={field.description}
                                                value={props.data[field.name as keyof RegisterDto] as string}
                                                onChange={(e) => props.setData(field.name, e.target.value)}
                                                options={[
                                                    { value: '1', label: 'One' },
                                                    { value: '2', label: 'Two' },
                                                    { value: '3', label: 'Three' },
                                                ]}
                                            />
                                        </div> : field.type_field === 'checkbox' ? 
                                        <div className="flex  flex-col m-2 items-center">
                                            <Checkbox
                                                checked={props.data[field.name as keyof RegisterDto]}
                                                onChange={(e) => props.setData(field.name, e)}
                                                id={field.name}
                                                label={field.description}
                                                />
                                        </div> :
                                        <div className="flex  flex-col m-2 items-center">
                                            <Input type={field.type_field}
                                             placeholder={field.description} width="w-60"
                                                value={props.data[field.name as keyof RegisterDto] as string}
                                                onChange={(e) => props.setData(field.name, e.target.value)}
                                            />
                                        </div>
                                    )
                                })
                            }
                            



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