

interface AlertProps{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

const Alert = ({message, type, onClose}:AlertProps) => {


    const type_map = {
        success: 'bg-green-400',
        error: 'bg-red-400',
        warning: 'bg-yellow-400',
        info: 'bg-blue-500'
    }

    return (
        <div className={`rounded-md p-4 ${type_map[type]} m-3 text-white`}>
            <strong>{message}</strong>
            <button className="float-right" onClick={onClose}>
                <span className="text-white">x</span>
            </button>
        </div>
    )
}

export default Alert