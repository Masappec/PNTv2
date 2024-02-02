import { Card } from "flowbite-react";
import { CiCircleAlert } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";



const CardQuestion = () => {
    return (
        <div className="flex  w-[458px] h-[557px] bg-[#F7941D0D]  border-b-8 m-b-8 border-[#F7941D]">
        <Card href="#" className=" rounded-none bg-[#F7941D0D]  shadow-none border-gray-900 border-l-[1px] border-t-[1px] border-r-[1px] ">

            <CiCircleAlert size={48} className="text-[#F7941D] dark:text-primary-400 h-full" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ¿Qué puedo hacer en este portal ?
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 h-full">
            Consulta aquí los datos abiertos que las empresas y entidades públicas declaran al gobierno
            </p>
            <div className="flex items-end justify-between h-full">
            <FaArrowRight size={40} className="text-gray-900 dark:text-white" />

            </div>

             
        </Card>
        </div>
    )
}

export default CardQuestion;
