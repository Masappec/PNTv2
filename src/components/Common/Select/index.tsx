import { Label, Select as SelectBite } from "flowbite-react";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    placeholder?: string;
    options?: {
        value: string;
        label: string;
    }[];

}

const Select = (props: SelectProps) => {


    return (
        <div className="flex flex-col">

            <div className="mb-2 block">
                <Label value={props.placeholder} />
            </div>
            <SelectBite 
                {...props}
            >

                {
                    props.options?.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))
                }
            </SelectBite>
        </div>
    )

}

export default Select;