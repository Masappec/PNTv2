import { FaFile, FaFilePdf, FaImage } from "react-icons/fa6"

const IconSearch = ({ type }: { type: string }) => {
    if (type.endsWith("pdf")) {
        return <FaFilePdf className="text-primary-500" size={30} />
    }
    if (type.endsWith("png") || type.endsWith("jpg")) {
        return <FaImage className="text-primary-500" size={30} />
    }

    return <FaFile className="text-primary-500" size={30} />
}

export default IconSearch