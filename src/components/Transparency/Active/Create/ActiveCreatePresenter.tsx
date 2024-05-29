import { Alert, Button, Tabs, TabsRef, Tooltip } from "flowbite-react";
import Spinner from "../../../Common/Spinner";
import { FaArrowUp } from "react-icons/fa";
import Dropzone from "../../../Common/Dropzone";
import { Label, TextInput } from "flowbite-react";
import TemplateFileEntity from "../../../../domain/entities/TemplateFileEntity";
import { FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { HiInformationCircle } from "react-icons/hi";
import DataTablePartial from "../../Partial/CreateFilePublication/DataTable";
import { Row } from "../../../../utils/interface";
import NumeralDetail from "../../../../domain/entities/NumeralDetail";
import { CiSaveDown1 } from "react-icons/ci";
import { ListUploadsFiles } from "../../Partial/CreateFilePublication/ListUploadsFiles";
import { Pagination } from "../../../../infrastructure/Api";
import IconSearch from "../../../Common/IconSearch";
import { FaTrash } from "react-icons/fa6";
import { LuX } from "react-icons/lu";



interface Props {

  title: string;
  handleSubmit: () => void;
  onEdit: () => void;
  setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChageFile: (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => void;
  onSaveTable: (data: Row[][], template: TemplateFileEntity) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  isDisabled: boolean;
  templates: TemplateFileEntity[];
  filesPublication: FilePublicationEntity[];
  onChageLink: (e: React.ChangeEvent<HTMLInputElement>, templateFile: TemplateFileEntity) => void;
  dataTable: Array<{ id: number, data: Row[][] }>;
  numeralDetail: NumeralDetail | null;
  onGenerateFileFromTable: (file: File, index: TemplateFileEntity) => void;
  downloadTemplate: (id: number) => void;
  type: string
  files_uploaded_last: Pagination<FilePublicationEntity>
  addFileFromList: (file: FilePublicationEntity) => void
  onRemoveFileFromPublication: (index: number) => void;
  onCancel: () => void;
  onChangePage: (page: number) => void;
  DownloadFileFromUrl: (url: string) => void;
  loadingFiles: { name: string }[]
  tabRef?: React.RefObject<TabsRef>;
}


const getCurrentDate = (): string => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long'
  };
  return currentDate.toLocaleDateString(undefined, options);
};
const ActiveCreatePresenter = (props: Props) => {

  const currentDate = getCurrentDate();
  return (
    <div className="container w-full">
      <div className="flex items-center py-2 justify-center"></div>
      <form className="flex  -top-32 " >
        <section className="container px-2 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                  {props.type}
                </h2>
              </div>
              <p className="text lg font-medium text-gray-800 mt-4 ">{currentDate}</p>
              <div className="flex items-center gap-x-3 mt-10">
              </div>

              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {props.title}
              </p>

              <p className="mt-6 mb-10 text-base text-gray-500 dark:text-gray-300 font-semibold ">
                Elija un método de carga
              </p>

            </div>

            <div className="flex items-center mt-4 +
                w-auto gap-x-3">
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


              {props.loading ? (
                <Spinner />
              ) : (
                <Button
                  type="button"
                  className="flex items-center justify-center w-1/2 text-sm tracking-wide
                            text-white transition-colors duration-200  bg-primary-700  rounded-lg shrink-0 sm:w-auto gap-x-2 dark:hover:bg-blue-500"
                  disabled={props.isDisabled}

                  onClick={props.handleSubmit}

                >
                  <FaArrowUp className="w-5 h-5 font-normal" />
                  <span>Cargar</span>
                </Button>
              )}
            </div>
          </div>
          {
            props.error && (
              <Alert color="failure" icon={HiInformationCircle} onDismiss={() => props.setError("")}>
                <span className="font-medium">Error!</span> {props.error}
              </Alert>
            )
          }
          {
            props.success && (
              <Alert color="success" icon={HiInformationCircle} onDismiss={() => props.setSuccess("")}>
                <span className="font-medium">Exito!</span> {props.success}
              </Alert>
            )
          }
          <div className="flex flex-row m-2">
            {
              props.filesPublication.map((file, index) => {
                return (
                  <Tooltip content={file.name} >

                    <div className="flex flex-col w-40 m-2 bg-slate-100 p-5 rounded-lg shadow-xl ">
                      <IconSearch type={file.name} />
                      <span className=" text-gray-500 dark:text-gray-300">
                        {file.name.length > 10 ? file.name.substring(0, 10) + "..." : file.name}
                      </span>
                      <span className=" text-gray-500 text-sm dark:text-gray-300 ">
                        {file.description.length > 10 ? file.description.substring(0, 10) + "..." : file.description}
                      </span>
                      <span className="mt-5 text-gray-500 text-sm dark:text-gray-300">
                        <FaTrash className="cursor-pointer text-red-600" size={15} onClick={() => props.onRemoveFileFromPublication(index)} />
                      </span>
                    </div>
                  </Tooltip>

                )

              })
            }
          </div>
          <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800"
            ref={props.tabRef}
          >
            <Tabs.Item title="Subir Archivos" >
              <div className="mt-5 xl:grid-cols-3 grid-cols-1 grid gap-5">
                {
                  props.templates.map((template, index) => {
                    return (
                      <div>
                        <Dropzone
                          key={index}
                          handleChageLogo={(e) => props.onChageFile(e, template)}
                          id={template.id.toString()}
                          multiple={false}
                          type="csv"
                          label={template.name}
                          name="logo"
                          className={template.file != null ? (template.isValid ? "bg-green-200" : "bg-red-200") : ""}
                          accept=".csv"
                          disabled={
                            props.filesPublication.find((e) => e.description.trim() === template.name.trim()) ? true : false
                          }

                        />
                        <Tooltip content={`Descargar plantilla de ${template.name}`}
                          placement="right-end"
                          className="flex items-center justify-center  text-sm"
                        >

                          <Button key={index} type="button"
                            onClick={() => props.downloadTemplate(template.id)}
                            className="flex items-center justify-center w-12 text-sm">
                            <span className=" dark:text-gray-300 font-semibold">
                              <CiSaveDown1 className="w-5 h-5 font-normal" />
                            </span>
                          </Button>
                        </Tooltip>

                      </div>
                    );
                  })
                }
              </div>
            </Tabs.Item>
            <Tabs.Item title="Agregar enlances"
            
            >
              <div className="flex flex-row m-2">

                {
                  props.templates.map((template, index) => {
                    return (
                      <div key={index} className=" flex flex-col m-2 w-60 mt-4 ">
                        <Label htmlFor="" value={`Link archivo de ${template.name}`} />
                        <TextInput placeholder="Ingresar link" type="url"
                          onChange={(e) => props.onChageLink(e, template)}
                          value={template.link || ""}
                          disabled={
                            props.filesPublication.find((e) => e.description.trim() === template.name.trim()) ? true : false
                          }
                        />
                        {
                          props.loadingFiles.find((e) => e.name === template.name) && (
                            <Spinner />
                          )
                        }
                      </div>
                    );
                  })
                }
              </div>
            </Tabs.Item>
            <Tabs.Item title="Crear documentos">
              {
                props.templates.map((file, index) => {


                  return (
                    <DataTablePartial
                      data={props.dataTable.find((e) => e.id == file.id)?.data || [[]]}
                      handleCancel={() => { }}
                      index={index}
                      onCancel={() => { }}
                      handleSave={(fileDoc) => {
                        props.onGenerateFileFromTable(fileDoc, file)
                      }}
                      file={file.file}
                      onSaveTable={(data) => { props.onSaveTable(data, file) }}
                      key={index}
                      isSaved={props.filesPublication.find((e) => e.description.trim() === file.name.trim()) ? true : false}
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
                onChangePage={props.onChangePage}
                onDownloadFileFromUrl={props.DownloadFileFromUrl}
                totalPages={props.files_uploaded_last.total_pages as number}

              />
            </Tabs.Item>
          </Tabs>

        </section>
      </form>
    </div>
  );
};

export default ActiveCreatePresenter;
