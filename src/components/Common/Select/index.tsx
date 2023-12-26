import {  SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    placeholder?: string;
    options?: {
        value: string;
        label: string;
    }[];
    
}

const Select = (props:SelectProps) => {

    return (
        <div className="flex flex-col justify-center items-center">
      <label className=" text-gray-700 text-sm font-bold mb-2">
        {props.placeholder}
      </label>
        <select
            className=" my-1 border border-blue-300 rounded-full px-5  py-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-60"
            {...props}
        >
            {
                props.options?.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))
            }
        </select>
      </div>
    )

}

export default Select;