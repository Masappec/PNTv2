import React, { useEffect, useState } from 'react';
import { ColourOption } from '../../../utils/interface';


interface Props {
    loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
    onSelect: (value: ColourOption) => void;
    onSearch: () => void;
    value?: ColourOption | null;
    NoVisibleLabel?: boolean;

}
const CustomInputSearch = (props: Props) => {
    const [_value, setValue] = useState<ColourOption | null>(null);
    const [suggestions, setSuggestions] = useState<ColourOption[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue({ value: value, label: value, color: '#00B8D9' });
        if (value.length > 0) {
            props.loadOptions(value, (options) => {
                setSuggestions(options);
                setShowSuggestions(true);
            });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }

    };

    const handleSuggestionClick = (suggestion: ColourOption) => {
        setValue(suggestion);
        setShowSuggestions(false);
        props.onSelect(suggestion);
    };

    const handleBlur = () => {
        // Es posible que desees agregar un pequeño retraso para permitir hacer clic en una sugerencia
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    return (
        <>
         
            {!props.NoVisibleLabel&& 
            <label className='text-sm font-medium text-gray-900'>Institución</label>}

            <h2 className='text-xs mb-3 text-gray-500'>Escribe el nombre de la institución a la cual deseas solicitar información.</h2>
          <div className='group relative'>
            <svg
              className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-hover:text-primary'
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 24 24'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
              ><path
                d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'
              ></path>
            </svg>
            <input
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
              type='text'
              placeholder='Escribe el nombre de la institución a consultar.'
               onChange={handleChange}
                onBlur={handleBlur}
                value={_value?.label}
              required
            />
            {showSuggestions && (
                <div className='absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-10'>
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className='cursor-pointer p-2 hover:bg-gray-200'
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseDown={() => handleSuggestionClick(suggestion)}>
                                {suggestion.label}
                            </div>
                        ))
                    ) : (
                        <div className='p-2 text-gray-600'>No hay sugerencias</div>
                    )}
                </div>
            )}
          </div>
          </>
        
    );
};

export default CustomInputSearch;
