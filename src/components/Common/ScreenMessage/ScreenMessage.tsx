import { FaCircleCheck } from "react-icons/fa6";


interface Props {
    message: string;
    type: string;
    children?: React.ReactNode;
}
const ScreenMessage = ({ message, type, children }: Props) => {
    return (
        <div className="container w-[1000px] m-24 h-[650px] border border-gray-100 shadow-2xl  ">
        <div className="flex flex-col items-center justify-center  ">
        < FaCircleCheck   size={250} className="text-primary-500 mt-24 "/> 
            <div className="text-3xl text-center text-gray-600 mt-16">{message}</div>
            <div className="text-3xl text-center text-gray-600 mt-4 ">{type}</div>
            {children}
        </div>

        <div className="flex items-center gap-16 ml-40 mt-8 ">



<button
    onClick={() => {
    }}
    className="py-2 text-xl text-black font-medium hover:text-blue-200 bg-white border-gray-300 border rounded-lg w-[300px] shadow-xl">
VER ORDEN
</button>

<button
    onClick={() => {
    }}
    className=" text-xl text-white font-medium hover:bg-primary-200 bg-primary-500 w-[300px]  py-2 rounded-lg shadow-xl">
CONTINUAR
</button>

</div>
        </div>
    )
}

export default ScreenMessage