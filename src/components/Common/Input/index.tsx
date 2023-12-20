import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const Input: FC<InputProps> = ({...props }) => {
  return (
    <>
    <div className="mb-6 b-4 justify-center text-center ">
      <input

    className="  border rounded-full px-20 py-4 text-gray-700 leading-tight "
        {...props}
      />
    </div>
    </>
  );
};

export default Input;