import { Tabs } from "flowbite-react";
import { FaRegSave } from "react-icons/fa";
import Dropzone from "../../../Common/Dropzone";
import { Label, TextInput } from "flowbite-react";

import DataTablePartial from "../../Partial/CreateFilePublication/DataTable";

interface Props {
  title: string;
  handleSubmit: () => void;
  onEdit: () => void;
  setData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
  success: string;
  setError: (e: string) => void;
  setSuccess: (e: string) => void;
  isDisabled: boolean;
  templates: [];
  filesPublication: [];
  onChageLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CollaborativeEditPresenter = (props: Props) => {
  return (
    <div className="container -ml-20">
      <div className="flex items-center py-2 justify-center"></div>
      <form className="flex  -top-32 ">
        <section className="container px-2 mx-auto w-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
                  Transparencia Colaborativa
                </h2>
              </div>
              <div className="flex items-center gap-x-3 mt-20"></div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {props.title}
              </p>

              <p className="mt-6 text-base text-gray-500 dark:text-gray-300 pl-96 mr-10 font-semibold ">
                Elija un método de carga
              </p>
            </div>

            <div
              className="flex items-center mt-4 +
              w-auto "
            >
              <button
                onClick={() => {}}
                type="submit"
                className="flex items-center justify-center w-2/3 h-10 px-4 text-sm tracking-wide 
                            text-white transition-colors duration-200 bg-green-300 hover:bg-gray-300 rounded-lg sm:w-auto gap-x-2 "
              >
                <FaRegSave size={25} className=" mr-2" />
                <span className="text-base"> Guardar </span>
              </button>
            </div>
          </div>

          <Tabs aria-label="Datos" className="bg-white dark:bg-gray-800">
            <Tabs.Item title="Subir Archivos">
              <div className="mb-36 mt-5 xl:grid-cols-3 grid-cols-1 grid gap-5">
                {props.templates.map((template, index) => {
                  console.log(template);
                  return (
                    <div>
                      <Dropzone
                        key={index}
                        handleChageLogo={(e) => props.onChageFile(e)}
                        id={""}
                        multiple={false}
                        type="image"
                        label={""}
                        name="logo"
                        className={"bg-red-200"}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                    </div>
                  );
                })}
              </div>
            </Tabs.Item>
            <Tabs.Item title="Agregar enlances">
              <div className="flex flex-row m-2">
                {props.templates.map((template, index) => {
                  console.log(template);
                  return (
                    <div key={index} className=" flex flex-col m-2 w-60 mt-4 ">
                      <Label htmlFor="" value="Link archivo de datos" />
                      <TextInput
                        placeholder="Ingresar link"
                        type="url"
                        onChange={(e) => props.onChageLink(e)}
                        value={""}
                      />
                    </div>
                  );
                })}
              </div>
            </Tabs.Item>
            <Tabs.Item title="Crear documentos">
              {props.templates.map((file, index) => {
                console.log(file);

                return (
                  <DataTablePartial
                    data={[]}
                    handleCancel={() => {}}
                    index={index}
                    onCancel={() => {}}
                    handleSave={(file_doc) => {
                      console.log(file_doc);
                    }}
                    onSaveTable={(data) => {
                      console.log(data);
                    }}
                    key={index}
                    isSaved={false}
                    title={""}
                  />
                );
              })}
            </Tabs.Item>
          </Tabs>
          <div className="container">
            <div className="grid grid-rows-3 grid-flow-col flex-col mt-9 text- h-96  ml-14 mr-40 gap-32"></div>
          </div>
        </section>
      </form>
    </div>
  );
};
export default CollaborativeEditPresenter;
