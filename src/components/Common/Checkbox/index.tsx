
interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string;
    label?: string;
}

const Checkbox = ({checked, onChange, id, label}: CheckboxProps) => {

    
    return (
      <div className="flex items-center">
      <input type="checkbox" 
      id={id}
      checked={checked}
      
      onChange={(e) => onChange(e.target.checked)}
      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
      <label htmlFor={id} className="ml-2 text-gray-700">
        {label}
      </label>
    </div>
    
    )
}

export default Checkbox;