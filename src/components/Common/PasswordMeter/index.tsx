import { useEffect, useState } from "react";


interface IProps {
    password: string
}

const PasswordMeter = ({ password }: IProps) => {

    useEffect(() => {
        setPassword(password)
    }, [password])



    const [passwordState, setPassword] = useState('');

    const calculateStrength = () => {
        const strength = passwordState.length >= 8 ? 'fuerte' : 'débil';
        return strength;
    };

    const calculateBarWidth = () => {
        // Ajusta la lógica según tus propios criterios
        const percentage = (passwordState.length / 20) * 100; // Suponiendo una longitud máxima de 20 caracteres
        return `${percentage}%`;
    };


    const calculateBarColor = () => {
        // Ajusta la lógica según tus propios criterios
        const strength = calculateStrength();
        return strength === 'fuerte' ? 'bg-green-500' : 'bg-red-500';
    }

    return (
        <div>
            <div className=" mt-2">
               
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div className={`${calculateBarColor()} h-1.5 rounded-full dark:bg-blue-500`}
                    style={{width:calculateBarWidth()}}></div>
                </div>

            </div>
            <div className="mt-2 text-sm text-gray-500">{`Fuerza de la contraseña: ${calculateStrength()}`}</div>
        </div>
    )
}

export default PasswordMeter