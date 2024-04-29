/*import { Button, Tabs } from "flowbite-react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Dropzone from "../../../Common/Dropzone";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { Row } from "../../../../utils/interface";
import { FormEvent } from "react";
import FileUrlPartial from "../../Partial/CreateFilePublication/FileUrl";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import Spinner from "../../../Common/Spinner";
import { LuCheck, LuX } from "react-icons/lu";
import { ListUploadsFiles } from "../../Partial/CreateFilePublication/ListUploadsFiles";
import { Pagination } from "../../../../infrastructure/Api";
import IconSearch from "../../../Common/IconSearch";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import DataTablePartial from "../../Partial/CreateFilePublication/DataTable";
import { CiSaveDown1 } from "react-icons/ci";

interface Props {

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  data: Row[][];
  handleSaveDataFile: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;

  onSaveTable: (data: Row[][], index: number) => void;
  files: {
    file: File | string | null,
    type: "table" | "file" | "url",
    error: string,
    loading: boolean,
    success: string,
    file_publication: FilePublicationEntity | null
  }[]

  onSaveDateUrl: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onAddDataSet: (type: "table" | "file" | "url") => void;
  onDownloadFile: (file: File) => void;

  onSaveFile: (file: File | string | null, name: string, description: string, index: number) => void
  onRemoveFile: (index: number) => void

  publication: TransparencyFocusEntity,

  files_uploaded_last: Pagination<FilePublicationEntity>
  onRemoveFileFromPublication: (index: number) => void
  addFileFromList: (file: FilePublicationEntity) => void
  numeralDetail: NumeralDetail
}


const FocalizedCreatePresenter = (props: Props) => {
  return (



    <div>
      <form onSubmit={props.handleSubmit} className="flex flex-col m-2">
        <div>
          <div className="flex flex-col m-2">



            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Datos de la publicación de Transparencia Focalizada
            </h3>
            <div className="flex flex-row m-2 justify-end ">
              <div className="flex items-center mt-4 gap-x-3 ">

                <Button
                  type="button"
                  onClick={props.onCancel}
                  className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-slate-400
                                 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-100">
                  <LuX className="w-5 h-5" />
                  <span>
                    Cancelar
                  </span>
                </Button>
                {
                  props.loading ? <Spinner /> : <Button
                    type="submit"

                    className="flex items-center justify-center w-1/2 text-sm tracking-wide
                                text-white transition-colors duration-200 bg-primary-500
                                 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-primary-400 ">
                    <LuCheck className="w-5 h-5" />
                    <span>
                      Crear
                    </span>
                  </Button>
                }

              </div>




            </div>
          </div>

        </div >
        <div className="flex flex-row m-2">
          {
            props.publication.files?.map((file, index) => {
              return (
                <div className="flex flex-col w-40 m-2 bg-slate-100 p-5 rounded-lg shadow-xl">
                  <IconSearch type={file.name} />
                  <span className=" text-gray-500 dark:text-gray-300">
                    {file.name}
                  </span>
                  <span className=" text-gray-500 text-sm dark:text-gray-300">
                    {file.description}
                  </span>
                  <span className="mt-5 text-gray-500 text-sm dark:text-gray-300">
                    <FaTrash className=" text-red-600" size={15} onClick={() => props.onRemoveFileFromPublication(index)} />
                  </span>
                </div>
              )

            })
          }
        </div>
        <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">
          {/*<Tabs.Item title="Crear Set de Datos" className="mb-36">
          {
            props.files.map((file, index) => {

              if (file.type === "table" && typeof file.file !== "string") {
                return (
                  <DataTablePartial
                    data={props.data}
                    handleCancel={() => props.onRemoveFile(index)}
                    index={index}
                    onCancel={() => props.onRemoveFile(index)}
                    handleSave={(file) => props.onSaveFile(file, "", "", index)}
                    file={file.file}
                    onSaveTable={(data) => props.onSaveTable(data, index)}
                    key={index}
                    isSaved={file.file_publication != null}
                  />
                )
              }
            })
          }

          <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
            <Button className="w-2/12 text-sm tracking-wide" color="success"
              onClick={() => props.onAddDataSet("table")}
            >
              <FaPlusCircle className="w-5 h-5" />
              <span>
                Agregar Datos
              </span>
            </Button>
          </div>
        </Tabs.Item>
          <Tabs.Item title="Subir Archivos">
            <div className="flex flex-row m-2">

              {
                props.files.map((file, index) => {
                  if (file.type === "file") {
                    return (
                      <div className="flex flex-col m-2">
                        <Dropzone
                          handleChageLogo={(e) => props.handleSaveDataFile(e, index)}
                          id="archivos"
                          multiple={false}
                          type="archive"
                          label="Archivos"
                          name=""
                          accept="archive/*"
                        />
                      </div>
                    )
                  }
                })
              }
            </div>
            <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
              <Button className="w-2/12 text-sm tracking-wide" color="success"
                onClick={() => props.onAddDataSet("file")}
              >
                <FaPlusCircle className="w-5 h-5" />
                <span>
                  Agregar Datos
                </span>
              </Button>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Enlace (URL)">
            {
              props.files.map((file, index) => {
                if (file.type === "url") {
                  return <FileUrlPartial
                    error={file.error}
                    file={file.file}
                    index={index}
                    loading={file.loading}
                    onDownloadFile={props.onDownloadFile}
                    onSaveDateUrl={props.onSaveDateUrl}
                    key={index}
                    onSaveFile={(file, name, description) => props.onSaveFile(file, name, description, index)}
                    onRemoveFile={(index) => props.onRemoveFile(index)}
                    isSaved={file.file_publication != null}
                  />
                }
              })
            }
            <div className="flex items-center justify-center mt-4 gap-x-3 w-full">
              <Button className="w-2/12 text-sm tracking-wide" color="success"
                onClick={() => props.onAddDataSet("url")}>
                <FaPlusCircle className="w-5 h-5" />
                <span>
                  Agregar Datos
                </span>
              </Button>
            </div>
          </Tabs.Item>

        </Tabs >
  <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">
    <Tabs.Item title="Subir Archivos" >
      <div className="mb-36 mt-5 xl:grid-cols-3 grid-cols-1 grid gap-5">
        {
          props.numeralDetail.templates.map((template, index) => {
            return (
              <div>
                <Dropzone
                  key={index}
                  handleChageLogo={(e) => { }}
                  id={template.id.toString()}
                  multiple={false}
                  type="image"
                  label={template.name}
                  name="logo"
                  className=""//{/*template.file != null ? template.isValid ? "bg-green-200" : "bg-red-200" : ""}
                  accept=".csv"
                />
                <Button key={index} type="button"
                  onClick={() => {/*props.downloadTemplate(template.id)}}
                  className="flex items-center justify-center w-12 text-sm">
                  <span className=" dark:text-gray-300 font-semibold">
                    <CiSaveDown1 className="w-5 h-5 font-normal" />
                  </span>
                </Button>
              </div>
            );
          })
        }
      </div>
    </Tabs.Item>
    <Tabs.Item title="Agregar enlances">
      <div className="flex flex-row m-2">

        {
          props.numeralDetail.templates.map((file, index) => {

            return <FileUrlPartial
              error={props.files[index].error || ""}
              file={props.files[index].file || null}
              index={index}
              loading={props.files[index].loading || false}
              onDownloadFile={props.onDownloadFile}
              onSaveDateUrl={props.onSaveDateUrl}
              key={index}
              onSaveFile={(file, name, description) => props.onSaveFile(file, name, description, index)}
              onRemoveFile={(index) => props.onRemoveFile(index)}
              isSaved={props.files[index].file_publication != null}
            />

          })
        }
      </div>
    </Tabs.Item>
    <Tabs.Item title="Crear documentos">
      {
        props.numeralDetail.templates.map((file, index) => {


          return (
            <DataTablePartial
              data={[[]]}
              handleCancel={() => { }}
              index={index}
              onCancel={() => { }}
              handleSave={(fileDoc) => {
                // props.onGenerateFileFromTable(fileDoc, file)
              }}
              file={null}
              onSaveTable={(data) => {  }}
              key={index}
              isSaved={false}
              title={file.name}
              limit={props.numeralDetail?.templates.find((e) => e.id == file.id)?.maxInserts || undefined}
            />
          )

        })
      }
    </Tabs.Item>
    <Tabs.Item title="Buscar archivos Subidos">
      <ListUploadsFiles
        currentPage={props.files_uploaded_last.current}
        files={props.files_uploaded_last.results}
        onAddFileToPublication={props.addFileFromList}
        onChangePage={() => { }}
        onDownloadFileFromUrl={() => { }}
        totalPages={props.files_uploaded_last.total_pages as number}

      />
    </Tabs.Item>
  </Tabs>
      </form >
    </div >
  )

}
export default FocalizedCreatePresenter; */