import { FaArrowUp } from "react-icons/fa";

interface Props {
  title: string;
  text: string;
}

const Numeral = ({ title, text,  }: Props) => {
  return (
    <div className="flex bg-stone-100  px-4  py-2.5 dark:bg-gray-800 w-5/6  h-auto rounded-lg">
      <div className="flex flex-cols-4 gap-5 ">
        <div>
          <button className="bg-amber-400 hover:bg-amber-200 text-white font-bold py-2 px-2 rounded-lg">
            <FaArrowUp size={20} />
          </button>
        </div>
        <div className="text-base font-medium text-gray-500 my-2">{title}</div>

        <div className="border-l-2 border-gray-300 h-6 my-2"></div>
        <div className="text-base font-medium my-2">{text}</div>
      </div>
    </div>
  );
};
export default Numeral;
