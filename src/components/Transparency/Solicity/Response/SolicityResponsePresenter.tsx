import { FormEvent, useEffect, useRef } from "react";
import { Alert, Button, Tabs, Textarea } from 'flowbite-react';
import { Label } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
//import Select from "react-select";
import { TagEntity } from "../../../../domain/entities/TagEntity";
import { OnChangeValue } from "react-select";
import { FaFile, FaLink, FaPlusCircle, FaTrash } from "react-icons/fa";
import { ColourOption, Row } from "../../../../utils/interface";
import FileUrlPartial from "../../Partial/CreateFilePublication/FileUrl";
import { AttachmentEntity, FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { Solicity, TimeLinePresenter } from "../../../../domain/entities/Solicity";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { FaDownload } from "react-icons/fa6";
import UserEntity from "../../../../domain/entities/UserEntity";
import { FiSend } from "react-icons/fi";
import Spinner from "../../../Common/Spinner";
import FileUploadForm from "../../../Common/FileUpdaloadForm";


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
        file_solicity: FilePublicationEntity | null,
        percent: number
    }[]
    attachs: {
        data: AttachmentEntity,
        error: string,
        loading: boolean,
        success: string,
        entity: AttachmentEntity | null
    }[]

    onSaveDateUrl: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onAddDataSet: (type: "table" | "file" | "url") => void;
    onDownloadFile: (file: File) => void;

    onSaveFile: (file: File, name: string, description: string, index: number) => void
    onRemoveFile: (index: number) => void
    onSaveAttachment: (url: string, name: string, description: string, index: number) => void


    onChangeTitle: (title: string) => void
    onChangeDescription: (description: string) => void
    onChangeEvent: (event: string) => void

    onRemoveFileFromSolicity: (index: number, type: string) => void;
    solicity: CreateSolicity;
    solicitySaved: Solicity;
    entitySelected: EstablishmentEntity;
    getSelectedItems: (value: string, items: ColourOption[]) => ColourOption;
    onChangeTextResponse: (value: string) => void;
    onDownloadFromUrl: (url: string, name: string) => void;
    userSession: UserEntity;
    isAvaliableToResponse: boolean;
    isAvaliableToInsistency: boolean;
    isAvaliableToComment: boolean;
    isLoadingSend: boolean
    timeline: TimeLinePresenter[];
}
/**
 * 
 * @param props {Props} propiedades del componente
 * @returns {JSX.Element} componente
 */
const SolicityResponsePresenter = (props: Props) => {

    const responseRef = useRef<HTMLTextAreaElement>();

    useEffect(() => {
        if (props.isAvaliableToResponse) {
            //scroll to response

            responseRef.current?.scrollIntoView({ behavior: "smooth" });
            responseRef.current?.focus();
        }
    }, [props.isAvaliableToResponse])

    return (

        <div className="">

            <hr
                className="my-5 border-t-[1px] border-gray-600 dark:border-gray-950"
            />
            <form className="flex  mt-1" onSubmit={props.handleSubmit}>
                <section className="container mx-auto">


                    <div className="mt-1">
                        {
                            props.success && <Alert color="success" icon={HiInformationCircle}>
                                <span className="font-medium">Exitoso!</span> {props.success}
                            </Alert>
                        }

                        {
                            props.solicitySaved.responses?.length === 0 &&

                                props.userSession.id === props.solicitySaved.userCreated ?
                                <Alert color="warning" icon={HiInformationCircle}>
                                    <span className="font-medium">Aviso!</span> Entidad todavía no responde a esta solicitud
                                </Alert> : null
                        }

                        {
                            props.timeline.map((response, index) => {
                                return (
                                    <>

                                        <div className="flex flex-row m-2">
                                            {
                                                response.attachments.map((file, index) => {
                                                    return (
                                                        <div className="flex flex-col m-2 w-50 bg-slate-100 p-5 rounded-lg shadow-xl" key={index}>
                                                            <FaLink className=" text-primary-600" size={30} />
                                                            <span className=" text-gray-500 dark:text-gray-300">
                                                                {file.description}
                                                            </span>
                                                            <span className=" text-gray-500 text-sm dark:text-gray-300">
                                                                <FaDownload className=" text-primary-600" size={15} onClick={() => props.onDownloadFromUrl(file.url_download, file.description)} />
                                                            </span>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                        <div className=" grid grid-cols gap-4 w-auto mt-16">
                                            <Label
                                                htmlFor=""
                                                value={`${response.user_id == props.userSession.id ?
                                                    "Tu Respuesta" :
                                                    response.title

                                                    }`}
                                                className="text-xl font-bold "
                                            />
                                            <p className="text-gray-500 font-light">
                                                {"("} {new Date(response.created_at).toLocaleString()}{")"}
                                            </p>
                                            <p className="h-auto mb-5 xl:w-[915px]  text-gray-900 dark:text-gray-300">

                                                {response.text}
                                            </p>
                                        </div>
                                        {response.files.length > 0 && <h5 className="text-black font-semibold">
                                            Adjuntos:
                                        </h5>}
                                        <div className="flex flex-row m-2" key={index}>

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
                                                            <span className=" text-gray-500 text-sm dark:text-gray-300">
                                                                <FaDownload className=" text-primary-600" size={15} onClick={() => props.onDownloadFromUrl(file.url_download as string, file.name)} />
                                                            </span>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }




                    </div>
                    {
                        props.isAvaliableToInsistency || props.isAvaliableToComment ?
                            <> <div className=" grid grid-cols gap-4 w-auto mt-16">
                                <Label
                                    htmlFor=""
                                    value={
                                        props.isAvaliableToComment ?
                                            `Comentar. \n
                                        Si necesitas comentar algo sobre la respuesta recibida, ingresarla a continuación`:
                                            `Solicitar Insistencia. \n
                                    Si necesitas consultar alguna aclaración sobre la respuesta recibida, ingresarla a continuación`}
                                    className="text-xl font-bold "
                                />
                                <Textarea
                                    placeholder=""
                                    className="h-[139px] xl:w-[915px]  "
                                    name="description"
                                    onChange={(e) => { props.onChangeTextResponse(e.target.value) }}
                                    ref={responseRef as React.RefObject<HTMLTextAreaElement>}
                                ></Textarea>
                            </div>


                                <div className="flex gap-x-3 mt-14 xl:ml-96 xl:pl-52   mb-24 ">
                                    <Button
                                        type="button"
                                        color="danger"
                                        className="text-white font-bold bg-gray-500 w-[185px] h-[48px] 
                            hover:bg-gray-700 "
                                        onClick={props.onCancel}
                                    >
                                        Cancelar
                                    </Button>
                                    {props.isLoadingSend ? (
                                        <Spinner></Spinner>) : <Button
                                            type="submit"
                                            className="text-white font-bold bg-sky-800 w-[185px] h-[48px] "
                                        >
                                        <FiSend size={23} className=" mr-4" />
                                        <span>Enviar</span>
                                    </Button>

                                    }


                                </div></> : null
                    }

                    {props.isAvaliableToResponse &&
                        <>

                            <div className=" grid grid-cols gap-4 w-auto mt-16">
                                <Label
                                    htmlFor=""
                                    value={
                                        (props.userSession.id || 0) == props.solicitySaved.userCreated ?
                                            "Solicitar explicación. Si necesitas consultar alguna aclaración sobre la respuesta recibida, ingresarla a continuación" :
                                            "Escriba a continuación la respuesta para esta solicitud"}
                                    className="text-xl font-bold "
                                />
                                <Textarea
                                    placeholder="Escribe la petición"
                                    className="h-[139px] xl:w-[915px]  "
                                    name="description"
                                    id="description"
                                    onChange={(e) => { props.onChangeTextResponse(e.target.value) }}
                                    ref={responseRef as React.RefObject<HTMLTextAreaElement>}
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
                                                        <FaTrash className=" text-red-600" size={15} onClick={() => props.onRemoveFileFromSolicity(index, "file")} />
                                                    </span>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                                <div className="flex flex-row m-2">
                                    {
                                        props.attachs?.filter(x => x.entity).map((file, index) => {
                                            return (
                                                <div className="flex flex-col m-2 w-50 bg-slate-100 p-5 rounded-lg shadow-xl">
                                                    <FaLink className=" text-primary-600" size={30} />
                                                    <span className=" text-gray-500 dark:text-gray-300">
                                                        <a href={file.entity?.url_download} target="_blank" rel="noreferrer"
                                                            className=" text-primary-600">
                                                            {file.entity?.name}
                                                        </a>
                                                    </span>
                                                    <span className=" text-gray-500 text-sm dark:text-gray-300">
                                                        {file.entity?.description}
                                                    </span>
                                                    <span className="mt-5 text-gray-500 text-sm dark:text-gray-300">
                                                        <FaTrash className=" text-red-600" size={15} onClick={() => props.onRemoveFileFromSolicity(index, "url")} />
                                                    </span>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </div>
                            <h4>
                                Si desea adjuntar archivos o un enlace como parte de la respuesta, seleccione a continuación
                            </h4>
                            <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">

                                <Tabs.Item title="Subir Archivos">
                                    <div className="flex-col m-2">

                                        {
                                            props.files.map((file, index) => {
                                                if (file.type === "file") {
                                                    return (
                                                        <div className="flex flex-row  m-2">
                                                            <FileUploadForm

                                                                onSave={(
                                                                    file, name, description
                                                                ) => { props.onSaveFile(file, name, description, index) }}
                                                                isSaved={file.file_solicity !== null}
                                                                loading={file.loading}
                                                                percent={file.percent}
                                                                key={index}
                                                                onCancel={() => props.onRemoveFileFromSolicity(index, "file")}
                                                            />

                                                        </div>
                                                    )
                                                }
                                            })
                                        }


                                        <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
                                            <Button className="w-2/12 text-sm tracking-wide" color="success"
                                                onClick={() => props.onAddDataSet("file")}>
                                                <FaPlusCircle className="w-5 h-5" />
                                                <span>
                                                    Agregar Datos
                                                </span>
                                            </Button>
                                        </div>
                                    </div>

                                </Tabs.Item>
                                <Tabs.Item title="Enlace (URL)">
                                    {
                                        props.attachs.map((file, index) => {
                                            return <FileUrlPartial
                                                error={file.error}
                                                file={file.data.name as string}
                                                index={index}
                                                loading={file.loading}
                                                onDownloadFile={props.onDownloadFile}
                                                onSaveDateUrl={props.onSaveDateUrl}
                                                key={index}
                                                onSaveFile={(file, name, description) => props.onSaveAttachment(file as string, name, description, index)}
                                                onRemoveFile={(index) => props.onRemoveFileFromSolicity(index, "url")}
                                                isSaved={file.entity !== null}
                                            />

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
                    <div className="flex flex-col m-2">
                        {
                            props.error && <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Error!</span> {props.error}
                            </Alert>
                        }
                    </div>
                    <div className="flex gap-x-3 mt-14 xl:ml-96 xl:pl-52   mb-24 ">
                        {props.isAvaliableToResponse ? <Button
                            type="button"
                            color="danger"
                            className="text-white font-bold bg-gray-500 w-[185px] h-[48px] 
                            hover:bg-gray-700 "
                            onClick={props.onCancel}
                        >
                            Cancelar
                        </Button> : null}
                        {props.isAvaliableToResponse ?
                            props.isLoadingSend ? (
                                <Spinner></Spinner>) : <Button
                                    type="submit"
                                    className="text-white font-bold bg-sky-800 w-[185px] h-[48px] "
                                >
                                <FiSend size={23} className=" mr-4" />
                                <span>Enviar</span>
                            </Button> : null

                        }


                    </div>
                </section>

            </form>


        </div >
    )
}

export default SolicityResponsePresenter