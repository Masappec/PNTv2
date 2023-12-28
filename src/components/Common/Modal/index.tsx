import { useEffect, useState } from "react"


interface ModalProps {
    children?: React.ReactNode
    width?: string
    isvisible: boolean
    onClose: () => void

}
const Modal = (props:ModalProps) => {
    const [isvisible, setIsvisible] = useState(true)

    useEffect(() => {
        setIsvisible(props.isvisible)
    }, [props.isvisible])
    return (
        <div className={`fixed left-0 top-0 ${isvisible?'flex':'hidden'} h-full w-full items-center justify-center bg-black bg-opacity-50 py-10`}>

            <div className={`h-auto  ${props.width} overflow-y-auto sm:rounded-2xl bg-white`}>
                <div className="w-full">
                    <div className=" my-10 w-full mx-auto">
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal;