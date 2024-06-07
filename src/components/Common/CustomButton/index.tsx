
interface Props{
    onClick: () => void;
    text: string;
    icon: JSX.Element;

}
const CustomButton = (props: Props) => {
    return (
    <button 
    onClick={props.onClick}
    className='flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
        {
            props.icon
        }
        <span>{props.text}</span>
    </button>)
}

export default CustomButton;