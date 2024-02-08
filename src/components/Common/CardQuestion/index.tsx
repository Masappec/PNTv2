import { Card } from "flowbite-react";
import { IconType } from "react-icons";
import { CiCircleAlert } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

interface Props{
    icon: IconType;
    title: string;
    content: string;
    bgcolor: string;
    contrast: string;

}


const CardQuestion = (props: Props) => {

    const Icon = props.icon || CiCircleAlert;

    return (
        <div className={`flex  h-[557px] bg-[#F7941D0D]  border-b-8 m-b-8 `} style={{
            borderColor: props.contrast
        }}>
        <Card href="#" className=" rounded-none shadow-none border-gray-900 border-l-[1px] border-t-[1px] border-r-[1px] "
        style={{
            backgroundColor: props.bgcolor,
        }}
        >

            <Icon size={48} className={` dark:text-primary-400 h-full`} style={{
                color: props.contrast
            
            }}></Icon>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 h-full">
                {props.content}
            </p>
            <div className="flex items-end justify-between h-full">
            <FaArrowRight size={40} className="text-gray-900 dark:text-white" />

            </div>

             
        </Card>
        </div>
    )
}

export default CardQuestion;
