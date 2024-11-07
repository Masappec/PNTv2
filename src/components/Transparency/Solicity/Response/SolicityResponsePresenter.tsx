import React, { FormEvent, useEffect, useRef } from "react";
import { Button, Tabs, Textarea } from 'flowbite-react';
import { Label } from 'flowbite-react';
import { TagEntity } from "../../../../domain/entities/TagEntity";
import { OnChangeValue } from "react-select";
import { FaFile, FaLink, FaTrash } from "react-icons/fa";
import { ColourOption, Row } from "../../../../utils/interface";
import FileUrlPartial from "../../Partial/CreateFilePublication/FileUrl";
import { AttachmentEntity, FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { Solicity, TimeLinePresenter } from "../../../../domain/entities/Solicity";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import UserEntity from "../../../../domain/entities/UserEntity";
import { FiCheckSquare, FiSend } from "react-icons/fi";
import Spinner from "../../../Common/Spinner";
import FileUploadForm from "../../../Common/FileUpdaloadForm";
import { themeTabs } from "../../../Common/Tabs/Theme";
import Alert from "../../../Common/Alert";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { StatusSolicity } from "../../../../utils/enums";


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
    onChangeTextComment?: (value: string) => void;
    onDownloadFromUrl: (url: string, name: string) => void;
    userSession: UserEntity;
    isAvaliableToResponse: boolean;
    isAvaliableToInsistency: boolean;
    isAvaliableToComment: boolean;
    isLoadingSend: boolean
    timeline: TimeLinePresenter[];
    commentForm: React.ReactNode;

    isAvaliableForChangeStatus: boolean;
    ChangeStatus: () => void
    textForChangeStatus: string
    textForMotiveDescription: string
    onCancelChangeStatus:()=>void
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
    }, [props.isAvaliableToResponse, props.isAvaliableToInsistency, props.isAvaliableToComment])


    const [count, setCount] = React.useState(0);

    return (
        <section className={`mx-auto mb-4 space-y-4 rounded-lg border border-gray-100 ${props.solicitySaved.status == StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key ? "bg-yellow-200" : "bg-primary/10"} p-4`}>
            <form onSubmit={props.handleSubmit}>


                

                {props.isAvaliableToResponse &&
                    <>

                        <div>
                            <Label
                                htmlFor=""
                                value={
                                    (props.userSession.id || 0) == props.solicitySaved.userCreated ?
                                        "Si necesitas consultar alguna aclaración \n sobre la respuesta recibida, ingresarla a continuación" :
                                        "Escriba a continuación la respuesta para esta solicitud"}
                                className="text-xl font-bold flex-wrap"
                            />
                            <Textarea
                                placeholder={
                                    (props.userSession.id || 0) == props.solicitySaved.userCreated ?
                                        "Solicitar explicación. Si necesitas consultar alguna aclaración sobre la respuesta recibida, ingresarla a continuación" :
                                        "Escriba a continuación la respuesta para esta solicitud"
                                }
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
                        <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800"
                            theme={themeTabs}
                            style="underline"

                        >

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
                                        <button
                                            type="button"
                                            onClick={() => props.onAddDataSet("file")}
                                            className='flex items-center gap-2 rounded-md border 
                                        border-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                height='24px'
                                                viewBox='0 -960 960 960'
                                                width='24px'
                                                fill='currentColor'
                                            ><path
                                                d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                                            ></path>
                                            </svg>
                                            <span>Agregar adjunto</span>
                                        </button>
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
                                    <button
                                        type="button"
                                        onClick={() => props.onAddDataSet("url")}
                                        className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='24px'
                                            viewBox='0 -960 960 960'
                                            width='24px'
                                            fill='currentColor'
                                        ><path
                                            d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                                        ></path>
                                        </svg>
                                        <span>Agregar adjunto</span>
                                    </button>
                                </div>
                            </Tabs.Item>
                        </Tabs>
                    </>
                }
                {
                    props.isAvaliableForChangeStatus ?
                        <><p className="text-gray-800 dark:text-white text-xs py-5">
                            {
                                props.solicitySaved.status == StatusSolicity.INSISTENCY_NO_RESPONSED.key ?
                                    `Escribe a continuación la explicación por la cual solicitas la Gestión Oficiosa a la Defensoría del Pueblo con relación a esta solicitud. De acuerdo a lo establecido en la LOTAIP, la entidad tiene un plazo de 10 días para responder una Gestión Oficiosa y a su vez a la solicitud original. Si deseas conocer más sobre este proceso revisa la sección`
                                    :
                                    `De acuerdo a lo establecido en la LOTAIP, si transcurridos 10  días no recibes respuesta,
                            a partir del día 11 puedes insistir con esta solicitud, para lo cual puedes presionar
                            el botón a continuación y completar la información indicada.
                            Si deseas conocer más sobre este proceso revisa la sección`

                            }


                            <Link
                                className="text-primary-600"
                                to="/normativa">“¿Deben las entidades responder mis solicitudes?”</Link>
                        </p>
                            <Button
                                onClick={() => { props.ChangeStatus() }}
                                type="button"
                                className="text-white h-10 font-bold bg-sky-800 w-auto "
                            >
                                <FiCheckSquare size={23} className=" mr-4" />
                                <span>{props.textForChangeStatus}</span>
                            </Button> </> : null
                }
                {
                    props.isAvaliableToInsistency ?
                        <>


                            <div>
                                <Label
                                    htmlFor=""
                                    value={props.textForMotiveDescription}
                                    className="text-sm "
                                />
                                <Link
                                    className="text-primary-600"
                                    to="/normativa">“¿Deben las entidades responder mis solicitudes?”</Link>
                                <Textarea
                                    placeholder={props.solicitySaved.status !== StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key ?
                                        "Escribe la explicación por la que solicitas la insistencia" :
                                        "Escribe la explicación por la que solicitas la Gestión Oficiosa"}
                                    name="description"
                                    rows={5}
                                    onChange={(e) => {
                                        setCount(e.target.value.length)
                                        props.onChangeTextResponse(e.target.value)
                                    }}
                                    ref={responseRef as React.RefObject<HTMLTextAreaElement>}
                                ></Textarea>
                                <span>
                                    {count} / 3000
                                </span>
                                <Button
                                    type="button"
                                    color="danger"
                                    className="text-white font-bold bg-gray-500 hover:bg-gray-700 "
                                    onClick={props.onCancelChangeStatus}
                                >
                                    <IoClose size={23} className=" mr-2" />
                                    Cancelar
                                </Button>
                            </div>


                        </> : null
                }
                <div className="flex flex-col m-2">
                    {
                        props.error && <Alert message={props.error}
                            onClose={() => props.setError('')}
                            type="error"
                        >
                        </Alert>
                    }
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        type="button"
                        color="danger"
                        className="text-white font-bold bg-gray-500 
                            
                            hover:bg-gray-700 "
                        onClick={props.onCancel}
                    >
                        <IoClose size={23} className=" mr-2" />
                        Regresar
                    </Button>
                    {props.isAvaliableToResponse || props.isAvaliableToInsistency ?
                        props.isLoadingSend ? (
                            <Spinner></Spinner>) : <Button
                                type="submit"
                                className="text-white font-bold bg-sky-800  "
                            >
                            <FiSend size={23} className=" mr-4" />
                            <span>
                                {
                                    props.isAvaliableToResponse ?
                                        "Enviar" :
                                        props.solicitySaved.status == StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key ?

                                            "Enviar solicitud de Gestión Oficiosa" : "Enviar solicitud de Insistencia"
                                }
                            </span>
                        </Button> : null

                    }


                </div>
            </form>
        </section>
    )

}

export default SolicityResponsePresenter