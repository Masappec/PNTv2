import { FaCircleCheck } from "react-icons/fa6";


interface Props {
    message: string;
    type: string;
    children?: React.ReactNode;
}
const ScreenMessage = ({ message, type, children }: Props) => {
    return (
        <div className="container w-auto m-24 h-[650px] px-20 border border-gray-100 shadow-2xl  ">
            <div className="flex flex-col items-center justify-center  ">
                < FaCircleCheck size={250} className="text-primary-500 mt-24 " />
                <div className="text-3xl text-center text-gray-600 mt-16">{message}</div>
                <div className="text-3xl text-center text-gray-600 mt-4 ">{type}</div>
            </div>

            {children}

        </div>
    )
}

export default ScreenMessage