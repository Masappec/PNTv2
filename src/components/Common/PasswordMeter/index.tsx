import { useEffect, useState } from "react";

export interface IOncalculate {
    percentage: number;
    strength: string;
    feedback: string[];
    colorClass: string;
}
interface IProps {
    password: string;
    onCalculate?: (date: IOncalculate) => void;
}

const PasswordMeter = ({ password, onCalculate }: IProps) => {

    useEffect(() => {
        setPassword(password)
    }, [password])



    const [passwordState, setPassword] = useState('');



    const calculatePasswordStrength = (password: string) => {
        let score = 0;
        const feedback = [];

        // Longitud mínima
        if (password.length < 8) {
            feedback.push('Debe tener al menos 8 letras de longitud.');
        } else {
            score += 20;
        }

        // Al menos una letra minúscula y una mayúscula
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
            score += 20;
        } else {
            feedback.push('Al menos una de las letras que elijas debe ser mayúscula y otra minúscula.');
        }

        // Al menos un número
        if (/\d/.test(password)) {
            score += 20;
        } else {
            feedback.push('No solo debes utilizar letras sino al menos un número.');
        }

        // Al menos un carácter especial
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            score += 20;
        } else {
            feedback.push('Además, te recomendamos agregar un símbolo como $%&* para que sea más difícil adivinar para personas no autorizadas.');
        }

        // Evitar caracteres repetidos
        if (!/(.)\1{2}/.test(password)) {
            score += 20;
        } else {
            feedback.push('La contraseña no debe contener caracteres repetidos consecutivos');
        }

        // Convertir el puntaje a un porcentaje
        const percentage = Math.min(score, 100);

        // Definir la fortaleza de la contraseña
        let strength;
        if (percentage < 50) {
            strength = 'Débil';
        } else if (percentage < 75) {
            strength = 'Media';
        } else {
            strength = 'Fuerte';
        }

        // Definir la clase de Tailwind CSS para el color de fondo de la barra de progreso
        let colorClass;
        if (percentage < 50) {
            colorClass = 'bg-red-500';
        } else if (percentage < 75) {
            colorClass = 'bg-yellow-500';
        } else {
            colorClass = 'bg-green-500';
        }
        onCalculate && onCalculate({ percentage, strength, feedback, colorClass });

        return { percentage, strength, feedback, colorClass };
    };



    return (
        <div className="w-auto">
            <div className=" mt-2">

                <div className="w-[200px] bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div className={`${passwordState != "" ? calculatePasswordStrength(passwordState).colorClass : ""} h-1.5 rounded-full dark:bg-blue-500`}
                        style={{ width: passwordState != "" ? calculatePasswordStrength(passwordState).percentage + 100 : 0 }}></div>
                </div>

            </div>
            {
                calculatePasswordStrength(passwordState).strength != "" && <>Para precautelar tu seguridad, la contraseña que definas debe cumplir con las siguientes características:</>
            }
            {
                passwordState != "" && calculatePasswordStrength(passwordState).feedback.map((item, index) => (
                    <li key={index} className="text-sm text-red-500">
                        {item}

                    </li>
                ))

            }

        </div>
    )
}

export default PasswordMeter