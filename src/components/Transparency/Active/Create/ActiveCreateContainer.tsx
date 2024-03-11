
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

export interface INeedProps {
  numeral: NumeralEntity,
  childs: NumeralEntity[]
}

interface IProps {
  usecase: FilePublicationUseCase;
  templateUseCase: TemplateFileUseCase;
  transparencyActiveUseCase: TransparencyActiveUseCase;
  establishmentUseCase: EstablishmentUseCase

}
const ActiveCreateContainer = (props: IProps) => {


  const location = useLocation()

  const navigate = useNavigate()

  const state = location.state as INeedProps;

  const [numeral, setNumeral] = useState<NumeralEntity>();

  const [templates, setTemplates] = useState<TemplateFileEntity[]>([]);

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
    }
  }, [])


  useEffect(() => {
    props.establishmentUseCase.getByUserSession().then((res) => {
      setEstablishment(res)
    })
  }, [])

  useEffect(() => {
    setIsDisabled(_isDisabled())
  }, [templates, filesPublication])


  const handleChageLink = async (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => {

    const blob = await props.usecase.downloadFileFromUrl(e.target.value)
    const file = new File([blob as BlobPart], e.target.value.split("/").pop() as string)

    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })
    if (!newTemplates) return

    newTemplates.file = file


    props.templateUseCase.validateFile(newTemplates).then((res) => {
      newTemplates = res
      setTemplates(templates.map((template) => {
        if (template.id === newTemplates?.id) {
          return newTemplates
        }
        return template
      }))
    })




  }

  const handleChanngeFile = (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => {



    let newTemplates = templates.find((template) => {
      return template.id === templateFile.id
    })


    if (!newTemplates) return


    newTemplates.file = e.target.files?.[0] as File


    props.templateUseCase.validateFile(newTemplates).then((res) => {
      newTemplates = {
        ...newTemplates,
        isValid: res.isValid
      } as TemplateFileEntity

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
    return templates.filter(template => template.isValid).length == templates.length && filesPublication.length === templates.length
  }


  const handleEdit = () => {
    navigate("/admin/active/previewdata")
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
    />
  )
}
export default ActiveCreateContainer