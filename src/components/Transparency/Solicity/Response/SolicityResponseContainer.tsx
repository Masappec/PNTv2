import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OnChangeValue } from "react-select";
import { Row } from "../../../../utils/interface";
import SolicityResponsePresenter from "./SolicityResponsePresenter";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";


interface Props {
    usecase: SolicityUseCase;
    publicusecase: PublicUseCase;
}

const SolicityResponseContainer = (props:Props) => {


    const [data, setData] = useState<ResponseSolicity>({
        id_solicitud: 0,
        text: "",
        files: [],
        attachment: [],
        category_id: 0
    })
    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [typeSolicity, setTypeSolicity] = useState<"TA" | "TC">("TA")
    const [solicity, SetSolicity] = useState({})

    const [files, SetFiles] = useState<{
        file: File | null,
        type: "table" | "file" | "url",
        error: string,
        loading: boolean,
        success: string,
        file_solicity: | null
    }[]>([])

    const [tags, SetTags] = useState<[]>([])



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
        const copyFiles = [...files]
        copyFiles[index].file = file
        SetFiles(copyFiles)
    }

    const handleSaveDataUrl = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const url = e.target.value
        console.log(url)
        const copy = [...files]
        copy[index].loading = true
        SetFiles(copy)
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

    }




    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.usecase.responseSolicity(data).then(() => {
            setSuccess("Solicitud enviada correctamente")
        }).catch((err) => {
            setError(err.message)
        })

    }


    const onRemoveFileFromPublication = (index: number) => {
        console.log(index)
    }


    return (
        <>
            <SolicityResponsePresenter
                handleSubmit={handleSubmit}
                onCancel={handleCancel}
                data={[]}
                handleSaveDataFile={handleSaveDataFile}
                files={[]}
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
                solicity={[]}
                onChangeDescription={(description) => SetSolicity({ ...solicity, description: description })}
                onChangeTitle={(title) => SetSolicity({ ...solicity, name: title })}
                onChangeEvent={(event) => SetSolicity({ ...solicity, notes: event })}
                onRemoveFileFromSolicity={onRemoveFileFromPublication}

            />
        </>
    )

}



export default SolicityResponseContainer