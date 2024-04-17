import React, { ComponentType } from 'react';
import {
    components, ContainerProps, ControlProps, ValueContainerProps, InputProps,

} from 'react-select';
import { ColourOption } from '../../../utils/interface';
import { FaSearch } from 'react-icons/fa';
import AsyncSelect from 'react-select/async';

const SelectContainer = ({
    children,
    ...props
}: ContainerProps<ColourOption>) => {
    return (
        <components.SelectContainer {...props} >
            {children}
        </components.SelectContainer>
    );
};



const LoadingIndicator = () => {
    return (
        <div>

        </div>
    );
}


const DropdownIndicator = () => {





    return (
        <button
            type="button"

            className="!absolute w-[86px] h-[50px] border-black  
                 
                  text-white bg-primary-700
                  
                   hover:bg-primary-800 focus:ring-4
                   justify-center
                     font-normal 
                    flex items-center
                    xl:w-[150px]
                    xl:space-x-5
                    -ml-20
                    rounded-full text-xl  "
        >

            <p className='hidden xl:flex'>
                Buscar
            </p>
            <FaSearch size="20" />
        </button>
    );
}

const Input: ComponentType<InputProps<ColourOption>>

    = (props) => {
        return (
            <input {...props} className="
            onfocus:outline-none
            border-none
            focus:border-none
            outline-none
            focus:outline-none
            border-white
            focus:shadow-none
            w-full
            "


                style={({
                    "--tw-ring-color": "transparent",
                } as React.CSSProperties)}
            />
        );
    }


const ValueContainer = (props: ValueContainerProps<ColourOption>) => {
    return (
        <components.ValueContainer {...props}

            className="w-full border-[1px] border-black  rounded-full">
            {props.children}

        </components.ValueContainer>
    );
}

const Control = (props: ControlProps<ColourOption>) => {
    return (
        <div
            ref={props.innerRef}
            className='w-full flex'
            {...props.innerProps}>
            {props.children}
        </div>


    );
}


interface Props {
    colourOptions: ColourOption[];
    loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
    onSelect: (value: ColourOption) => void;
}
export const CustomSearch: React.FC<Props> = ({ colourOptions, loadOptions, onSelect }) => {

    const [selectedOption, setSelectedOption] = React.useState<ColourOption | null>(null);


    return <AsyncSelect
        closeMenuOnSelect={false}
        loadOptions={loadOptions}
        cacheOptions={true}

        components={{
            SelectContainer, Control, DropdownIndicator, ValueContainer,
            Input: Input, LoadingIndicator
        }}
        styles={{
            container: (base) => ({
                ...base,
                padding: 5,


            }),

            valueContainer: (base) => ({
                ...base,
                height: 50,
            }),


        }}
        placeholder=""

        classNames={{


        }}
        options={colourOptions}
        onChange={(value) => {
            setSelectedOption(value as ColourOption)
        }}
        onMenuOpen={() => {
            if (selectedOption) {
                onSelect(selectedOption || { value: "", label: "" } as ColourOption)
            }
        }}

    />
}