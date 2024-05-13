import { Card } from "flowbite-react";
import { useState } from "react";
import { IconType } from "react-icons";
import { CiCircleAlert } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";

interface Props {
    icon?: IconType | JSX.ElementType;
    title: string;
    content: string;
    bgcolor: string;
    contrast: string;



}


const CardQuestion = (props: Props) => {

    const Icon = props.icon || CiCircleAlert;
    const [hover,setHover] = useState<boolean>(false);

    return (

        <div className={`flex  h-[400px] bg-[#F7941D0D]   m-b-8  lg:w-full`} >
            <Card className={` m-0 p-0 flex rounded-none shadow-none border-gray-700 border-l-[1px]  border-t-[1px] border-r-[1px]
             border-t-gray-400 lg:pt-6 w-full h-auto hover:text-black`}
                style={{
                    backgroundColor: hover?props.contrast:props.bgcolor,
                    //hover
                    color: hover?props.bgcolor:props.contrast,

                }}

                onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
                
            >
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-2 -mt-28 mb">

                    <Icon size={65} className={` dark:text-primary-400 h-full ml-4 `} style={{ color: "#FFF9FC" }}></Icon>
                    <h5 className="text-2xl w-full md:text-lg lg:text-3xl  sm:w-64 font-semibold tracking-tight text-slate-50 dark:text-white xl:-ml-20  ">
                        {props.title}
                    </h5>
                </div>
                <div className="relative mt-10">


                    <div className=" content-center w-auto xl:w-[400px] h-[55px] bg-transparent ">
                        <p className="font-normal xl:w-10/12 text-white mt-28  dark:text-gray-400 h-full text-xl  md:text-lg  mb-5 lg:ml-4">
                            {props.content}
                        </p>
                        <div className="lg:flex items-end justify-between mt-10 md:mt-16 xl:mt-20 h-full">
                            <IoArrowForwardOutline size={53} className="text-white dark:text-white" />

                        </div>
                    </div>

                </div>
            </Card>
        </div>

    )
}

export default CardQuestion;
