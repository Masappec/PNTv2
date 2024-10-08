import React, { useState } from 'react';
import { ColourOption } from '../../../utils/interface';
import { Link } from 'react-router-dom';

interface Props {
    loadOptions: (inputValue: string, callback: (options: ColourOption[]) => void) => void;
    onSelect: (value: ColourOption) => void;
    onSearch: () => void;
}

const CustomSearch = (props: Props) => {
    const [_value, setValue] = useState<ColourOption | null>(null);
    const [suggestions, setSuggestions] = useState<ColourOption[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

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
        // Delay to allow clicking on a suggestion
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                handleSuggestionClick(suggestions[highlightedIndex]);
            }
        }
    };

    return (
        <form
            role='search'
            className='group flex rounded-full border border-gray-300 bg-white relative'
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                type='search'
                className='text-black-medium m-2 w-3/4 rounded-md border-none p-2 px-4 text-lg text-gray-800 focus:outline-none focus:ring-0'
                placeholder='Escribe nombre de la institución a consultar'
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                value={_value?.label}
            />
            {showSuggestions && (
                <div className='absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 z-10'>
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer p-2 hover:bg-gray-200 ${index === highlightedIndex ? 'bg-gray-200' : ''
                                    }`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseDown={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.label}
                            </div>
                        ))
                    ) : (
                        <div className='p-2 text-gray-600'>
                            No encontrado, ¿deseas revisar la lista de instituciones? &nbsp;
                            <Link to='/entidades' className='text-primary underline'>
                                Click aquí
                            </Link>
                        </div>
                    )}
                </div>
            )}
            <button
                type='button'
                onClick={props.onSearch}
                className='flex w-1/4 items-center justify-center gap-x-4 rounded-r-full border border-primary bg-primary px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 2xl:text-lg'
            >
                <span className='hidden sm:block'>Buscar</span>
                <svg
                    className='size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='26'
                    viewBox='0 0 26 26'
                    fill='none'
                >
                    <path
                        d='M25 25L20.3335 20.3333M23.6667 12.3333C23.6667 18.5926 18.5926 23.6667 12.3333 23.6667C6.07411 23.6667 1 18.5926 1 12.3333C1 6.07411 6.07411 1 12.3333 1C18.5926 1 23.6667 6.07411 23.6667 12.3333Z'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    ></path>
                </svg>
            </button>
        </form>
    );
};

export default CustomSearch;
