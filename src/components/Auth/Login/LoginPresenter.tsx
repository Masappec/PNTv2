import React, { FormEvent } from 'react'
import Title from '../../Common/Title/Title'
import Button from '../../Common/Button'
import Input from '../../Common/Input';
import Contraseña from '../../Common/Contraseña/Contraseña';

interface LoginPresenterProps {
    email: string;
    password: string;
    error: string;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setEmail: (e: string) => void;
    setPassword: (e: string) => void;        
}


const LoginPresenter = ({...props}:LoginPresenterProps) => {
    return (
        <>
        <div className='bg-sky-700 min-h-screen flex  '> 
        <div className='items-center flex  justify-center h-auto flex-col flex-auto justify-items-start' >
        <Title  title="GoFinance" text="The most popular............" />
        <Button title='Read More' width="w-20"/> 
   
       </div> 
    
       <div className="bg-white flex w-2/6  text-center  items-center ">
            <form className="mb-20   mt-15 " onSubmit={props.handleSubmit}>
                <Title title="Hello Again!" text="Welcome Back" />
                <div className="flex-row justify-center">

                    <div className="flex-col m-2">
                    <Input type="email" placeholder="correo" width="w-72" 
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)}
                    />

                    </div>
                    <div className="flex-col  m-2 ">
                    <Input type="password" placeholder="Enter your password" width="w-72" 
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)}
                    />
                    </div>


                    <Button title="login" width="w-72" />

                </div>
                <Contraseña />
            </form>
        </div>

       </div>
           
     </>
    )
}

export default LoginPresenter