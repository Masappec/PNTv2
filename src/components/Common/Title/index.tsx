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

    const typeSubText = {
      black: "text-primary-600",
      white: "text-gray-200",
    }

    return (
        <>
      <div className="max-w-md mx-auto my-6 justify-start  px-20 py-4 md:ml-8  ">
        <h1  className={typeText[color]+" text-3xl font-bold mr-4"}>{title}</h1>
        <p  className={typeSubText[color]+" mb-2 "}>{text}</p>
      </div>
      </>
    );
  };
  
  export default Title