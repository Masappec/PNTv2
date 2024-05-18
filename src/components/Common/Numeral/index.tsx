import { BiCheckCircle } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  title: string;
  text: string;
  onClick: () => void
  isPublished?: boolean;
}

const Numeral = ({ title, text, onClick, isPublished }: Props) => {
  return (
    <div className="flex bg-stone-100  px-4  py-2.5 dark:bg-gray-800  h-auto rounded-lg"

      onClick={() => onClick()}>
      <div className="flex flex-row gap-5 items-center">
        <div>
          <div className={`${isPublished == true ? "bg-green-600" : "bg-amber-500 hover:bg-amber-300"} text-white font-bold py-2 px-2 rounded-lg mt-2 cursor-pointer`}>

            {
              isPublished == false ? <FaArrowUp size={30} /> : <BiCheckCircle size={30} />
            }
          </div>
        </div>
        <div className="text-base font-medium text-gray-500 my-2 whitespace-nowrap">{title}</div>

        <div className="border-l-2 border-gray-300 h-6 my-2 "></div>
        <div className="text-base font-medium my-2 ">{text}</div>
      </div>
    </div>
  );
};
export default Numeral;
