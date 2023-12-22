import  {FC} from "react";

interface TitleProps {
    title: string;
    text: string;
    color: "black" | "white";
  }
  
  const Title: FC<TitleProps> = ({ title, text, color }) => {

    const typeText = {
      black: "text-gray-800",
      white: "text-white",
    }

    return (
        <>
      <div className="max-w-md mx-auto my-6 justify-start  px-20 py-4 md:ml-8  ">
        <h1  className={typeText[color]+" text-3xl font-bold mr-4"}>{title}</h1>
        <p  className="text-cyan-400 mb-2 ">{text}</p>
      </div>
      </>
    );
  };
  
  export default Title