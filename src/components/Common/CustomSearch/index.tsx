import React from 'react';
import { components, ContainerProps, ControlProps, DropdownIndicatorProps, Options, ValueContainerProps } from 'react-select';
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

interface PropsDropdownIndicator extends DropdownIndicatorProps<ColourOption> {
    onClick: (data: Options<ColourOption>) => void
}
const DropdownIndicator = ({ onClick, ...props }: PropsDropdownIndicator) => {
    return (
        <components.DropdownIndicator {...props}


        >
            <div className=" w-fit flex justify-end h-[56px]">
                <button
                    disabled
                    type="button"
                    onClick={() => {
                        onClick(props.getValue())
                    }}
                    className="!absolute 
                  
                  
                  w-[86px] h-[56px] border-black  
                 
                  text-white bg-primary-700
                  py-5
                   hover:bg-primary-800 focus:ring-4
                   justify-center
                    focus:ring-primary-300 font-normal 
                    flex items-center
                    xl:w-[150px]
                    xl:space-x-5
                    rounded-full text-xl px-5 "
                >

                    <p className='hidden xl:flex'>
                        Buscar
                    </p>
                    <FaSearch size="20" />
                </button>
            </div>
        </components.DropdownIndicator>
    );
}

const ValueContainer = (props: ValueContainerProps<ColourOption>) => {
    return (
        <components.ValueContainer {...props}

            className="w-full border-2 border-black  rounded-full">
            {props.children}

        </components.ValueContainer>
    );
}

const Control = (props: ControlProps<ColourOption>) => {
    return (
        <components.Control {...props} className="xl:w-[730px] h-[56px] w-full md:w-full border-2 border-black  rounded-full">
            {props.children}
        </components.Control>


    );
}

interface Props {
    colourOptions: ColourOption[];
    loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
    onSelect: (value: Options<ColourOption>) => void;
}
export const CustomSearch: React.FC<Props> = ({ colourOptions, loadOptions, onSelect }) => {


    const _DropdownIndicator = (props: DropdownIndicatorProps<ColourOption>) =>
        <DropdownIndicator {...props}
            onClick={onSelect}
        />;

    return <AsyncSelect
        closeMenuOnSelect={false}
        loadOptions={loadOptions}
        cacheOptions={true}

        components={{ SelectContainer, Control, DropdownIndicator: _DropdownIndicator, ValueContainer }}
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
            control: (state) => {
                return state.isFocused ? 'border-none' : 'border-none'
            }
        }}
        options={colourOptions}
    />
}