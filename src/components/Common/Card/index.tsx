import { Card } from "flowbite-react";
import { VscArrowRight } from "react-icons/vsc";
import { IconType } from 'react-icons';
import { ReactElement, useState } from "react";

interface Props {
    title: string;
    content?: string | null;
    backgroundColor: string;
    text?: string | null;
    icon?: ReactElement<IconType> | null;
    color: string;
    bgcolor?: string | null;
    classnames?: string | null;


}

const CardConsulta = (props: Props) => {

    const [hover, setHover] = useState(false);

    return (



        <div
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={" container flex flex-col h-full w-auto xl:h-[350px] bg-[#F7941D0D]  xl:mt-20 text-left  " + props.classnames}>

            <Card
                href="#" className={"mt-5 xl:mt-0 lg:mt-0 rounded-none shadow-none border-transparent border-l-[1px] border-t-[1px] border-r-[1px] max-w-sm w-10/12 h-full flex " + props.backgroundColor}>

                <div className={`text-center ${hover ? "xl:hidden lg:hidden" : ""}`}>
                    {props.icon}

                </div>

                <h1 className={`  text-2xl font-bold tracking-tight text-black  ${hover ? "hidden" : "flex"}`}>
                    {props.title}
                </h1>

                <p className={` font-medium text-black lg:text-white xl:text-white dark:text-gray-400 h-auto mt-0 text-left 
                w-64 text-lg -mx-2 ${hover ? "flex" : "xl:hidden lg:hidden"}  `}>
                    {props.content}
                </p>


                <div className="flex items-end justify-between h-full   ">
                    <VscArrowRight size={50} className={`${props.color} ${hover ? "text-white" : "text-black"} `} />

                </div>



            </Card>
        </div>
    )


}

export default CardConsulta