import React, {FC} from "react";

interface TitleProps {
    title: string;
    text: string;
  }
  
  const Title: FC<TitleProps> = ({ title, text }) => {
    return (
        <>
      <div className="max-w-md mx-auto my-6 justify-start  px-20 py-4 md:ml-8  ">
        <h1  className=" text-slate-950 text-3xl font-bold mr-4">{title}</h1>
        <p  className="text-cyan-400 mb-2 ">{text}</p>
      </div>
      </>
    );
  };
  
  export default Title