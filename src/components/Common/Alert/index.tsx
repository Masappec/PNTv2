

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

    const hover_map = {
        success: 'hover:bg-green-600',
        error: 'hover:bg-red-600',
        warning: 'hover:bg-yellow-600',
        info: 'hover:bg-blue-600'
    }

    const color_contrast = {
        success: 'bg-green-400',
        error: 'bg-red-400',
        warning: 'bg-yellow-400',
        info: 'bg-blue-500'
    }
    return (
       

        <div
          className={`my-4 flex items-center justify-between  ${type_map[type]} gap-4 rounded-md px-4 py-2 text-white`}>
          <span className='text-left text-sm'>
            {message}
          </span>
          <button
            type='button'
            onClick={onClose}
                className={`rounded-md  ${color_contrast[type]} p-2 transition-colors ${hover_map[type]}`}>
            <svg
              className='w-max'
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='currentColor'
              ><path
                d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
              ></path>
            </svg>
          </button>
        </div>
    )
}

export default Alert