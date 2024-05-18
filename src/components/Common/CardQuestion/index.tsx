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
    const [hover, setHover] = useState<boolean>(false);

    return (

        <div className={`flex 2xl:h-[450px] h-[400px] bg-[#F7941D0D]   m-b-8  lg:w-full`} >
            <div className={`border bg-white dark:border-gray-700 dark:bg-gray-800 flex-col m-0 p-0 flex rounded-none shadow-none border-gray-700 border-l-[1px] border-t-[1px] border-r-[1px] justify-content-start border-t-gray-400 lg:pt-6 w-full h-auto hover:text-black`}
                style={{
                    backgroundColor: hover ? props.contrast : props.bgcolor,
                    //hover
                    color: hover ? props.bgcolor : props.contrast,

                }}

                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}


            ><div className="flex h-full flex-col gap-4 p-6">
                    <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-2 mt-0 xl:mt-0 2xl:mt-5 mb">

                        <Icon size={65} className={` dark:text-primary-400 h-full ml-4 
                        2xl:w-1/2 md:w-1/6 xl:w-1/3
                        `}
                            style={{ color: "#FFF9FC" }}></Icon>
                        <h5 className="text-2xl   
                        lg:text-3xl 2xl:text-4xl  sm:w-full font-semibold 
                        tracking-tight text-slate-50 dark:text-white 2xl:ml-0 xl:-ml-20 
                        2xl:col-span-2 2xl:w-full md:text-3xl xl:w-auto
                        ">
                            {props.title}
                        </h5>
                    </div>
                    <div className="relative xl:mt-0 2xl:mt-0">


                        <div className="w-auto xl:w-[400px] h-[55px] bg-transparent ">
                            <p className="font-normal
                             xl:w-10/12 text-white 2xl:mt-5 xl:mt-3  dark:text-gray-400 h-full
                             2xl:text-2xl text-xl  md:text-xl  mb-5 lg:ml-4">
                                {props.content}
                            </p>
                            <div className="lg:flex 
                            items-end justify-between mt-20 2xl:mt-28 md:mt-25 xl:mt-20">
                                <IoArrowForwardOutline size={53} className="text-white dark:text-white" />

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >

    )
}

export default CardQuestion;
