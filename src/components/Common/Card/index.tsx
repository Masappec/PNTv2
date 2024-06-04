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
    onFollow?: () => void;


}

const CardConsulta = (props: Props) => {

    const [hover, setHover] = useState(false);
    /*
    return (



        <div
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={" container flex flex-col h-full 2xl:w-10/12 md:w-full lg:w-auto xl:h-[350px]  text-left  " + props.classnames}>

            <Card
                className={"mt-5 xl:mt-0 lg:mt-0 rounded-none shadow-none border-transparent border-l-[1px] border-t-[1px] border-r-[1px] items-center w-full  h-full flex " + props.backgroundColor}>

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

               
                <button className="flex items-end justify-between h-full   "

                  onClick={props.onFollow} >
                    <VscArrowRight size={50} className={`${props.color} ${hover ? "text-white" : "text-black"} `} />

                </button>



            </Card>
        </div>
    )*/
    return (<article
        id='normativa-card'
        className={`group flex h-full w-full cursor-pointer flex-col justify-between ${props.backgroundColor} px-8 py-8 text-white hover:text-gray-800`}>
        <div className='grid grid-rows-[92px,80px,max-content]'>
            

                {props.icon}
          

            <h2 className='mb-4 text-balance text-2xl font-bold transition'>
                {props.title}
            </h2>
            <p className='mb-8 text-pretty text-lg font-medium leading-7 transition'>
                {props.content}
            </p>
        </div>

        <div className='inline-flex items-center justify-start gap-x-4 text-lg font-semibold'>
            <span>Ir a la Sección</span>

            <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 transition group-hover:translate-x-4'>
                <path
                    d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                    fill='currentColor'
                    fill-rule='evenodd'
                    clip-rule='evenodd'></path>
            </svg>
        </div>
    </article>)


}

export default CardConsulta