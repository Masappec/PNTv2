import { Button, Label, Spinner, Textarea } from "flowbite-react"
import { FaCheckCircle, FaDownload, FaFileCsv, FaTrashAlt } from "react-icons/fa"
import Input from "../../../../Common/Input"
import { useState } from "react"


interface IFileUrlPartial {
    index: number
    file: File | null
    onSaveDateUrl: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
    onDownloadFile: (file: File) => void
    loading: boolean
    error: string | null;
    onSaveFile: (file: File, name: string, description: string, index: number) => void
    onRemoveFile: (index: number) => void
    isSaved: boolean
}

const FileUrlPartial = (props: IFileUrlPartial) => {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    return (
        <div className="flex flex-col m-2">
            {!props.isSaved &&
                <div className="flex items-center justify-between">
                    <Button className="w-1/12 text-sm tracking-wide" color="green" onClick={() => props.onSaveFile(props.file as File, name, description, props.index)}>
                        <FaCheckCircle className="w-5 h-5 text-green" />
                    </Button>
                    <Button className="w-1/12 text-sm tracking-wide" color="red" onClick={() => props.onRemoveFile(props.index)} >
                        <FaTrashAlt className="w-5 h-5 text-red-600" />
                    </Button>
                </div>
            }

            <Input type={"text"}
                placeholder="Nombre"
                name="name"
                onChange={(e) => setName(e.target.value)}
                disabled={props.isSaved}
            />
            <Label htmlFor="" value="Descripción" />
            <Textarea
                placeholder={"Descripción"}
                name="abbreviation"
                onChange={(e) => setDescription(e.target.value)}
                disabled={props.isSaved}
            />
            <Input type={"text"}
                placeholder={"URL"} width="w-60"
                name="name"
                onChange={(e) => props.onSaveDateUrl(e, props.index)}
                disabled={props.isSaved}
            />
            {
                props.file != null && (
                    <div className="flex items-center  mt-4 gap-x-3 w-full">
                        <span className=" text-gray-500 dark:text-gray-300">
                            <FaFileCsv className=" text-green-600" size={30} />
                            {props.file?.name}
                        </span>
                        <span className=" text-gray-500 text-sm dark:text-gray-300">

                            <Button className="w-10 text-xs tracking-wide" color="success" onClick={() => props.onDownloadFile(props.file as File)} >
                                <FaDownload />
                            </Button>
                            {"Descargar"}
                        </span>

                    </div>
                )
            }
            {
                props.loading && (
                    <div className="flex items-center  mt-4 gap-x-3 w-full">
                        <Spinner />
                        <span className=" text-gray-500 dark:text-gray-300">
                            {"Descargando..."}
                        </span>
                    </div>
                )
            }
            {
                props.error && (
                    <div className="flex items-center  mt-4 gap-x-3 w-full">
                        <span className=" text-red-500 dark:text-red-300">
                            {"Error: " + props.error}
                        </span>
                    </div>
                )
            }
            <hr className="my-2" />
        </div>
    )
}


export default FileUrlPartial