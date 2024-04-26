import { Card } from "flowbite-react";
import { IconType } from "react-icons";
import { CiCircleAlert } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

interface Props {
    icon?: IconType | JSX.ElementType;
    title: string;
    content: string;
    bgcolor: string;
    contrast: string;
    


}


const CardQuestion = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const Icon = props.icon || CiCircleAlert;
    

    return (
    
        <div className={`flex  h-[450px] bg-[#F7941D0D]   m-b-8  lg:w-full`} style={{
            borderColor: props.contrast,
        
        }}>
            <Card href="#" className="  flex rounded-none shadow-none border-gray-700 border-l-[1px]  border-t-[1px] border-r-[1px] border-t-gray-400 pt-6 w-full h-auto "
                style={{
                    backgroundColor: props.bgcolor, 
                    
                }}
            >
                <div className="grid grid-cols-2 gap-2 -mt-32 ">

                <Icon size={65} className={` dark:text-primary-400 h-full ml-4 `} style={{
                    color: "#FFF9FC"


                }}></Icon>
                <h5 className="text-2xl w-8/12 sm:w-64 font-semibold tracking-tight text-slate-50 dark:text-white -ml-20  ">
                    {props.title}
                </h5>
                </div>
                <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-blue-50 text-white font-bold px-44 focus:outline-none focus:shadow-outline"
      >
        < RiArrowDropDownLine size={65} />
      </button>
      {isOpen && (
        <div className=" content-center w-[400px] h-[95px] bg-transparent ">
            <p className="font-normal w-10/12 text-black   dark:text-gray-400 h-full text-lg mb-5 ml-4">
                    {props.content}
                </p>
                <div className="flex items-end justify-between h-full  ">
                    <IoArrowForwardOutline size={53} className="text-gray-900 dark:text-white" />

                </div>
        </div>
      )}
    </div>
              
             


            </Card>
        </div>

    )
}

export default CardQuestion;
