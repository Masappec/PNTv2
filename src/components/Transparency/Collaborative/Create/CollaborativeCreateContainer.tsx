
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import { Row } from "../../../../utils/interface";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { toast } from "react-toastify";
import { Pagination } from "../../../../infrastructure/Api";
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import ActiveCreatePresenter from "../../Active/Create/ActiveCreatePresenter";
import TemplateFileEntity from "../../../../domain/entities/TemplateFileEntity";
import Template from "../../../../domain/entities/Template";
import TemplateFileUseCase from "../../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TransparencyCollabUseCase from "../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";


interface Props {

  fileUseCase: FilePublicationUseCase;
  tcollabUseCase: TransparencyCollabUseCase;
  establishmentUseCase: EstablishmentUseCase;
  numeral: NumeralUseCase;
  templateUseCase: TemplateFileUseCase;

}
const CollabCreateContainer = (props: Props) => {




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
  const navigate = useNavigate()

  const [numeral, setNumeral] = useState<NumeralDetail>(new NumeralDetail(0, [], new Date(), new Date(), false, null, "", "", "", false, "", "", "", 0))
  const [templates, setTemplates] = useState<TemplateFileEntity[]>([]);
  const [templateTable, setTemplateTable] = useState<Array<{ id: number, data: Row[][] }>>([]);
  const [filesPublication, setFilesPublication] = useState<FilePublicationEntity[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

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
    props.numeral.getNumeralFocalizedOrCollab("C").then((response) => {
      setNumeral(response)
      setTemplates(response.templates.map((template) => {
        return new TemplateFileEntity(template.id, null, template.name, true, "")
      }))
      buildRowFromTemplate(response.templates)
    }).catch((error) => {
      setError(error.message)
    })

  }, [])


  useEffect(() => {
    props.fileUseCase.getFilesPublications("TC").then((response) => {
      setFilesList(response)
    }).catch((error) => {
      setError(error.message)
    })
  }, [])

  useEffect(() => {
    console.log(templates, filesPublication)
    setIsDisabled(_isDisabled())
  }, [templates, filesPublication])


  const buildRowFromTemplate = (templates: Template[]) => {
    const data: { id: number, data: Row[][] }[] = templates.map((template) => {
      return {
        id: template.id,
        data: [
          template.columns.map((column) => {
            return {
              key: column.id.toString(),
              value: column.name,
              is_header: true,
            }
          })
        ] as Row[][]
      }

    })
    console.log(data)


    setTemplateTable(data)
  }


  /**
   * @summary funcion para cancelar la creacion de la publicacion, redirecciona a la lista de publicaciones
   * @returns {void}
   */
  const handleCancel = () => {
    navigation("/admin/transparency")
  }





  const handleSaveDataTable = (data: Row[][], template: TemplateFileEntity) => {


    const blob = props.fileUseCase.generateBlob(data);


    const file = new File([blob], template.name + ".csv", {
      type: "text/csv;charset=utf-8;",
    });


    const copyFiles = templates.find((_template) => {
      return _template.id === template.id
    })

    if (!copyFiles) {
      setError("No se ha encontrado el template")
      return;
    }

    copyFiles.file = file

    setTemplates(templates.map((_template) => {
      if (_template.id === template.id) {
        return copyFiles
      }
      return _template
    }))




  }






  const addFileFromList = (file: FilePublicationEntity) => {
    const copy = files;

    if (filesPublication.length < templates.length) {

      copy.push({
        type: "file",
        error: "",
        file: file.url_download,
        file_publication: file,
        loading: false,
        success: ""
      })

      SetFiles(copy)
      setFilesPublication([...filesPublication, file])
      setPublication({
        ...publication,
        files: [...publication.files || [], file]
      })
    } else {
      setError("No se pueden agregar más archivos")
    }
  }



  const publish = () => {


    setLoading(true)

    if (filesPublication.length !== templates.length) {
      setError("No se han subido todos los archivos")
      setLoading(false)
      return
    }




    props.tcollabUseCase.createTransparencyCollab(
      establishment.id || 0,
      filesPublication
        .map((file) => file?.id || 0),
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



  const handleChanngeFile = (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => {

    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })

    if (!newTemplates) {
      setError("No se ha encontrado el template")
      return;
    }
    newTemplates.file = e.target.files?.[0] as File
    if (!numeral) {
      setError("No se ha encontrado el detalle del numeral")
      return;
    }
    const templateDetail = numeral.templates.find((template) => {
      return template.id === templateFile.id
    })
    if (!templateDetail) return



    props.templateUseCase.validateLocalFile(
      newTemplates.file as File,
      templateDetail
    ).then((res) => {

      setError("")
      newTemplates = {
        ...newTemplates,
        isValid: res
      } as TemplateFileEntity


      //reemplazar el template
      setTemplates(templates.map((template) => {
        if (template.id === newTemplates?.id) {
          return newTemplates
        }
        return template
      }))



      //reemplazar el filePublication
      const name = newTemplates.file?.name || ""

      let filePub = filesPublication.find(x => x.description == newTemplates?.name as string)
      const index = filesPublication.indexOf(filePub as FilePublicationEntity)



      if (!filePub) {
        filePub = new FilePublicationEntity(0, name, newTemplates.name, newTemplates.file as File)
        setFilesPublication([...filesPublication, filePub])
      } else {
        filePub.url_download = newTemplates.file as File
        const newFiles = [
          ...filesPublication as FilePublicationEntity[],
        ]
        newFiles[index] = filePub
        setFilesPublication(newFiles)
      }


    }).catch((e) => {
      newTemplates = {
        ...newTemplates,
        isValid: false
      } as TemplateFileEntity


      //reemplazar el template
      setTemplates(templates.map((template) => {
        if (template.id === newTemplates?.id) {
          return newTemplates
        }
        return template
      }))

      setError(e.message)
    })




  }


  const uploadFile = async () => {

    setLoading(true)
    if (!filesPublication) {
      setLoading(false)
      setError("No se han subido todos los archivos")
      return
    }

    if (!_isDisabled()) {
      setLoading(false)
      setError("No se han subido todos los archivos")
      return
    }


    if (filesPublication.filter(file => file.id !== 0).length !== templates.length) {
      const promise_array = filesPublication?.filter(x => x.id == 0).map((file) => {
        return props.fileUseCase.createFilePublication(file)
      })
      Promise.all(promise_array as Promise<FilePublicationEntity>[]).then((res) => {
        res.forEach((file, index) => {
          filesPublication[index].id = file.id
        })
      }).then(() => {
        publish()
      }).catch((e) => {
        setLoading(false)
        setError(e.message)
      })
      return;
    }



    publish()



  }

  const onRemoveFileFromPublication = (index: number) => {
    const copyFiles = [...filesPublication]
    copyFiles.splice(index, 1)
    setFilesPublication(copyFiles)
  }
  const _isDisabled = () => {
    console.log(templates.filter(template => template.isValid).length == templates.length && filesPublication.length === templates.length)
    return templates.filter(template => template.isValid).length == templates.length && filesPublication.length === templates.length
  }
  const onSaveTable = (file: File, template: TemplateFileEntity) => {

    const newTemplates = templates.find((_template) => {
      return _template.id === template.id
    })
    if (!newTemplates) {
      setError("No se ha encontrado el template")
      return;
    }

    if (!file) {
      setError("No se ha encontrado el archivo")
      return;
    }

    if (!numeral) {
      setError("No se ha encontrado el detalle del numeral")
      return;
    }

    newTemplates.file = file
    newTemplates.isValid = true

    const templateDetail = numeral?.templates.find((template) => {
      return template.id === template.id
    })

    if (!templateDetail) return

    setTemplates(templates.map((template) => {
      if (template.id === newTemplates?.id) {
        return newTemplates
      }
      return template
    }))

    let filePub = filesPublication.find(x => x.description == newTemplates?.name as string)
    const index = filesPublication.indexOf(filePub as FilePublicationEntity)



    if (!filePub) {
      filePub = new FilePublicationEntity(0, newTemplates.name, newTemplates.name, newTemplates.file as File)
      setFilesPublication([...filesPublication, filePub])
    } else {
      filePub.url_download = newTemplates.file as File
      const newFiles = [
        ...filesPublication as FilePublicationEntity[],
      ]
      newFiles[index] = filePub
      setFilesPublication(newFiles)
    }

    setSuccess("Se ha guardado correctamente el archivo")
  }

  const handleChageLink = async (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => {
    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })
    if (!newTemplates) return

    newTemplates.link = e.target.value

    const templateDetail = numeral?.templates.find((template) => {
      return template.id === templateFile.id
    })

    if (!templateDetail) return

    props.fileUseCase.downloadFileFromUrl(e.target.value).then((file) => {

      if (file instanceof Blob) {
        const file_ = new File([file], "data.csv", {
          type: "text/csv;charset=utf-8;",
        });
        props.templateUseCase.validateLocalFile(
          file_ as File,
          templateDetail
        ).then((res) => {

          setError("")
          newTemplates = {
            ...newTemplates,
            isValid: res,
            file: file_
          } as TemplateFileEntity


          //reemplazar el template
          setTemplates(templates.map((template) => {
            if (template.id === newTemplates?.id) {
              return newTemplates
            }
            return template
          }))



          //reemplazar el filePublication
          const name = newTemplates.file?.name || ""

          let filePub = filesPublication.find(x => x.description == newTemplates?.name as string)
          const index = filesPublication.indexOf(filePub as FilePublicationEntity)



          if (!filePub) {
            filePub = new FilePublicationEntity(0, name, newTemplates.name, newTemplates.file as File)
            setFilesPublication([...filesPublication, filePub])
          } else {
            filePub.url_download = newTemplates.file as File
            const newFiles = [
              ...filesPublication as FilePublicationEntity[],
            ]
            newFiles[index] = filePub
            setFilesPublication(newFiles)
          }


        }).catch((e) => {
          newTemplates = {
            ...newTemplates,
            isValid: false
          } as TemplateFileEntity


          //reemplazar el template
          setTemplates(templates.map((template) => {
            if (template.id === newTemplates?.id) {
              return newTemplates
            }
            return template
          }))

          setError(e.message)
        })

      } else if (typeof file === "string") {
        setError("No se ha podido descargar el archivo")

      }
    }).catch((error) => {
      setError(error.message)
    })


  }
  const handleEdit = () => {
    navigate("/admin/active/previewdata")
  }
  const downloadTemplate = (id: number) => {

    //create csv file from template
    const data_template = templateTable.find((data) => {
      return data.id === id
    })

    const name_template = templates.find((template) => {
      return template.id === id
    })

    const template = numeral?.templates.find((template) => {
      return template.id === id
    })


    const name = name_template?.name || ""


    console.log(data_template, name_template)

    if (!data_template) {
      setError("No se ha encontrado el template")
      return;
    }
    if (!name_template) {
      setError("No se ha encontrado el nombre del template")
      return;
    }


    if (!template) {
      setError("No se ha encontrado el template")
      return
    }
    let blob = null;
    if (template.verticalTemplate) {
      blob = props.fileUseCase.generateBlobVertical(data_template.data);
    } else {
      blob = props.fileUseCase.generateBlob(data_template.data);
    }

    const file = new File([blob], name + ".csv", {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(file);


    const a_ = document.createElement("a");
    a_.setAttribute("href", url);
    a_.setAttribute("download", name + ".csv");
    a_.setAttribute("target", "_blank");
    a_.style.display = "none";
    document.body.appendChild(a_);


    a_.click();


  }

  return (
    <ActiveCreatePresenter
      title={numeral?.description || ""}
      error={error || ""}
      handleSubmit={uploadFile}
      loading={loading}
      onChageFile={handleChanngeFile}
      onEdit={handleEdit}
      setData={() => { }}
      setError={setError}
      setSuccess={setSuccess}
      templates={templates}
      onChageLink={handleChageLink}
      success={success || ""}
      filesPublication={filesPublication || []}
      isDisabled={!isDisabled}
      dataTable={templateTable || []}
      numeralDetail={numeral}
      onSaveTable={handleSaveDataTable}
      onGenerateFileFromTable={onSaveTable}
      downloadTemplate={downloadTemplate}
      type="Transparencia Colaborativa"
      addFileFromList={addFileFromList}
      files_uploaded_last={filesList}
      onRemoveFileFromPublication={onRemoveFileFromPublication}
      onCancel={handleCancel}
    />
  )
}
export default CollabCreateContainer