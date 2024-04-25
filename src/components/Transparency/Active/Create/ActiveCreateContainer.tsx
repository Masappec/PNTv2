
import { useLocation, useNavigate } from "react-router-dom";
import ActiveCreatePresenter from "./ActiveCreatePresenter";
import NumeralEntity from "../../../../domain/entities/NumeralEntity";
import { useEffect, useState } from "react";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import TemplateFileUseCase from "../../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TemplateFileEntity from "../../../../domain/entities/TemplateFileEntity";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import TransparencyActiveUseCase from "../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";
import TransparencyActive from "../../../../domain/entities/TransparencyActive";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import Template from "../../../../domain/entities/Template";
import { Row } from "../../../../utils/interface";

export interface INeedProps {
  numeral: NumeralEntity,
  childs: NumeralEntity[]
}

interface IProps {
  usecase: FilePublicationUseCase;
  templateUseCase: TemplateFileUseCase;
  transparencyActiveUseCase: TransparencyActiveUseCase;
  establishmentUseCase: EstablishmentUseCase;
  numeralUsecase: NumeralUseCase;

}
const ActiveCreateContainer = (props: IProps) => {


  const location = useLocation()

  const navigate = useNavigate()

  const state = location.state as INeedProps;

  const [numeral, setNumeral] = useState<NumeralEntity>();
  const [detail, setDetail] = useState<NumeralDetail | null>(null)

  const [templates, setTemplates] = useState<TemplateFileEntity[]>([]);
  const [templateTable, setTemplateTable] = useState<Array<{ id: number, data: Row[][] }>>([]);

  const [filesPublication, setFilesPublication] = useState<FilePublicationEntity[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [establishment, setEstablishment] = useState<EstablishmentEntity>();

  useEffect(() => {
    if (state) {
      setNumeral(state.numeral)
      setTemplates(state.numeral.templates.map((template) => {
        return new TemplateFileEntity(template.id, template.file, template.name, template.isValid, template.link)
      }))

      props.numeralUsecase.getNumeralById(state.numeral.id).then((res) => {
        setDetail(res)
        buildRowFromTemplate(res.templates)

      }).catch((e) => {
        setError(e.message)
      })
    }
  }, [])


  useEffect(() => {
    props.establishmentUseCase.getByUserSession().then((res) => {
      setEstablishment(res)
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








  const handleChageLink = async (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => {
    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })
    if (!newTemplates) return

    newTemplates.link = e.target.value

    const templateDetail = detail?.templates.find((template) => {
      return template.id === templateFile.id
    })

    if (!templateDetail) return

    props.usecase.downloadFileFromUrl(e.target.value).then((file) => {

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









  const handleChanngeFile = (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => {

    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })

    if (!newTemplates) {
      setError("No se ha encontrado el template")
      return;
    }
    newTemplates.file = e.target.files?.[0] as File
    if (!detail) {
      setError("No se ha encontrado el detalle del numeral")
      return;
    }
    const templateDetail = detail.templates.find((template) => {
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
      const promise_array = filesPublication?.map((file) => {
        return props.usecase.createFilePublication(file)
      })
      Promise.all(promise_array as Promise<FilePublicationEntity>[]).then((res) => {
        res.forEach((file, index) => {
          filesPublication[index].id = file.id
        })
      }).then(() => {
        publish().then(() => {
          setLoading(false)
          setIsDisabled(false)
          setSuccess("Se ha subido correctamente la publicación")
          setTimeout(() => {
            navigate("/admin/transparency/active")
          }, 2000)
        }).catch((e) => {
          setLoading(false)
          setError(e.message)
        })
      }).catch((e) => {
        setLoading(false)
        setError(e.message)
      })
      return;
    }



    publish().then(() => {
      setLoading(false)
      setLoading(false)
      setSuccess("Se ha subido correctamente la publicación")
      setTimeout(() => {
        navigate("/admin/transparency/active")
      }, 2000)
    }).catch((e) => {
      setLoading(false)
      setError(e.message)
    })



  }

  const publish = async () => {

    if (establishment === undefined) {
      throw new Error("No se ha encontrado el establecimiento")
    }
    const newTransparency = TransparencyActive.buildForPubish(
      filesPublication,
      establishment,
      numeral?.id || 0
    )
    await props.transparencyActiveUseCase.publish(newTransparency)



  }


  const _isDisabled = () => {
    console.log(templates.filter(template => template.isValid).length == templates.length && filesPublication.length === templates.length)
    return templates.filter(template => template.isValid).length == templates.length && filesPublication.length === templates.length
  }


  const handleEdit = () => {
    navigate("/admin/active/previewdata")
  }

  const handleSaveDataTable = (data: Row[][], template: TemplateFileEntity) => {


    const blob = props.usecase.generateBlob(data);


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

    if (!detail) {
      setError("No se ha encontrado el detalle del numeral")
      return;
    }

    newTemplates.file = file
    newTemplates.isValid = true

    const templateDetail = detail?.templates.find((template) => {
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


  const downloadTemplate = (id: number) => {

    //create csv file from template
    const data_template = templateTable.find((data) => {
      return data.id === id
    })

    const name_template = templates.find((template) => {
      return template.id === id
    })?.name


    console.log(data_template, name_template)

    if (!data_template) {
      setError("No se ha encontrado el template")
      return;
    }
    if (!name_template) {
      setError("No se ha encontrado el nombre del template")
      return;
    }




    const blob = props.usecase.generateBlob(data_template.data);
    const file = new File([blob], name_template + ".csv", {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(file);


    const a_ = document.createElement("a");
    a_.setAttribute("href", url);
    a_.setAttribute("download", name_template + ".csv");
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
      numeralDetail={detail}
      onSaveTable={handleSaveDataTable}
      onGenerateFileFromTable={onSaveTable}
      downloadTemplate={downloadTemplate}
    />
  )
}
export default ActiveCreateContainer