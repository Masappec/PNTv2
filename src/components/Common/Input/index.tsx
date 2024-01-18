import { Label, TextInput } from 'flowbite-react';
import  { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input: FC<InputProps> = ({...props }) => {
  return (
    <>
      
       <div>
        <div className="mb-2 block">
          <Label  value={props.placeholder} />
        </div>
        <TextInput  
          {
            ...props
          }

          className={'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-500 '+props.className}
          />
      </div>
    </>
  );
};

export default Input;