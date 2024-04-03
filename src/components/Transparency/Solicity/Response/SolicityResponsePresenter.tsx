import { FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu"
import Dropzone from "../../../Common/Dropzone";
import Spinner from "../../../Common/Spinner";
import { Alert, Button, Tabs, Textarea } from 'flowbite-react';
import { Label } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
import CreatableSelect from "react-select/creatable";
import { TagEntity } from "../../../../domain/entities/TagEntity";
import { OnChangeValue } from "react-select";
import { FaPlusCircle } from "react-icons/fa";
import { Row } from "../../../../utils/interface";
import FileUrlPartial from "../../Partial/CreateFilePublication/FileUrl";
import DataTablePartial from "../../Partial/CreateFilePublication/DataTable";


interface Props {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    data: Row[][];
    handleSaveDataFile: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    loading: boolean;
    error: string;
    success: string;
    setError: (e: string) => void;
    typeSolicity: "TA" | "TC";
    setSuccess: (e: string) => void;
    onChageTypeSolicity: (type: "TA" | "TC") => void;
    onCreateTag: (tag: string) => void;
    onFilterTag: (tag: string) => void;
    tags: TagEntity[];
    onSelectedTag: (newValue: OnChangeValue<{ label: string, value: number }, true>) => void;

    onSaveTable: (data: Row[][], index: number) => void;
    files: {
        file: File | null,
        type: "table" | "file" | "url",
        error: string,
        loading: boolean,
        success: string,
        file_olicity: | null
    }[]

    onSaveDateUrl: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onAddDataSet: (type: "table" | "file" | "url") => void;
    onDownloadFile: (file: File) => void;

    onSaveFile: (file: File, name: string, description: string, index: number) => void
    onRemoveFile: (index: number) => void

    solicity: [],

    onChangeTitle: (title: string) => void
    onChangeDescription: (description: string) => void
    onChangeEvent: (event: string) => void

    onRemoveFileFromSolicity: (index: number) => void

}
/**
 * 
 * @param props {Props} propiedades del componente
 * @returns {JSX.Element} componente
 */
const SolicityResponsePresenter = (props: Props) => {



    return (

        <div className="container">
            <div className="flex items-center py-5 justify-center">
                {
                    props.error && <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Error!</span> {props.error}
                    </Alert>
                }

            </div>
            <form className="flex  mt-5" onSubmit={props.handleSubmit}>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Responder Solicitud
                                </h2>


                            </div>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                Llena los campos
                            </p>
                        </div>
                        <div className="flex items-center mt-4 gap-x-3">

                            <Button
                                type="button"
                                onClick={props.onCancel}
                                className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <LuX className="w-5 h-5" />
                                <span>
                                    Cancelar
                                </span>
                            </Button>
                            {
                                props.loading ? <Spinner /> : <Button
                                    type="submit"
                                    className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                    <LuCheck className="w-5 h-5" />
                                    <span>
                                        Enviar
                                    </span>
                                </Button>
                            }

                        </div>
                    </div>

                    <div className="mt-10">
                        {
                            props.success && <Alert color="success" icon={HiInformationCircle}>
                                <span className="font-medium">Exitoso!</span> {props.success}
                            </Alert>
                        }


                        <div className="grid grid-cols ">

                            <div className="flex  flex-col m-2">
                                <Label htmlFor="" value="Descripción" />
                                <Textarea
                                    placeholder={"Descripción"}
                                    value={""}
                                    name="abbreviation"
                                    onChange={(e) => props.onChangeDescription(e.target.value)}
                                />
                            </div>

                            <div className=" flex  flex-col m-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="" value="Categoria" />
                                </div>
                                <CreatableSelect isClearable options={props.tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                                    isMulti={true}
                                    onInputChange={(e) => props.onFilterTag(e)}
                                    onCreateOption={(e) => props.onCreateTag(e)}
                                    onChange={(newValue) => props.onSelectedTag(newValue)}

                                />
                            </div>
                            {
                                props.typeSolicity === "TC" && (
                                    <div className="flex  flex-col m-2">
                                        <Label htmlFor="" value="Evento" />
                                        <Textarea
                                            placeholder={"Evento"}
                                            value={""}
                                            name=""
                                            onChange={(e) => props.onChangeEvent(e.target.value)}
                                        />



                                    </div>)
                            }

                        </div>


                        <div className="flex flex-col m-2">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                                Archivos Adjuntos
                            </h3>

                            <div className="flex flex-row m-2">
                                {/*
                                props.solicity?.map((file,index) => {
                                    return (
                                        <div className="flex flex-col m-2 bg-slate-100 p-5 rounded-lg shadow-xl">
                                            <FaFileCsv className=" text-green-600" size={30} />
                                            <span className=" text-gray-500 dark:text-gray-300">
                                                {file}
                                            </span>
                                            <span className=" text-gray-500 text-sm dark:text-gray-300">
                                                {}
                                            </span>
                                            <span className="mt-5 text-gray-500 text-sm dark:text-gray-300">
                                            <FaTrash className=" text-red-600" size={15} onClick={() => props.onRemoveFileFromSolicity(index)} />
                                            </span>
                                        </div>
                                    )

                                })
                            */}
                            </div>
                        </div>

                    </div>

                    <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">
                        <Tabs.Item title="Crear Set de Datos" className="mb-36">
                            {
                                props.files.map((file, index) => {

                                    if (file.type === "table") {
                                        return (
                                            <DataTablePartial
                                                data={props.data}
                                                handleCancel={() => props.onRemoveFile(index)}
                                                index={index}
                                                onCancel={() => props.onRemoveFile(index)}
                                                handleSave={(_file) => props.onSaveFile(_file, "", "", index)}
                                                file={file.file}
                                                onSaveTable={(data) => props.onSaveTable(data, index)}
                                                key={index}
                                                isSaved={file != null}
                                            />
                                        )
                                    }
                                })
                            }

                            <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
                                <Button className="w-2/12 text-sm tracking-wide" color="success"
                                    onClick={() => props.onAddDataSet("table")}
                                >
                                    <FaPlusCircle className="w-5 h-5" />
                                    <span>
                                        Agregar Datos
                                    </span>
                                </Button>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Subir Archivos">
                            <div className="flex flex-row m-2">

                                {
                                    props.files.map((file, index) => {
                                        if (file.type === "file") {
                                            return (
                                                <div className="flex flex-col m-2">
                                                    <Dropzone
                                                        handleChageLogo={(e) => props.handleSaveDataFile(e, index)}
                                                        id="archivos"
                                                        multiple={false}
                                                        type="archive"
                                                        label="Archivos"
                                                        name=""
                                                        accept="archive/*"
                                                    />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
                                <Button className="w-2/12 text-sm tracking-wide" color="success"
                                    onClick={() => props.onAddDataSet("file")}
                                >
                                    <FaPlusCircle className="w-5 h-5" />
                                    <span>
                                        Agregar Datos
                                    </span>
                                </Button>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="URL">
                            {
                                props.files.map((file, index) => {
                                    if (file.type === "url") {
                                        return <FileUrlPartial
                                            error={file.error}
                                            file={file.file}
                                            index={index}
                                            loading={file.loading}
                                            onDownloadFile={props.onDownloadFile}
                                            onSaveDateUrl={props.onSaveDateUrl}
                                            key={index}
                                            onSaveFile={(file, name, description) => props.onSaveFile(file as File, name, description, index)}
                                            onRemoveFile={(index) => props.onRemoveFile(index)}
                                            isSaved={file != null}
                                        />
                                    }
                                })
                            }
                            <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
                                <Button className="w-2/12 text-sm tracking-wide" color="success"
                                    onClick={() => props.onAddDataSet("url")}>
                                    <FaPlusCircle className="w-5 h-5" />
                                    <span>
                                        Agregar Datos
                                    </span>
                                </Button>
                            </div>
                        </Tabs.Item>
                    </Tabs>

                </section>
            </form>
        </div>
    )
}

export default SolicityResponsePresenter