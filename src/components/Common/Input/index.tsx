import React, { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input: FC<InputProps> = ({...props }) => {
  return (
    <>
      <input

        className={"  border rounded-full px-5  py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "+props.width}
        {...props}
      />
    </>
  );
};

export default Input;