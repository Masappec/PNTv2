import { Modal } from "flowbite-react"
import { useEffect, useState } from "react"


interface ModalProps {
    children?: React.ReactNode
    width?: string
    isvisible: boolean
    onClose: () => void

}
const Modal_ = (props: ModalProps) => {
    const [isvisible, setIsvisible] = useState(true)

    useEffect(() => {
        setIsvisible(props.isvisible)
    }, [props.isvisible])


    if (!props.isvisible) {
        return null
    }
    return (

        <Modal show={isvisible} size="md" onClose={() => setIsvisible(false)} popup>
            <Modal.Header />
            <Modal.Body>

                {
                    props.children
                }
            </Modal.Body>
        </Modal>

    )
}

export default Modal_;