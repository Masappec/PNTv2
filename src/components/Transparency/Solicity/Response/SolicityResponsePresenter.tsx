import { FormEvent, useEffect, useRef } from "react";
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
import { BiDownArrowAlt } from "react-icons/bi";
import { themeTabs } from "../../../Common/Tabs/Theme";
import Alert from "../../../Common/Alert";
import { IoClose } from "react-icons/io5";


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


    return (
        <form onSubmit={props.handleSubmit}>

            {
                props.timeline?.map((response, index) => (
                    <section key={index} className={`
                    ${response.user_id != parseInt(props.solicitySaved.user_created) ?
                            ' bg-primary-200/10 p-4  mx-auto mb-4 rounded-lg border border-gray-100' 
                        : 'bg-primary-600/10  p-4 mx-auto mb-4 rounded-lg border  border-gray-100'
                        }`}>
                        <h2 className={`mb-4 
                        ${response.user_id != parseInt(props.solicitySaved.user_created) ?
                                'bg-primary-900 ' : 'bg-primary-600'
                            }
                        rounded-md  p-4 text-left text-xl font-bold text-white`}>

                            {response.user_id != parseInt(props.solicitySaved.user_created) ?
                                response.other_title :
                                response.title
                            }
                        </h2>

                        <p className='mb-4 text-slate-600'>
                            {response.text}
                        </p>
                        {
                            response.attachments.map(file => (

                                <article
                                    key={'subido' + index}
                                    className='grid w-1/4 max-w-2xl mt-5  grid-cols-[max-content,1fr] items-center gap-2 rounded-md border border-gray-300 p-2 text-sm sm:text-base'>
                                    <svg
                                        className='h-7 w-7 text-primary'
                                        xmlns='http://www.w3.org/2000/svg'
                                        height='24px'
                                        viewBox='0 -960 960 960'
                                        width='24px'
                                        fill='currentColor'
                                    ><path
                                        d='M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z'
                                    ></path>
                                    </svg>
                                    <section className='flex items-center justify-between'>
                                        <label
                                            className='inline-block text-sm font-semibold text-gray-900'
                                            data-testid='flowbite-label'>
                                            {file.description}

                                        </label>
                                        <a
                                            href={file.url_download as string}
                                            className='mx-auto flex items-center gap-2 rounded-md border border-primary-500 px-2 py-1 text-xs font-medium text-primary-500 hover:bg-primary-500 hover:text-white'>
                                            <BiDownArrowAlt />
                                            <span>Ver</span>
                                        </a>

                                    </section>
                                </article>
                            ))
                        }
                        {
                            response.files.map(file => (

                                <article
                                    key={'subido' + index}
                                    className='grid w-1/4 max-w-2xl mt-5  grid-cols-[max-content,1fr] items-center gap-2 rounded-md border border-gray-300 p-2 text-sm sm:text-base'>
                                    <svg
                                        className='h-7 w-7 text-primary'
                                        xmlns='http://www.w3.org/2000/svg'
                                        height='24px'
                                        viewBox='0 -960 960 960'
                                        width='24px'
                                        fill='currentColor'
                                    ><path
                                        d='M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z'
                                    ></path>
                                    </svg>
                                    <section className='flex items-center justify-between'>
                                        <label
                                            className='inline-block text-sm font-semibold text-gray-900'
                                            data-testid='flowbite-label'>
                                            {file.description}

                                        </label>
                                        <button
                                            onClick={() => props.onDownloadFromUrl(file.url_download as string, file.name)}
                                            className='mx-auto flex items-center gap-2 rounded-md border border-green-500 px-2 py-1 text-xs font-medium text-green-500 hover:bg-green-500 hover:text-white'>
                                            <BiDownArrowAlt />
                                            <span>Descargar</span>
                                        </button>

                                    </section>
                                </article>
                            ))
                        }

                        <p className='text-right font-medium text-slate-600'>{new Date(response.created_at).toLocaleString()}</p>
                    </section>
                ))
            }
            {
                props.isAvaliableForChangeStatus ?

                    <Button
                        onClick={() => { props.ChangeStatus() }}
                        type="button"
                        className="text-white font-bold bg-sky-800 w-[185px] h-[48px] "
                    >
                        <FiCheckSquare size={23} className=" mr-4" />
                        <span>{props.textForChangeStatus}</span>
                    </Button> : null
            }
            {
                props.isAvaliableToInsistency ?
                    <> <div className=" grid grid-cols gap-4 w-auto mt-16">
                        <Label
                            htmlFor=""
                            value={`Solicitar Insistencia. \n
                                    Si necesitas consultar alguna aclaración sobre la respuesta recibida, ingresarla a continuación`}
                            className="text-xl font-bold "
                        />
                        <Textarea
                            placeholder=""
                            className="h-[139px] xl:w-[915px]"
                            name="description"
                            onChange={(e) => { props.onChangeTextResponse(e.target.value) }}
                            ref={responseRef as React.RefObject<HTMLTextAreaElement>}
                        ></Textarea>
                    </div>


                    </> : null
            }

            {props.isAvaliableToResponse &&
                <>

                    <div className=" grid grid-cols gap-4 w-auto mt-16">
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
                                        className='flex items-center gap-2 rounded-md border border-primary bg-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
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
                        <span>Enviar</span>
                    </Button> : null

                }


            </div>
        </form>
    )

}

export default SolicityResponsePresenter