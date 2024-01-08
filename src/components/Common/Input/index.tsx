import  { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input: FC<InputProps> = ({...props }) => {
  return (
    <>
      <label className=" text-gray-700 text-sm font-bold mb-2">
        {props.placeholder}
      </label>
      <input

        className={` my-1 border border-blue-300 rounded-full px-5  py-4 text-gray-700 leading-tight
         focus:outline-none focus:shadow-outline ${props.width}
         ${props.disabled ? "bg-gray-200" : ""}
         `}
        {...props}
      />
    </>
  );
};

export default Input;