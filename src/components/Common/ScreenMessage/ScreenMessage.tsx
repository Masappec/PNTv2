
interface Props {
    message: string;
    type: string;
    children?: React.ReactNode;
}
const ScreenMessage = ({ message, type, children }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-3xl text-center text-gray-600">{message}</div>
            <div className="text-3xl text-center text-gray-600">{type}</div>
            {children}
        </div>
    )
}

export default ScreenMessage