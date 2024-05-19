import { ChangeEvent, useEffect, useState } from "react"
import { FaFileCsv, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5"


interface DropzoneProps {
    handleChageLogo: (e: ChangeEvent<HTMLInputElement>) => void
    accept: string;
    multiple: boolean;
    type: "image" | "pdf" | "excel" | "word" | "powerpoint" | "audio" | "video" | "text" | "archive" | "code" | "other" | "csv" | "sheet";
    id: string;
    name: string;
    label?: string;
    url?: string;
    className?: string;
    disabled?: boolean;
}

const Dropzone = (props: DropzoneProps) => {

    const [url, setUrl] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [fileSelected, setFileSelected] = useState<File | null>(null)

    useEffect(() => {
        setUrl(props.url ? props.url : "")
        setType(props.type)
    }, [props.url, props.type])

    const handleChageLogo = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files;
        console.log("file", file)
        if (!file) return
        const image = file[0]
        if (!image) return
        setType(image.type)
        if (image.type.match(/image/)) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = function () {
                setUrl(reader.result as string)

            };
        }
        setFileSelected(image)

        props.handleChageLogo(e)

    }


    const click = () => {
        if (props.disabled) return
        const input = document.getElementById(props.id)
        input?.click()
    }

    const getComponentPreview = () => {



        if (type.match(/image/)) {
            return <img src={url} alt="" className="w-full h-full object-cover" />
        }

        if (type.match(/pdf/)) {
            return <FaFilePdf className="text-9xl text-primary-700" />
        }
        if (type.match(/csv/)) {
            return <FaFileCsv className="text-9xl text-primary-700" />
        }

        if (type.match(/excel/)) {
            return <FaFileExcel className="text-9xl text-primary-700" />

        }

        if (type.match(/word/)) {
            return <FaFileWord className="text-9xl text-primary-700" />

        }

        if (type.match(/powerpoint/)) {
            return <FaFilePowerpoint className="text-9xl text-primary-700" />

        }
        if (type.match(/sheet/)) {
            return <FaFileExcel className="text-9xl text-primary-700" />

        }




    }

    return (
        <>
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <div className={`border-dashed border-slate-300 border-2 h-40 rounded flex justify-center items-center ${props.className}`} onClick={click}>

                {!props.disabled ?
                    url && url != "" ?
                        <div className="w-full h-full justify-center items-center flex">
                            {getComponentPreview()}
                            <p>
                                {
                                    type.startsWith('image') ? '' :
                                        fileSelected?.name + type}
                            </p>
                        </div>
                        : <>

                            <div className=" bg-slate-100 rounded-lg m-10 mx-2 hover:bg-amber-200 py-2 px-2">


                                <IoCloudUploadOutline size={20} className="text-4xl text-slate-700 text-center" />

                            </div>
                            <div className="flex grid-row-cols-4">
                                <a href="#" className="text-indigo-600 font-semibold hover:underline text-sm">
                                    Haga click para cargar
                                </a>
                                <span className="block text-grey"> o arrastre y suelte</span>
                            </div>
                        </>
                    : <div className="w-full h-full justify-center items-center flex">
                        <p className="text-gray-400">No permitido</p>
                    </div>

                }



                <input type="file" className="hidden" onChange={handleChageLogo} accept={props.accept} multiple={props.multiple}
                    id={props.id} name={props.name}
                />

            </div>
        </>

    )
}

export default Dropzone