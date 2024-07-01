import { Label,  } from "flowbite-react";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    placeholder?: string;
    className?: string;
    options?: {
        value: string;
        label: string;
    }[];
    selected?: {
        value: string;
}
}

const Select = (props: SelectProps) => {
    console.log(props.selected)

    return (
        <div className="flex flex-col">

            <div className="mb-2 block">
                <Label value={props.placeholder}  data-testid="flowbite-label" />
            </div>
            <select  
                {...props}
            >

                {
                    props.options?.map((option) => (
                        <option value={option.value}
                        selected={
                            option.value == props.selected?.value
                        }
                        >{option.label}</option>
                    ))
                }
            </select>
        </div>
    )

}

export default Select;