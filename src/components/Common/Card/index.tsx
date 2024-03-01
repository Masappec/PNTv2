import { Card } from "flowbite-react";
import { VscArrowRight } from "react-icons/vsc";
import { IconType } from 'react-icons';
import { ReactElement } from "react";

interface Props{
    title:string; 
    content?:string | null;
    backgroundColor:string;
    text?:string  | null;
    icon?: ReactElement<IconType>| null;
    color: string;
    bgcolor?: string | null;
    
    

}

const CardConsulta = (props: Props )     => {


    return(
     


           
       <div className=" container flex flex-col  w-auto h-[350px] bg-[#F7941D0D]  mt-20 text-left  ">
      
        <Card href="#" className={" rounded-none shadow-none border-transparent border-l-[1px] border-t-[1px] border-r-[1px] max-w-sm w-10/12 h-full flex " + props.backgroundColor}>

        <div className="text-center ">
          {props.icon}
    
      </div>

      <h1 className=" flex text-2xl font-bold tracking-tight text-black  ">
            {props.title}
             </h1> 
          
            <p className=" font-medium text-white dark:text-gray-400 h-auto mt-0 text-left w-64 text-lg -mx-2  ">
           {props.content}
            </p>
            
    
           <div className="flex items-end justify-between h-full   ">
            <VscArrowRight size={50} className={props.color} />

            </div>
        

         
        </Card> 
        </div>
    )


}

export default CardConsulta