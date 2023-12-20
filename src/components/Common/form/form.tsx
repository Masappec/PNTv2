import React from "react";
import Input from '../../Common/Input'
import Button from '../../Common/Button';
import Title from '../../Common/Title/Ttle';
import Contraseña from "../Contraseña/Contraseña";

const Form = () =>{
    return(
        <div className="bg-white w-2/5 px-7 text-center">     
        <form  className="mb-20 justify-end mt-15 ">   
           <Title title="Hello Again!" text="Welcome Back" />
           <Input type="email" placeholder="correo" />
           <Input type="password" placeholder="Enter your password" />
           <Button title="login" width="w-20"/>
           <Contraseña/>
        </form>
        </div>
    )
}
export default Form