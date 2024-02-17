import { Card } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";

interface Props{
    title:string; 
    content:string;
    backgroundColor:string;
    text:string;

}

const CardConsulta = (props: Props )     => {
    return(
     


           
       <div className="  flex flex-col  w-auto h-[350px] bg-[#F7941D0D]  mt-20 text-left ">
          <h1 className=" flex text-lg font-bold tracking-tight text-gray-900 dark:text-white bg-white p-3">
            {props.title}
             </h1> 
        <Card href="#" className={" rounded-none shadow-none border-transparent border-l-[1px] border-t-[1px] border-r-[1px] max-w-sm h-full flex " + props.backgroundColor}>
          
            <p className=" font-semibold text-slate-950 dark:text-gray-400 h-full mt-4 text-left">
           {props.content}
            </p>
            <div className="flex container col-2 mr-8 space-x-4 ">
           
           <h1 className="font-semibold"> {props.text}</h1> 
           <div className="flex items-end justify-between h-full  ">
            <FaArrowRight size={30} className="text-gray-900 dark:text-white" />

            </div></div>

         
        </Card> 
        </div>
    )


}

export default CardConsulta