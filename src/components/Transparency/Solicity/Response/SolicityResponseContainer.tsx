import { FormEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { OnChangeValue } from "react-select";
import { ColourOption, Row } from "../../../../utils/interface";
import SolicityResponsePresenter from "./SolicityResponsePresenter";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import { AttachmentEntity, FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import AttachmentUseCase from "../../../../domain/useCases/AttachmentUseCase/AttachmentUseCase";
import { Solicity, TimeLinePresenter } from "../../../../domain/entities/Solicity";
import ResponseSolicity from "../../../../domain/entities/ResponseSolicity";
import { TagEntity } from "../../../../domain/entities/TagEntity";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import { toast } from "react-toastify";
import SessionService from "../../../../infrastructure/Services/SessionService";
import UserEntity from "../../../../domain/entities/UserEntity";
import SolicityDetailContainer from "../Detail/SolicityDetailContainer";
import { AxiosProgressEvent } from "axios";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";
import SolicityOnHoldContainer from "../OnHold/SolicityOnHoldContainer";
import { StatusSolicity } from "../../../../utils/enums";


interface Props {
    usecase: SolicityUseCase;
    publicusecase: PublicUseCase;
    fileUseCase: FilePublicationUseCase;
    attachmentUsecase: AttachmentUseCase
}

const SolicityResponseContainer = (props: Props) => {


    const [dataResponseSolicity, setResponseSolicity] = useState<ResponseSolicity>({
        id_solicitud: 0,
        text: "",
        files: [],
        attachment: [],
        category_id: 0
    })
    const location = useLocation()

    const state = location.state as { data: Solicity }
    const [solicityToResponse, setSolicityToResponse] = useState<Solicity>({} as Solicity)
    const [oldStatus, setOldStatus] = useState<string>("")

    const [_data, setData] = useState<CreateSolicity>({
        number_saip: "",
        city: "",
        text: "",
        first_name: "",
        last_name: "",
        email: "",
        race_identification: "",
        gender: "",
        address: "",
        phone: "",
        format_send: "",
        format_receipt: "",
        establishment: 0
    })
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)

    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [typeSolicity, setTypeSolicity] = useState<"TA" | "TC">("TA")
    const [solicity, SetSolicity] = useState({})
    const [entity, setEntity] = useState<EstablishmentEntity>({} as EstablishmentEntity)
    const [userSession, setUserSession] = useState<UserEntity>({} as UserEntity)
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const [isAvaliableToInsistency, setIsAvaliableToInsistency] = useState<boolean>(false)
    const [isAvaliableToResponse, setIsAvaliableToResponse] = useState<boolean>(false)
    const [isAvaliableToComment,] = useState<boolean>(false)
    const [isAvaliableToProrroga, setIsAvaliableToProrroga] = useState<boolean>(false)
    const [textDescription, setTextDescription] = useState<string>("");
    const [expiry_date, setExpiryDate] = useState<Date>(new Date());
    const [files, SetFiles] = useState<{
        file: File | string | null,
        type: "table" | "file" | "url",
        error: string,
        loading: boolean,
        success: string,
        percent: number,
        file_solicity: FilePublicationEntity | null
    }[]>([])


    const [timeline, setTimeline] = useState<TimeLinePresenter[]>([])

    const [attachs, SetAttachs] = useState<{
        data: AttachmentEntity,
        error: string,
        loading: boolean,
        success: string,
        entity: AttachmentEntity | null
    }[]>([])

    const [tags, SetTags] = useState<TagEntity[]>([])
    const [IsChangeStatus,SetIsChangeStatus]=useState(false);

    useEffect(() => {

        if (state) {

            const _user = SessionService.getUserData()
            setUserSession(_user)

            const is_Est = _user.user_permissions?.find(x => x.codename === 'view_solicityresponse')
            if (is_Est) {
                props.usecase.getSolicityBiIdEstablishment(parseInt(state?.data?.id + "" || "0")).then((res) => {
                    setSolicityToResponse(res)
                    setOldStatus(res.status)
                    setTimeline(Solicity.ordernReponse(res))
                    const data_ = {
                        number_saip: res.number_saip,
                        city: res.city,
                        text: res.text,
                        first_name: res.first_name,
                        last_name: res.last_name,
                        email: res.email,
                        establishment: res.establishment,
                        address: res.address,
                        phone: res.phone,
                        format_receipt: res.format_receipt,
                        format_send: res.format_send,
                        gender: res.gender,
                        race_identification: res.race_identification
                    }
                    getSelectedEntity(res.establishment)
                    setData(data_)
                    setIsAvaliableToResponse(props.usecase.availableToResponse(_user, res))
                    getSelectedEntity(res.establishment)
                    props.usecase.getDescriptionTextStatus(res, _user.id)
                })

            } else {
                props.usecase.getSolicityById(parseInt(state?.data?.id + "" || "0")).then((res) => {
                    setTimeline(Solicity.ordernReponse(res))
                    setOldStatus(res.status)

                    const data_ = {
                        number_saip: res.number_saip,
                        city: res.city,
                        text: res.text,
                        first_name: res.first_name,
                        last_name: res.last_name,
                        email: res.email,
                        establishment: res.establishment,
                        address: res.address,
                        phone: res.phone,
                        format_receipt: res.format_receipt,
                        format_send: res.format_send,
                        gender: res.gender,
                        race_identification: res.race_identification
                    }
                    setData(data_)
                    setSolicityToResponse(res)
                    getSelectedEntity(res.establishment)
                    const DescriptionTextArea = props.usecase.getDescriptionTextStatus(res, _user.id)
                    setTextDescription(DescriptionTextArea)
                    setIsAvaliableToInsistency(props.usecase.availableToInsistency(_user, res))

                }).catch((e) => {
                    console.log(e + "error")
                    const user = SessionService.getUserData()
                    setData({
                        ..._data,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        number_saip: props.usecase.buildSaipCode().toString()
                    })
                })
            }
        }

    }, [state])

    

    useEffect(()=>{
        const _isChangeStatus = isChangeStatus()
        SetIsChangeStatus(_isChangeStatus);
    },[solicityToResponse,solicity])
    const getSelectedEntity = (id: number) => {
        const entity = _establishments.find((item) => item.id === id)
        setEntity(entity || {} as EstablishmentEntity)

    }

    const onCreateTag = (tag: string) => {
        console.log(tag)
        setLoading(true)
        SetTags([])

    }


    const onFilterTag = (tag: string) => {
        console.log(tag)
    }

    const handleCancel = () => {
        //return back
        const is_Est = userSession.user_permissions?.find(x => x.codename === 'view_solicityresponse')
        if (is_Est) {
            navigation("/admin/reports")
        } else {
            navigation("/admin/solicity")
        }
    }




    const onChangeTagSelection = (newValue: OnChangeValue<{ label: string, value: number }, true>) => {

        SetSolicity({
            ...solicity,
            tag: newValue.map((tag) => {
                return {
                    id: tag.value,
                    name: tag.label,
                    is_active: true
                }

            })

        })
    }


    const handleSaveDataTable = (data: Row[][], index: number) => {

        console.log(data)
        console.log(index)


    }

    const handleSaveDataFile = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target?.files?.[0] || null

        if (file == null) {
            return
        }
        console.log(file, index)
        onSaveFile(file, file?.name, file?.name || "", index)

    }

    const handleSaveDataUrl = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const url = e.target.value

        const copyFiles = [...attachs]
        copyFiles[index].data.url_download = url


        SetAttachs(copyFiles)


    }


    const onDownloadFile = (file: File) => {

        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = file.name || "data.csv";
        a.click();

        a.remove();
    }

    const onDownloadFromUrl = (url: string, name: string) => {
        props.fileUseCase.downloadFileFromUrl(url).then((file) => {
            if (file instanceof Blob) {
                const a = document.createElement("a");
                const url = URL.createObjectURL(file);
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();

                a.remove();
            } else if (typeof file === "string") {
                window.open(file, "_blank")
            }
        }).catch(() => {
            const a = document.createElement("a");
            a.href = url;
            a.download = name;
            a.target = "_blank"
            document.body.appendChild(a);
            a.click();
            a.remove();

        })
    }

    const onAddDataSet = (type: "table" | "file" | "url") => {
        if (type === "file") {
            const copyFiles = [...files]
            if (files.length < 3) {
                copyFiles.push({
                    file: null,
                    type: type,
                    error: "",
                    loading: false,
                    success: "",
                    file_solicity: null,
                    percent: 0
                })
                SetFiles(copyFiles)
            } else {
                setError("Solo se permiten 3 archivos")
                setTimeout(() => {
                    setError("")
                }, 3000)
            }
        }

        if (type === "url") {
            const copyFiles = [...attachs]
            copyFiles.push({
                data: new AttachmentEntity(0, "", "", ""),
                error: "",
                loading: false,
                success: "",
                entity: null
            })
            SetAttachs(copyFiles)
        }
    }


    const onUploadListener = (event: AxiosProgressEvent, index: number) => {
        const percentCompleted = Math.round((event.loaded * 100) / event.event.total)
        console.log(percentCompleted)
        const copyFiles = [...files]

        copyFiles[index].percent = percentCompleted
        SetFiles(copyFiles)

    }

    const onSaveAttachment = (url: string, name: string, description: string, index: number) => {


        const data = new AttachmentEntity(0, name, description, url)
        props.attachmentUsecase.createAttachment(data).then((response) => {
            const copyFiles = [...attachs]
            copyFiles[index].entity = response
            SetAttachs(copyFiles)

        }).catch((error) => {
            toast.error(error.message)
        })

    }

    const onSaveFile = (file: File, name: string, description: string, index: number) => {
        const copyFiles = [...files]


        if (name === "") {
            copyFiles[index].error = "El nombre es requerido"
            SetFiles(copyFiles)
            return
        }
        if (description === "") {
            copyFiles[index].error = "La descripción es requerida"
            SetFiles(copyFiles)
            return
        }
        if (file === null) {
            copyFiles[index].error = "El archivo es requerido"
            SetFiles(copyFiles)
            return
        }

        copyFiles[index].loading = true
        SetFiles(copyFiles)

        const data = new FilePublicationEntity(0, name, description, file);
        if (file instanceof File) {
            props.fileUseCase.createFilePublication(data,
                (e) => {
                    onUploadListener(e, index)
                }
            ).then((response) => {
                const copyFiles = [...files]
                copyFiles[index].file = file
                copyFiles[index].file_solicity = response
                copyFiles[index].loading = false
                SetFiles(copyFiles)

                // Agregar a `dataResponseSolicity.files`
                setResponseSolicity((prev) => {
                    const updatedFiles = [...prev.files, response.id];
                    console.log("Archivos actualizados:", updatedFiles);
                    return {
                        ...prev,
                        files: updatedFiles,    
                    };
                });

            }).catch((error) => {
                const copyFiles = [...files]
                copyFiles[index].error = error.message
                copyFiles[index].loading = false
                SetFiles(copyFiles)
            })
        } else if (typeof file === "string") {
            const data = new AttachmentEntity(0, name, description, file)
            props.attachmentUsecase.createAttachment(data).then((response) => {
                const copyFiles = [...files]
                copyFiles[index].file_solicity = response
                SetFiles(copyFiles)

            }).catch((error) => {
                const copyFiles = [...files]
                copyFiles[index].error = error.message
                SetFiles(copyFiles)
            })
        }

    }

    const files_tosend_prorroga = dataResponseSolicity.files.map((file) => {
        if (typeof file === "number") {
            return file; 
        }
        return file
    })

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const isProrroga = solicityToResponse.status === StatusSolicity.PRORROGA.key;
        const isAvailableToRespond = isProrroga ? props.usecase.isAvaliableToResponseProrroga(userSession, solicityToResponse) : true;

        if (isProrroga && !isAvailableToRespond) {
            handleProrrogaResponse();
            return;
        }

        try {
            await updateSolicityStatus();
            setTextDescription(props.usecase.getDescriptionTextStatus(solicityToResponse, userSession.id));
            setIsAvaliableToInsistency(true);
            setLoading(false);
            setSuccess("Solicitud enviada correctamente");
            setIsSaved(true);
            handleCancel();
        } catch (error: any) {
            setError(error?.message as string);
            setLoading(false);
            setIsSaved(false);
            handleCancel();
        }
    };

    const handleProrrogaResponse = async () => {
        try {
            const res = await props.usecase.changeStatus(solicityToResponse.id, dataResponseSolicity.text, files_tosend_prorroga);
            setTimeline(Solicity.ordernReponse(res));
            setIsAvaliableToResponse(props.usecase.availableToResponse(userSession, res));
            SetSolicity(res);
            setTextDescription(props.usecase.getDescriptionTextStatus(res, userSession.id));
            setIsAvaliableToInsistency(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        handleCancel();
    };

    const updateSolicityStatus = async () => {
        dataResponseSolicity.id_solicitud = solicityToResponse.id;
        dataResponseSolicity.files = files.map(file => file.file_solicity?.id || 0).filter(e => e !== 0);
        dataResponseSolicity.attachment = attachs.map(attach => attach.entity?.id || 0);

        if (!dataResponseSolicity.text) {
            setError('Ingresa tu consulta/respuesta');
            setLoading(false);
            return;
        }

        return await props.usecase.responseSolicity(dataResponseSolicity);
    };

    

    const onRemoveFileFromPublication = (index: number, type: string) => {
        if (type === "file") {
            const copyFiles = [...files]
            copyFiles.splice(index, 1)
            SetFiles(copyFiles)
        } else {
            const copyFiles = [...attachs]

            copyFiles.splice(index, 1)

            SetAttachs(copyFiles)
        }
    }
    const getSelectedItem = (value: string, options: ColourOption[]) => {
        const item = options.find((item) => item.value === value)
        return item || {} as ColourOption
    }


    const onSuccessComment = () => {
        props.usecase.getSolicityById(solicityToResponse.id).then((res) => {
            setSolicityToResponse(res)
            setTimeline(Solicity.ordernReponse(res))
            setIsAvaliableToResponse(props.usecase.availableToResponse(userSession, res))
            console.log(res)
            setIsAvaliableToInsistency(props.usecase.availableToInsistency(userSession, res))
            SetSolicity(res)
        }).catch((e) => {
            console.log(e + "error")
        })
    }


    const commentComponent = () => (
        <SolicityOnHoldContainer
            onSuccessComment={onSuccessComment}
            solicity_id={solicityToResponse.id}
            usecase={props.usecase}
        />
    )


    const isChangeStatus = () => {
        console.log(expiry_date)
        const is_Est = userSession.user_permissions?.find(x => x.codename === 'view_solicityresponse')
        if (!is_Est) {
            return props.usecase.isAvaliableChangeStaus(solicityToResponse)

        } else {
            return props.usecase.avaliableToProrroga(userSession, solicityToResponse)
        }
    }
    const textChangeStatus = () => {
        return props.usecase.getTextChangeStatus(solicityToResponse, userSession)
    }



    const changeStatus = () => {
        let new_status = '';
        const is_Est = userSession.user_permissions?.find(x => x.codename === 'view_solicityresponse');
        if (!is_Est) {
            if (solicityToResponse.status == StatusSolicity.RESPONSED.key) {
                new_status = StatusSolicity.INSISTENCY_PERIOD.key;
            } else if (solicityToResponse.status == StatusSolicity.NO_RESPONSED.key) {
                new_status = StatusSolicity.INSISTENCY_PERIOD.key;
                setIsAvaliableToInsistency(true);
            } else if (solicityToResponse.status == StatusSolicity.INSISTENCY_RESPONSED.key) {
                new_status = StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key;
            } else if (solicityToResponse.status == StatusSolicity.INSISTENCY_NO_RESPONSED.key) {
                new_status = StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key;
            }
        } else {
            if (solicityToResponse.status == StatusSolicity.SEND.key) {
                new_status = StatusSolicity.PRORROGA.key;
                setIsAvaliableToProrroga(true);
    
                // Modificar la fecha de expiración sumando 5 días
                const currentExpiryDate = new Date(solicityToResponse.expiry_date);
                const newExpiryDate = new Date(currentExpiryDate);
                newExpiryDate.setDate(currentExpiryDate.getDate() + 5);
    
                setExpiryDate(newExpiryDate); // Actualizar el estado de la fecha de expiración
                solicityToResponse.expiry_date = newExpiryDate.toISOString(); // Modificar en el objeto
            }
        }
        if (new_status == '') {
            return;
        }
        const res = {
            ...solicityToResponse,
            status: new_status,
        };
        console.log('Res', res);
        setTimeline(Solicity.ordernReponse(res));
        setIsAvaliableToResponse(props.usecase.availableToResponse(userSession, res));
        SetSolicity(res);
        setSolicityToResponse(res);
        setTextDescription(props.usecase.getDescriptionTextStatus(res, userSession.id));
    };
    
    


    const handleonChangeTextResponse = (text: string) => {
        if (text.length <= 3000) {
            setResponseSolicity({ ...dataResponseSolicity, text: text })
        }

    }

    const onCancelChangeStatus = ()=>{
       
       
        const res = {
            ...solicityToResponse,
            status: oldStatus
        }
        SetSolicity(res)
        setSolicityToResponse(res)
        setIsAvaliableToInsistency(false)
        setIsAvaliableToProrroga(false)
        
    }


    return isSaved ?
        <ScreenMessage message=""
            type="Se ha enviado tu respuesta correctamente" >
            <div className="flex flex-row items-center justify-center  gap-16 mt-8 w-full">


                <button
                    onClick={handleCancel}
                    className=" text-xl text-white font-medium hover:bg-primary-200 bg-primary-500 w-[300px]  py-2 rounded-lg shadow-xl">
                    Continuar
                </button>

            </div>
        </ScreenMessage>
        :
        <> <SolicityDetailContainer
            attachmentUsecase={props.attachmentUsecase}
            fileUseCase={props.fileUseCase}
            publicusecase={props.publicusecase}
            usecase={props.usecase}

        >
            {!userSession.group?.find(x => x.name == 'Monitoreo DPE') ?

                <SolicityResponsePresenter
                    onCancelChangeStatus={onCancelChangeStatus}
                    handleSubmit={handleSubmit}
                    onCancel={handleCancel}
                    data={[[]]}
                    commentForm={commentComponent()}
                    handleSaveDataFile={handleSaveDataFile}
                    files={files}
                    error={error}
                    loading={loading}
                    success={success}
                    setError={setError}
                    setSuccess={setSuccess}
                    typeSolicity={typeSolicity}
                    onChageTypeSolicity={setTypeSolicity}
                    onCreateTag={onCreateTag}
                    onFilterTag={onFilterTag}
                    tags={tags}
                    onSelectedTag={onChangeTagSelection}
                    onSaveTable={handleSaveDataTable}
                    onAddDataSet={onAddDataSet}
                    onSaveDateUrl={handleSaveDataUrl}
                    onDownloadFile={onDownloadFile}
                    onRemoveFile={() => { }}
                    onSaveFile={onSaveFile}
                    onSaveAttachment={onSaveAttachment}
                    solicity={_data}
                    solicitySaved={solicityToResponse}
                    onChangeDescription={(description) => SetSolicity({ ...solicity, description: description })}
                    onChangeTitle={(title) => SetSolicity({ ...solicity, name: title })}
                    onChangeEvent={(event) => SetSolicity({ ...solicity, notes: event })}
                    onRemoveFileFromSolicity={onRemoveFileFromPublication}
                    entitySelected={entity}
                    key={0}
                    onChangeTextResponse={handleonChangeTextResponse}
                    getSelectedItems={getSelectedItem}
                    onDownloadFromUrl={onDownloadFromUrl}
                    userSession={userSession}
                    isAvaliableToResponse={isAvaliableToResponse}
                    isLoadingSend={loading}
                    attachs={attachs}
                    isAvaliableToInsistency={isAvaliableToInsistency}
                    isAvaliableToProrroga={isAvaliableToProrroga}
                    timeline={timeline}
                    isAvaliableToComment={isAvaliableToComment}
                    ChangeStatus={() => { changeStatus() }}
                    isAvaliableForChangeStatus={IsChangeStatus}
                    textForChangeStatus={textChangeStatus()}
                    textForMotiveDescription={textDescription}
                /> : null
            }
        </SolicityDetailContainer >
        </>


}



export default SolicityResponseContainer