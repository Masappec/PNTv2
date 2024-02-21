import { Card } from "flowbite-react";
import { VscArrowRight } from "react-icons/vsc";

interface Props{
    title:string; 
    content:string;
    backgroundColor:string;
    text:string;

}

const CardConsulta = (props: Props )     => {
    return(
     


           
       <div className="  flex flex-col  w-auto h-[400px] bg-[#F7941D0D]  mt-20 text-left  ">
          <h1 className=" flex text-xl font-extrabold tracking-tight text-gray-900 dark:text-white bg-white p-3 ">
            {props.title}
             </h1> 
        <Card href="#" className={" rounded-none shadow-none border-transparent border-l-[1px] border-t-[1px] border-r-[1px] max-w-sm w-10/12 h-full flex " + props.backgroundColor}>
          
            <p className=" font-bold text-slate-950 dark:text-gray-400 h-full mt-4 text-left w-64 text-lg -mx-2  ">
           {props.content}
            </p>
            <div className="flex container col-2 mr-8 space-x-6 ">
           
           <h1 className="font-semibold"> {props.text}</h1> 
           <div className="flex items-end justify-between h-full  ">
            <VscArrowRight size={46} className="text-gray-900 dark:text-white" />

            </div></div>

         
        </Card> 
        </div>
    )


}

export default CardConsulta