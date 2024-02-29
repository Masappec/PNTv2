import { Card } from "flowbite-react";
import { IconType } from "react-icons";
import { CiCircleAlert } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";

interface Props{
    icon?: IconType | null;
    title: string;
    content: string;
    bgcolor: string;
    contrast: string;

}


const CardQuestion = (props: Props) => {

    const Icon = props.icon || CiCircleAlert;

    return (
        <div className={`flex  h-[557px] bg-[#F7941D0D]  border-b-8 m-b-8 lg:w-full`}  style={{
            borderColor: props.contrast
        }}>
        <Card href="#" className=" rounded-none shadow-none border-gray-700 border-l-[1px]  border-t-[1px] border-r-[1px] border-t-gray-400 pt-6 w-full h-auto "
        style={{
            backgroundColor: props.bgcolor,
        }}
        >

            <Icon size={100} className={` dark:text-primary-400 h-full ml-4 `}  style={{
                color:"#FFF9FC"
                
            
            }}></Icon>
            <h5 className="text-2xl w-8/12 font-extrabold tracking-tight text-gray-900 dark:text-white ml-4">
                {props.title}
            </h5>
            <p className="font-semibold w-10/12 text-black  dark:text-gray-400 h-full text-lg -mb-10 ml-4">
                {props.content}
            </p>
            <div className="flex items-end justify-between h-full ">
            <IoArrowForwardOutline  size={53} className="text-gray-900 dark:text-white" />

            </div>

             
        </Card>
        </div>
    )
}

export default CardQuestion;
