import { Alert, Button, Tabs } from "flowbite-react";
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
}

const ActiveCreatePresenter = (props: Props) => {
  return (
    <div className="container w-full">
      <div className="flex items-center py-2 justify-center"></div>
      <form className="flex  -top-32 " >
        <section className="container px-2 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                  Transparencia Activa
                </h2>
              </div>
              <div className="flex items-center gap-x-3 mt-20">
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

          <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">
            <Tabs.Item title="Subir Archivos" >
              <div className="mb-36 mt-5 xl:grid-cols-3 grid-cols-1 grid gap-5">
                {
                  props.templates.map((template, index) => {
                    return (
                      <div>
                        <Dropzone
                          key={index}
                          handleChageLogo={(e) => props.onChageFile(e, template)}
                          id={template.id.toString()}
                          multiple={false}
                          type="image"
                          label={template.name}
                          name="logo"
                          className={template.file != null ? template.isValid ? "bg-green-200" : "bg-red-200" : ""}
                          accept=".csv"
                        />
                        <Button key={index} type="button"
                          onClick={() => props.downloadTemplate(template.id)}
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
                  props.templates.map((template, index) => {
                    return (
                      <div key={index} className=" flex flex-col m-2 w-60 mt-4 ">
                        <Label htmlFor="" value={`Link archivo de ${template.name}`} />
                        <TextInput placeholder="Ingresar link" type="url"
                          onChange={(e) => props.onChageLink(e, template)}
                          value={template.link || ""}
                        />
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
                      isSaved={false}
                      title={file.name}
                      limit={props.numeralDetail?.templates.find((e) => e.id == file.id)?.maxInserts || undefined}
                    />
                  )

                })
              }
            </Tabs.Item>
          </Tabs>
          <div className="container">
            <div className="grid grid-rows-3 grid-flow-col flex-col mt-9 text- h-96  ml-14 mr-40 gap-32">


            </div>
          </div>

        </section>
      </form>
    </div>
  );
};

export default ActiveCreatePresenter;
