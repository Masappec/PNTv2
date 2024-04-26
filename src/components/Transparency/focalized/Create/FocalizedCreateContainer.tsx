import { useNavigate } from "react-router-dom";
import FocalizedCreatePresenter from "./FocalizedCreatePresenter";
import { FormEvent, useEffect, useState } from "react";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import { Row } from "../../../../utils/interface";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import TransparencyFocusUseCase from "../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { toast } from "react-toastify";
import { Pagination } from "../../../../infrastructure/Api";

interface Props {

  fileUseCase: FilePublicationUseCase;
  tfocalizedUseCase: TransparencyFocusUseCase;
  establishmentUseCase: EstablishmentUseCase;
}
const FocalizedCreateContainer = (props: Props) => {



  const navigation = useNavigate()


  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [files, SetFiles] = useState<{
    file: File | string | null,
    type: "table" | "file" | "url",
    error: string,
    loading: boolean,
    success: string,
    file_publication: FilePublicationEntity | null
  }[]>([]);

  const [publication, setPublication] = useState<TransparencyFocusEntity>(new TransparencyFocusEntity(
    0, {
    id: 0,
    description: "",
    name: "",
  }, [], "", 0, 0, "", false, "", "", 0

  ));

  const [filesList, setFilesList] = useState<Pagination<FilePublicationEntity>>({
    current: 0,
    limit: 0,
    next: 0,
    previous: 0,
    results: [],
    to: 0,
    total: 0,
    from: 0,
    total_pages: 0
  })


  const [establishment, setEstablishment] = useState({} as EstablishmentEntity)


  useEffect(() => {
    props.establishmentUseCase.getByUserSession().then((response) => {
      setEstablishment(response)
    }).catch((error) => {
      setError(error.message)
    })

  }, [])


  useEffect(() => {
    props.fileUseCase.getFilesPublications("TF").then((response) => {
      setFilesList(response)
    }).catch((error) => {
      setError(error.message)
    })
  }, [])






  /**
   * @summary funcion para cancelar la creacion de la publicacion, redirecciona a la lista de publicaciones
   * @returns {void}
   */
  const handleCancel = () => {
    navigation("/admin/transparency")
  }




  /**
   * @summary funcion para guardar los datos de la tabla
   * @param data datos de la tabla
   * @param index indice de la tabla
   */
  const handleSaveDataTable = (data: Row[][], index: number) => {


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
  const handleSaveDataFile = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target?.files?.[0] || null
    if (file === null) {
      return
    }
    const copyFiles = [...files]
    copyFiles[index].file = file
    copyFiles[index].error = ""
    copyFiles[index].loading = false
    copyFiles[index].success = ""
    props.fileUseCase.createFilePublication(new FilePublicationEntity(0, file?.name || "", "", file as File)).then((response) => {
      copyFiles[index].file_publication = response
      SetFiles(copyFiles)
      setPublication({
        ...publication,
        files: [...publication.files || [], response]

      })
    }).catch((error) => {
      copyFiles[index].error = error.message
      SetFiles(copyFiles)

    })
  }

  /**
   * @summary funcion para guardar los datos de un archivo a partir de una url
   * @param e evento de cambio
   * @param index indice del archivo
   */
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
    }).catch((error) => {
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
  const onDownloadFile = (file: File) => {

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
  const onAddDataSet = (type: "table" | "file" | "url") => {

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
  const onSaveFile = (file: File | string | null, name: string, description: string, index: number): void => {



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
        copyFiles[index].file_publication = response
        SetFiles(copyFiles)
        setPublication({
          ...publication,
          files: [...publication.files || [], response]

        })
      }).catch((error) => {
        const copyFiles = [...files]
        copyFiles[index].error = error.message
        SetFiles(copyFiles)
      })
    }

  }
  const addFileFromList = (file: FilePublicationEntity) => {
    const copy = files;

    copy.push({
      type: "file",
      error: "",
      file: file.url_download,
      file_publication: file,
      loading: false,
      success: ""
    })

    SetFiles(copy)
    setPublication({
      ...publication,
      files: [...publication.files || [], file]


    })

  }

  /**
   * @summary funcion para remover un archivo del listado no subido
   * @param index indice del archivo
   * @returns {void}
   */
  const onRemoveFile = (index: number) => {
    const copyFiles = [...files]
    copyFiles.splice(index, 1)
    SetFiles(copyFiles)
  }



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    setLoading(true)





    props.tfocalizedUseCase.createTransparencyFocus(
      establishment.id || 0,
      files.map((file) => file.file_publication?.id || 0),
    ).then(() => {
      setSuccess("Publicación creada correctamente")
      setLoading(false)
      navigation("/admin/transparency/focalized")
    }).catch((error) => {
      setError(error.message)
      toast.error("Error al crear la publicación " + error.message, {
        position: "top-right"
      })
      setLoading(false)
    })

  }


  const onRemoveFileFromPublication = (index: number) => {

    const copyFiles = [...files]
    copyFiles.splice(index, 1)
    SetFiles(copyFiles)
  }

  return (
    <FocalizedCreatePresenter
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
      onSaveTable={handleSaveDataTable}
      onAddDataSet={onAddDataSet}
      onSaveDateUrl={handleSaveDataUrl}
      onDownloadFile={onDownloadFile}
      onRemoveFile={onRemoveFile}
      onSaveFile={onSaveFile}
      publication={publication}
      onRemoveFileFromPublication={onRemoveFileFromPublication}
      files_uploaded_last={filesList}
      addFileFromList={addFileFromList}
    />
  )
}
export default FocalizedCreateContainer