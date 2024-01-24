import {  FormEvent, useState } from "react"
import PublicationCreatePresenter from "./PublicationCreatePresenter";
import { useNavigate } from "react-router-dom"
import PublicationEntity, { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import TagUseCase from "../../../../domain/useCases/TagUseCase/TagUseCase";
import { TagEntity } from "../../../../domain/entities/TagEntity";
import { OnChangeValue } from "react-select";
import { Row } from "../../../../utils/interface";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import PublicationUseCase from "../../../../domain/useCases/PublicationUseCase/PublicationUseCase";


/**
 * @interface Props
 * @summary dependencias del componente
 * @prop {TagUseCase} tagUseCase caso de uso de tag
 * @prop {FilePublicationUseCase} fileUseCase caso de uso de file
 * 
 */
interface Props {

  tagUseCase: TagUseCase,
  fileUseCase: FilePublicationUseCase;
  publicationUsecase: PublicationUseCase;

}

/**
 * 
 * @summary container de creacion de publicacion de transparencia activa y colaborativa
 * 
 * @param props {tagUseCase,fileUseCase} recibe los casos de uso de tag y file
 * @returns {PublicationCreateContainer} retorna el componente de creacion de publicacion
 */
const PublicationCreateContainer= (props:Props)=>{

    /**
     * @summary hook para la navegacion
     * @returns {function} funcion para navegar
     */
    const navigation = useNavigate()


    /**
     * @summary hook para el manejo de errores
     * @returns {string} error
     */
    const [error, setError] = useState<string>("")


    /**
     * @summary hook para el manejo de exitos
     * @returns {string} exito
     */
    const [success, setSuccess] = useState<string>("")

    /**
     * @summary hook para el manejo de cargas
     * @returns {boolean} carga
     * 
     */
    const [loading, setLoading] = useState<boolean>(false)

    /**
     * @summary hook para el manejo del tipo de publicacion
     * @returns {string} tipo de publicacion
     */
    const [typePublication, setTypePublication] = useState<"TA"|"TC">("TA")


    /**
     * @summary hook para el manejo de la publicacion
     * @returns {PublicationEntity} publicacion
     */
    const [publication,SetPublication] = useState<PublicationEntity>({})
    



    /**
     * @summary hook para el manejo de los archivos
     * @returns {{
     * file: File | null,
     * type: "table" | "file" | "url",
     * error: string,
     * loading: boolean,
     * success: string,
     * file_publication: FilePublicationEntity | null
     * }[]}
     * 
     */
    const [files,SetFiles] = useState<{
        file: File | null,
        type: "table" | "file" | "url",
        error: string,
        loading: boolean,
        success: string,
        file_publication: FilePublicationEntity | null
    }[]>([])


    /**
     * @summary hook para el manejo de los tags
     * @returns {TagEntity[]} tags
     */
    const [tags,SetTags] = useState<TagEntity[]>([])


     

    /**
     * 
     * @summary funcion para crear un tag
     * @param tag {string} tag a crear
     * @returns {void}
     */
    const onCreateTag = (tag:string) =>{

        props.tagUseCase.createNewTag(tag).then((response)=>{
            SetTags([...tags,response])
        }).catch((error)=>{
            console.log(error)
        })

    }


    /**
     * 
     * @summary funcion para filtrar los tags
     * @param tag {string} tag a filtrar
     * @returns {void}
     */

    const onFilterTag = (tag:string) =>{
        if (tag.length < 3) return
        props.tagUseCase.getTagByName(tag).then((response)=>{
            SetTags(response)
        }).catch((error)=>{
            setError(error.message)
        })
    }



    /**
     * @summary funcion para cancelar la creacion de la publicacion, redirecciona a la lista de publicaciones
     * @returns {void}
     */
    const handleCancel = () => {
        navigation("admin/transparency/create")
    }



    /**
     * @summary funcion para el manejo de la seleccion de los tags
     * 
     * @param newValue {OnChangeValue<{label:string,value:number},true>} valor seleccionado
     * @returns {void}
     */

    const onChangeTagSelection = (newValue: OnChangeValue<{label:string,value:number},true>)  => {

        SetPublication({
            ...publication,
            tag: newValue.map((tag)=>{
                return {
                    id: tag.value,
                    name: tag.label,
                    is_active: true
                }
            
            })

        })
    }


    /**
     * @summary funcion para guardar los datos de la tabla
     * @param data datos de la tabla
     * @param index indice de la tabla
     */
    const handleSaveDataTable = (data:Row[][],index:number)=>{


        const blob = props.fileUseCase.generateBlob(data);


        const file = new File([blob], "data.csv", {
            type: "text/csv;charset=utf-8;",
        });


        const copyFiles = [...files]
        copyFiles[index].file = file
        SetFiles(copyFiles)

            


    }





    /**
     * @summary funcion para guardar los datos de un archivo
     * @param e evento de cambio
     * @param index indice del archivo
     */
    const handleSaveDataFile = (e:React.ChangeEvent<HTMLInputElement>,index:number) =>{
        const file = e.target?.files?.[0] || null
        const copyFiles = [...files]
        copyFiles[index].file = file
        SetFiles(copyFiles)
    }

    /**
     * @summary funcion para guardar los datos de un archivo a partir de una url
     * @param e evento de cambio
     * @param index indice del archivo
     */
    const handleSaveDataUrl = (e:React.ChangeEvent<HTMLInputElement>,index:number) =>{
        const url = e.target.value

        const copy = [...files]
        copy[index].loading = true
        SetFiles(copy)
        props.fileUseCase.downloadFileFromUrl(url).then((file)=>{
            const copyFiles = [...files]
            copyFiles[index].loading = false
            copyFiles[index].error = ""
            const file_ = new File([file], "data.csv", {
                type: "text/csv;charset=utf-8;",
            });
            copyFiles[index].file = file_
            SetFiles(copyFiles)
        }).catch((error)=>{
            const copyFiles = [...files]

            copyFiles[index].loading = false
            copyFiles[index].error = error.message
            copyFiles[index].file = null
            SetFiles(copyFiles)
        })
    }




    /**
     * @summary funcion para descargar un archivo
     * @param file archivo a descargar
     * @returns {void}
     */
    const onDownloadFile = (file:File)=>{

        const a = document.createElement("a");
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = file.name || "data.csv";
        a.click();

        a.remove();
    }


    /**
     * @summary funcion para agregar un nuevo archivo
     * @param type tipo de archivo
     * @returns {void}
     */
    const onAddDataSet = (type:"table"|"file"|"url") =>{

        const copyFiles = [...files]
        copyFiles.push({
            file: null,
            type: type,
            error: "",
            loading: false,
            success: "",
            file_publication: null
        })
        SetFiles(copyFiles)
    }
    

    /**
     * @summary funcion para guardar un archivo enviando los datos al servidor
     * @param file Archivo a guardar
     * @param name  nombre del archivo
     * @param description  descripcion del archivo
     * @param index  indice del archivo
     * @returns  {void}
     */

    const onSaveFile = (file: File, name:string,description:string,index:number) => {


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
        const data = new FilePublicationEntity(0,name,description,file);
        props.fileUseCase.createFilePublication(data).then((response)=>{
            const copyFiles = [...files]
            copyFiles[index].file_publication = response
            SetFiles(copyFiles)
            SetPublication({
                ...publication,
                file_publication: [...publication.file_publication || [],response]
            
            })
        }).catch((error)=>{
            const copyFiles = [...files]
            copyFiles[index].error = error.message
            SetFiles(copyFiles)
        })

    }


    /**
     * @summary funcion para remover un archivo del listado no subido
     * @param index indice del archivo
     * @returns {void}
     */
    const onRemoveFile = (index: number) => {
        const copyFiles = [...files]
        copyFiles.splice(index,1)
        SetFiles(copyFiles)
    }



    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

        setLoading(true)
        console.log("publication",publication)
        if(publication.name === "" || publication.name === undefined){
            setError("El nombre es requerido")
            setLoading(false)
            return;
        }

        if(publication.description === "" || publication.description === undefined){
            setError("La descripción es requerida")
            setLoading(false)
            return;
        }
        publication.type_publication = typePublication

        if(publication.type_publication === "" || publication.type_publication === undefined){
            setError("El tipo de publicación es requerido")
            setLoading(false)
            return;
        }

        props.publicationUsecase.createPublication(publication).then(()=>{
            setSuccess("Publicación creada correctamente")
            setLoading(false)
            navigation("/admin/transparency")
        }).catch((error)=>{
            setError(error.message)
            setLoading(false)
        })
        
    }


    const onRemoveFileFromPublication = (index:number) =>{
        const copyPublication = {...publication}
        copyPublication.file_publication?.splice(index,1)
        SetPublication(copyPublication)

        const copyFiles = [...files]
        copyFiles.splice(index,1)
        SetFiles(copyFiles)
    }


    return (
        <>
        <PublicationCreatePresenter
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
            data={[]}
            handleSaveDataFile={handleSaveDataFile}
            files={files}
            error={error}
            loading={loading}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            typePublication={typePublication}
            onChageTypePublication={setTypePublication}
            onCreateTag={onCreateTag}
            onFilterTag={onFilterTag}
            tags={tags}
            onSelectedTag={onChangeTagSelection}
            onSaveTable={handleSaveDataTable}
            onAddDataSet={onAddDataSet}
            onSaveDateUrl={handleSaveDataUrl}
            onDownloadFile={onDownloadFile}
            onRemoveFile={onRemoveFile}
            onSaveFile={onSaveFile}
            publication={publication}
            onChangeDescription={(description)=>SetPublication({...publication,description:description})}
            onChangeTitle={(title)=>SetPublication({...publication,name:title})}
            onChangeEvent={(event)=>SetPublication({...publication, notes:event})}
            onRemoveFileFromPublication={onRemoveFileFromPublication}
            
        />
        </>
    )
    
}


export default PublicationCreateContainer