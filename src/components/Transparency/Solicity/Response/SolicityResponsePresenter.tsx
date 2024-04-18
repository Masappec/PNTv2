import { FormEvent } from "react";
import Dropzone from "../../../Common/Dropzone";
import { Alert, Button, Tabs, Textarea } from 'flowbite-react';
import { Label } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
//import Select from "react-select";
import { TagEntity } from "../../../../domain/entities/TagEntity";
import { OnChangeValue } from "react-select";
import { FaFile, FaPlusCircle, FaTrash } from "react-icons/fa";
import { ColourOption, Row } from "../../../../utils/interface";
import FileUrlPartial from "../../Partial/CreateFilePublication/FileUrl";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { Solicity } from "../../../../domain/entities/Solicity";
import SolicityEditPresenter from "../Edit/SolicityEditPresesnter";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import { formart_send, format_receipt, genders, race_indentification } from "../../../../utils/options";
import EstablishmentEntity from "../../../../domain/entities/Establishment";


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
        file: File | string | null,
        type: "table" | "file" | "url",
        error: string,
        loading: boolean,
        success: string,
        file_solicity: FilePublicationEntity | null
    }[]

    onSaveDateUrl: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onAddDataSet: (type: "table" | "file" | "url") => void;
    onDownloadFile: (file: File) => void;

    onSaveFile: (file: File, name: string, description: string, index: number) => void
    onRemoveFile: (index: number) => void


    onChangeTitle: (title: string) => void
    onChangeDescription: (description: string) => void
    onChangeEvent: (event: string) => void

    onRemoveFileFromSolicity: (index: number) => void
    solicity: CreateSolicity;
    solicitySaved: Solicity;
    entitySelected: EstablishmentEntity;
    getSelectedItems: (value: string, items: ColourOption[]) => ColourOption;
    onChangeTextResponse: (value: string) => void;

}
/**
 * 
 * @param props {Props} propiedades del componente
 * @returns {JSX.Element} componente
 */
const SolicityResponsePresenter = (props: Props) => {



    return (

        <div className="container">
            <SolicityEditPresenter
                handleSubmit={props.handleSubmit}
                onCancel={props.onCancel}
                onChange={() => { }}
                key={0}
                loadOptions={() => { }}
                error={""}
                setError={() => { }}
                setSuccess={() => { }}
                success={""}
                onChangeSelectEstablishment={() => { }}
                data={props.solicity}
                race_indentification={race_indentification}
                genders={genders}
                format_receipt={format_receipt}
                format_send={formart_send}
                entitySelected={props.entitySelected}
                onChangeSelect={() => { }}
                solicitySaved={props.solicitySaved}
                getSelectedItems={props.getSelectedItems}
                isChanged={false}
                isLoadingSend={false}
                isSaved={false}
                isSend={false}

            >
                <hr
                    className="my-5 border-t-[1px] border-gray-600 dark:border-gray-950"
                />
                <form className="flex  mt-5" onSubmit={props.handleSubmit}>
                    <section className="container mx-auto">
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

                        </div>

                        <div className="mt-10">
                            {
                                props.success && <Alert color="success" icon={HiInformationCircle}>
                                    <span className="font-medium">Exitoso!</span> {props.success}
                                </Alert>
                            }



                            {
                                props.solicitySaved.responses?.map((response, index) => {
                                    return (
                                        <>

                                            {
                                                response.files.map((file, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col m-2 bg-slate-100 p-5 rounded-lg shadow-xl">
                                                            <FaFile className=" text-primary-600" size={30} />
                                                            <span className=" text-gray-500 dark:text-gray-300">
                                                                {file.name || file.description}
                                                            </span>
                                                        </div>
                                                    )

                                                })
                                            }
                                            <div className=" grid grid-cols gap-4 w-auto mt-16">
                                                <Label
                                                    htmlFor=""
                                                    value={`Respuesta ${index + 1}`}
                                                    className="text-xl font-bold "
                                                />
                                                <Textarea
                                                    placeholder="Escribe la petición"
                                                    className="h-[139px] xl:w-[915px]  "
                                                    name="description"
                                                    value={response.text}
                                                    disabled
                                                    onChange={(e) => { props.onChangeTextResponse(e.target.value) }}
                                                ></Textarea>
                                            </div>
                                        </>
                                    )
                                })
                            }



                        </div>
                        {props.solicitySaved && props.solicitySaved.responses && props.solicitySaved.responses.length < 10 &&
                            <>
                                <div className=" grid grid-cols gap-4 w-auto mt-16">
                                    <Label
                                        htmlFor=""
                                        value="Respuesta de la Entidad"
                                        className="text-xl font-bold "
                                    />
                                    <Textarea
                                        placeholder="Escribe la petición"
                                        className="h-[139px] xl:w-[915px]  "
                                        name="description"
                                        onChange={(e) => { props.onChangeTextResponse(e.target.value) }}
                                    ></Textarea>
                                </div>


                                <div className="flex flex-col m-2">
                                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                                        Archivos Adjuntos
                                    </h3>

                                    <div className="flex flex-row m-2">
                                        {
                                            props.files.filter(x => x.file_solicity).map((file, index) => {
                                                return (
                                                    <div className="flex flex-col m-2 bg-slate-100 p-5 rounded-lg shadow-xl">
                                                        <FaFile className=" text-primary-600" size={30} />
                                                        <span className=" text-gray-500 dark:text-gray-300">
                                                            {file.file_solicity?.name || file.file_solicity?.description}
                                                        </span>
                                                        <span className=" text-gray-500 text-sm dark:text-gray-300">
                                                            { }
                                                        </span>
                                                        <span className="mt-5 text-gray-500 text-sm dark:text-gray-300">
                                                            <FaTrash className=" text-red-600" size={15} onClick={() => props.onRemoveFileFromSolicity(index)} />
                                                        </span>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                </div>
                                <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">

                                    <Tabs.Item title="Subir Archivos">
                                        <div className="flex flex-row m-2">

                                            {
                                                props.files.map((file, index) => {
                                                    if (file.type === "file") {
                                                        return (
                                                            <div className="flex flex-col m-2">
                                                                <Dropzone
                                                                    handleChageLogo={(e) => props.handleSaveDataFile(e, index)}
                                                                    id={`file-${index}`}
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

                                            <div className=" items-center justify-center mt-4 gap-x-3 w-full">
                                                <Button className="w-10 h-10
                                    rounded-full
                                    text-sm tracking-wide" color="success"
                                                    onClick={() => props.onAddDataSet("file")}
                                                >
                                                    <FaPlusCircle className="w-5 h-5" />

                                                </Button>
                                            </div>
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
                                                        isSaved={file.file_solicity !== null}
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
                            </>
                        }

                    </section>
                </form>
            </SolicityEditPresenter>


        </div>
    )
}

export default SolicityResponsePresenter