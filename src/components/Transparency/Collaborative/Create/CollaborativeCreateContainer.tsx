
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { Row } from "../../../../utils/interface";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { Pagination } from "../../../../infrastructure/Api";
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import ActiveCreatePresenter from "../../Active/Create/ActiveCreatePresenter";
import TemplateFileEntity from "../../../../domain/entities/TemplateFileEntity";
import Template from "../../../../domain/entities/Template";
import TemplateFileUseCase from "../../../../domain/useCases/TemplateFileUseCase/TemplateFileUseCase";
import TransparencyCollabUseCase from "../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase";
import { sleep } from "../../../../utils/functions";
import { TabsRef } from "flowbite-react";


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


  const tabsRef = useRef<TabsRef>(null);

  const [establishment, setEstablishment] = useState({} as EstablishmentEntity)

  const [loadingFiles, setLoadingFiles] = useState<{
    name: string,
  }[]>([])

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
    props.fileUseCase.getFilesPublications("TC", numeral.id).then((response) => {
      setFilesList(response)
    }).catch((error) => {
      setError(error.message)
    })
  }, [numeral])

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
    navigation("/admin/transparency/collaborative")
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




  const buildRowFromTemplateAnData = (templates: Template, rows: Row[][]) => {

    let template_mod = templateTable.find((template) => {
      return template.id === templates.id
    })
    if (!template_mod) {
      template_mod = {
        id: templates.id,
        data: [
          templates.columns.map((column) => {
            return {
              key: column.id.toString(),
              value: column.name,
              is_header: true,
            }
          })
        ] as Row[][]
      }
    } else {
      template_mod.data = rows

    }

    if (
      templateTable.filter((template) => {
        return template.id === templates.id
      }).length === 0
    ) {
      setTemplateTable([...templateTable, template_mod])
    } else {
      setTemplateTable(templateTable.map((template) => {
        if (template.id === templates.id) {
          return template_mod !== undefined ? template_mod : template
        }
        return template
      }))
    }



  }

  const addFileFromList = (file: FilePublicationEntity) => {

    const files = filesPublication.find((file_) => {
      return file_.description.trim() === file.description.trim()
    })

    const template = templates.find((template) => {
      return template.name.trim() === file.description.trim()
    })
    if (!template) {
      setError("No se ha encontrado el template")
      return;
    }
    const temDetail = numeral?.templates.find((template_) => {
      return template_.id === template.id
    })
    if (!temDetail) {
      setError("No se ha encontrado el template")
      return;
    }

    if (files) {
      setError("Ya existe un archivo de " + file.description)
      sleep(2000).then(() => {
        setError("")
      })
      return
    }
    setError("")
    fetch(file.url_download as string).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    }).then((file_) => {
      const blob = new Blob([file_], { type: 'text/csv;charset=utf-8' });
      props.templateUseCase.validateLocalFile(blob as File, temDetail).then((res) => {
        if (!res) {
          setError("El archivo no cumple con el formato")
          return
        }
        const columns = res.columns.map((column) => {
          return {
            key: column,
            value: column,
            is_header: true
          }
        })
        if (temDetail.verticalTemplate) {
          const rows = res.rows.map((row) => {
            return {
              key: row[0] as string,
              value: row[0] as string
            }
          })

          buildRowFromTemplateAnData(temDetail, [columns, [...rows]])
          tabsRef.current?.setActiveTab(2)
          return
        } else {
          const rows = res.rows.map((row) => {
            return row.map((value, index) => {
              return {
                key: index.toString(),
                value: value
              }
            })
          })
          buildRowFromTemplateAnData(temDetail, [columns, ...rows])
          tabsRef.current?.setActiveTab(2)
        }
      }).catch((e) => {
        setError(e.message)
      })
    }).catch((e) => {
      setError(e.message)
    })



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
        isValid: res.valid
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
    setLoadingFiles([...loadingFiles, { name: templateFile.name }])

    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })
    if (!newTemplates) return

    newTemplates.link = e.target.value

    const templateDetail = numeral?.templates.find((template) => {
      return template.id === templateFile.id
    })

    if (!templateDetail) return

    props.fileUseCase.getFromUrl(e.target.value).then((file) => {

      const file_ = new File([file], templateDetail.name + ".csv", {
        type: "text/csv;charset=utf-8;",
      });

      props.templateUseCase.validateLocalFile(
        file_ as File,
        templateDetail
      ).then((res) => {
        setLoadingFiles(loadingFiles.filter((loading) => {
          return loading.name !== templateFile.name
        }))
        setError("")

        newTemplates = {
          ...newTemplates,
          isValid: res.valid,
          file: file_
        } as TemplateFileEntity


        //reemplazar el template
        setTemplates(templates.map((template) => {
          if (template.id === newTemplates?.id) {
            return newTemplates
          }
          return template
        }))

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
        setError(e.message)
        setLoadingFiles(loadingFiles.filter((loading) => {
          return loading.name !== templateFile.name
        }))
        newTemplates = {
          ...newTemplates,
          isValid: false
        } as TemplateFileEntity
        sleep(2000).then(() => {
          setError("")
        })

      })


    }).catch((error) => {
      setLoadingFiles(loadingFiles.filter((loading) => {
        return loading.name !== templateFile.name
      }))
      setError(error.message)
      sleep(2000).then(() => {
        setError("")
      })
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
    let content;
    if (template.verticalTemplate) {
      content = props.fileUseCase.generateContentCsvVertical(data_template.data);
    } else {
      content = props.fileUseCase.generateContentCsv(data_template.data);
    }

    const a = document.createElement('a')
    a.download = name + ".csv";
    a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(content);
    a.click();


  }
  const Download = (url: string) => {



    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'archivo.csv'
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => console.error('Ocurrió un error al descargar el archivo:', error));
  }
  const onChangePage = (page: number) => {
    props.fileUseCase.getFilesPublications("TF", numeral.id, page).then((response) => {
      setFilesList(response)
    }).catch((error) => {
      setError(error.message)
    })
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
      DownloadFileFromUrl={Download}
      onChangePage={onChangePage}
      loadingFiles={loadingFiles}
      tabRef={tabsRef}
    />
  )
}
export default CollabCreateContainer