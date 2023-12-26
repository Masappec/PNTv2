
interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string | number;
    label: string;
    color: "blue" | "red" | "green" | "yellow" | "pink" | "purple" | "indigo" | "gray" | "blue-gray";
}

const Checkbox = ({checked, onChange, id, label, color}: CheckboxProps) => {

    const colors = {
        "blue": "bg-blue-500",
        "red": "bg-red-500",
        "green": "bg-green-500",
        "yellow": "bg-yellow-500",
        "pink": "bg-pink-500",
        "purple": "bg-purple-500",
        "indigo": "bg-indigo-500",
        "gray": "bg-gray-500",
        "blue-gray": "bg-blue-gray-500"
    }

    const borderColors = {
        "blue": "border-blue-500",
        "red": "border-red-500",
        "green": "border-green-500",
        "yellow": "border-yellow-500",
        "pink": "border-pink-500",
        "purple": "border-purple-500",
        "indigo": "border-indigo-500",
        "gray": "border-gray-500",
        "blue-gray": "border-blue-gray-500"
    }
    return (
        <div>
    <label
      className="relative flex cursor-pointer items-center rounded-full p-3"
      htmlFor={id+""}
      data-ripple-dark="true"
    >
      <span className="text-sm text-gray-500 mr-3">{label}</span>
      <input
        type="checkbox"
        className={"before:content[''] peer relative h-5 w-5 "+
        "cursor-pointer appearance-none rounded-md border "+ 
        "border-blue-gray-200 transition-all before:absolute "+
        "before:top-2/4 before:left-2/4 before:block before:h-12 "+ 
        "before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 "+
        "before:rounded-full before:bg-blue-gray-500 before:opacity-0 "+
        "before:transition-opacity checked:"+borderColors[color]+" checked:"+ colors[color]+" "+
        "checked:before:"+colors[color]+" hover:before:opacity-10"}

        id={id+""}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
         <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </label>
  </div>
    )
}

export default Checkbox;