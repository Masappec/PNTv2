import { Label, TextInput, TextInputProps } from 'flowbite-react';
import { FC } from 'react';

interface InputProps extends TextInputProps {
  width?: string;
  obligatorio?: boolean;
}

const Input: FC<InputProps> = ({ ...props }) => {
  return (
    <>

      <div>
        <div className="mb-2 block">
          <Label value={props.placeholder}
            htmlFor={props.name}
          />
          {
            props.obligatorio && <span className="text-red-500 ml-1">*</span>
          }
        </div>
        <TextInput
          {
          ...props
          }

          className={'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-500 ' + props.className}
        />
      </div>
    </>
  );
};

export default Input;