import { Card } from "flowbite-react";

import { GoArrowRight } from "react-icons/go";


interface Props {
    title: string;
    content: string;
    bgcolor: string;
    contrast: string;
    onClick?: () => void;

}


const CardNormative = (props: Props) => {


    return (


        <div className={`flex h-[250px] bg-[#F7941D0D]  border-b-8 m-b-8 lg:w-full w-[90%] `} style={{
            borderColor: props.contrast
        }} 

            onClick={props.onClick}
        >

            <Card href="#" className=" flex rounded-none shadow-none  border-gray-700 border-l-[1px]  border-t-[1px] border-r-[1px] border-t-gray-400 pt-6 w-full h-auto    "
                style={{
                    backgroundColor: props.bgcolor,
                }}
            >

                <div className="flex flex-col xl:flex-row gap-y-2 xl:-mt-6  ">

                    <h5 className="text-xl w-8/12 font-bold tracking-tight text-gray-900 dark:text-white ml-4">
                        {props.title}
                    </h5>
                    <p className="font-semibold w-fit xl:w-10/12 text-black  dark:text-gray-400 h-full text-lg xl:-mb-10 xl:ml-4">
                        {props.content}
                    </p>
                    <div className="flex items-start justify-between ml-2  xl:mt-28  xl:-ml-80 cursor-pointer">
                        <GoArrowRight size={53} className="text-gray-900 dark:text-white " />

                    </div>

                </div>


            </Card>
        </div>

    )
}

export default CardNormative;
