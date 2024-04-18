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
import { Solicity } from "../../../../domain/entities/Solicity";
import ResponseSolicity from "../../../../domain/entities/ResponseSolicity";
import { TagEntity } from "../../../../domain/entities/TagEntity";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";


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

    const [files, SetFiles] = useState<{
        file: File | string | null,
        type: "table" | "file" | "url",
        error: string,
        loading: boolean,
        success: string,
        file_solicity: FilePublicationEntity | null
    }[]>([])

    const [tags, SetTags] = useState<TagEntity[]>([])

    useEffect(() => {
        if (state) {
            setSolicityToResponse(state.data)
            const data_ = {
                number_saip: state.data.number_saip,
                city: state.data.city,
                text: state.data.text,
                first_name: state.data.first_name,
                last_name: state.data.last_name,
                email: state.data.email,
                establishment: state.data.establishment,
                address: state.data.address,
                phone: state.data.phone,
                format_receipt: state.data.format_receipt,
                format_send: state.data.format_send,
                gender: state.data.gender,
                race_identification: state.data.race_identification
            }
            getSelectedEntity(state.data.establishment)
            setData(data_)
        }

    }, [state])


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
        navigation('/transparency/solicity')
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

        const copy = [...files]
        copy[index].loading = true
        SetFiles(copy)
        props.fileUseCase.downloadFileFromUrl(url).then((file) => {

            if (file instanceof Blob) {
                const copyFiles = [...files]
                copyFiles[index].loading = false
                copyFiles[index].error = ""
                const file_ = new File([file], "data.csv", {
                    type: "text/csv;charset=utf-8;",
                });
                copyFiles[index].file = file_
                SetFiles(copyFiles)
            } else if (typeof file === "string") {
                const copyFiles = [...files]
                copyFiles[index].loading = false
                copyFiles[index].error = "El enlace no es un archivo valido, por lo que se guardará como un enlace"
                copyFiles[index].file = file
                SetFiles(copyFiles)

            }
        }).catch(() => {
            const copyFiles = [...files]
            copyFiles[index].loading = false
            copyFiles[index].error = "El enlace no es un archivo valido, por lo que se guardará como un enlace"
            copyFiles[index].file = url
            SetFiles(copyFiles)
        })

    }


    const onDownloadFile = (file: File) => {

        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = file.name || "data.csv";
        a.click();

        a.remove();
    }

    const onAddDataSet = (type: "table" | "file" | "url") => {

        const copyFiles = [...files]
        copyFiles.push({
            file: null,
            type: type,
            error: "",
            loading: false,
            success: "",
            file_solicity: null
        })
        SetFiles(copyFiles)
    }


    const onSaveFile = (file: File, name: string, description: string, index: number) => {


        if (name === "") {
            const copyFiles = [...files]
            copyFiles[index].error = "El nombre es requerido"
            SetFiles(copyFiles)
            return
        }
        if (description === "") {
            const copyFiles = [...files]
            copyFiles[index].error = "La descripción es requerida"
            SetFiles(copyFiles)
            return
        }
        if (file === null) {
            const copyFiles = [...files]
            copyFiles[index].error = "El archivo es requerido"
            SetFiles(copyFiles)
            return
        }

        const data = new FilePublicationEntity(0, name, description, file);
        if (file instanceof File) {
            props.fileUseCase.createFilePublication(data).then((response) => {
                const copyFiles = [...files]
                copyFiles[index].file = file
                copyFiles[index].file_solicity = response
                SetFiles(copyFiles)

            }).catch((error) => {
                const copyFiles = [...files]
                copyFiles[index].error = error.message
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




    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dataResponseSolicity.id_solicitud = solicityToResponse.id
        props.usecase.responseSolicity(dataResponseSolicity).then(() => {
            setSuccess("Solicitud enviada correctamente")
        }).catch((err) => {
            setError(err.message)
        })

    }


    const onRemoveFileFromPublication = (index: number) => {
        const copyFiles = [...files]
        copyFiles.splice(index, 1)
        SetFiles(copyFiles)
    }
    const getSelectedItem = (value: string, options: ColourOption[]) => {
        const item = options.find((item) => item.value === value)
        return item || {} as ColourOption
    }

    return (
        <>
            <SolicityResponsePresenter
                handleSubmit={handleSubmit}
                onCancel={handleCancel}
                data={[[]]}
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
                solicity={_data}
                solicitySaved={solicityToResponse}
                onChangeDescription={(description) => SetSolicity({ ...solicity, description: description })}
                onChangeTitle={(title) => SetSolicity({ ...solicity, name: title })}
                onChangeEvent={(event) => SetSolicity({ ...solicity, notes: event })}
                onRemoveFileFromSolicity={onRemoveFileFromPublication}
                entitySelected={entity}
                key={0}
                onChangeTextResponse={(text) => setResponseSolicity({ ...dataResponseSolicity, text: text })}
                getSelectedItems={getSelectedItem}

            />
        </>
    )

}



export default SolicityResponseContainer