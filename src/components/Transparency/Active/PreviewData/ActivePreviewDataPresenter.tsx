import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import Select from "../../../Common/Select";
import { RiCalendarLine } from "react-icons/ri";
import TablePreview from "../../../Common/TablePreview";

import { IoCloudUploadOutline } from "react-icons/io5";
import { GrFormEdit } from "react-icons/gr";


interface Props {


  error: string | null
  onSearch: (search: string) => void
  onAdd: () => void
  onImport: () => void
  onFilter: () => void
  search: string
  setSeach: (search: string) => void
  page: number
  setPage: (page: number) => void
  setVisibleModal: (visible: boolean) => void
  visibleModal: boolean
  onConfirmDelete: () => void
  onEdit: () => void
  onPrevious?: () => void;
  onNext?: () => void;

  onDelete: () => void
  currentPage: number
  onPageChange: (value: number) => void


}

const ActivePreviewDataPresenter = (props: Props) => {



  return (
    <div>
      <div className="border-gray-300 py-5 border-b  ">
        <h2 className="text-2xl font-semibold text-black ml-11">
          Transparencia activa - numeral 1{" "}
        </h2>
      </div>

      <div className="ml-11 mt-24">
        <h2 className="text-lg text-black font-bold  mb-10">
          Base legal que la rige
        </h2>
      </div>
      <div className="pl-24 ">

        <div className="mr-52 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-5 flex-shrink-0">



          <input
            value={searchInput}
            id="buscar"
            type="text"
            placeholder="Buscar por datos"
            className="w-[190px] mr-[px]  border-black text-center   "
            tabIndex={7}
            

          />


          <Datepicker icon={RiCalendarLine} type="text" value={"Filtro de Fecha"} className="w-[169px] h-[40px]   " />

          <div className="pl-48"></div>
          <Button
            type="button"
            onClick={props.onEdit}
            className=" flex items-center justify-center w-1/2 px-0 h-10 tracking-wide 
                            text-black transition-colors duration-200 bg-white border-gray-400 rounded-lg shrink-0 sm:w-auto gap-x-6 hover:bg-orange-200">
            <GrFormEdit size={28} className=" mr-2" />
            <span className="text-base">
              Editar
            </span>
          </Button>


          <Button
            type="submit"
            className="flex items-center justify-center w-1/2 h-10 px-0 text-sm tracking-wide
                            text-white transition-colors duration-200 bg-sky-900 hover:bg-sky-700 rounded-lg shrink-0 sm:w-auto gap-x-2 ">
            <IoCloudUploadOutline size={25} className=" mr-2" />
            <span className="text-base">
              Cargar
            </span>
          </Button>


        </div>
        <div className="ml-20 mt-10 w-[880px]">
          <TablePreview
            columns={[
              {
                render: () => <p>{""}</p>,


                title: "Tipo de norma",
                classname: "w-70",
              },
              {
                render: () => <p>{""}</p>,
                title: "Norma jurídica",
              },
              {
                render: () => <p>{ }</p>,
                title: "Publicación registro oficial",
              },
              {
                render: () => <p>{""}</p>,
                title: "Link de descarga",
              }
            ]}
            title={""}

            onFilter={function (type: string): void {
              throw new Error("Function not implemented." + type);
            }}
            data={[]}
            showPagination={true}


          />
        </div>




        <form className="flex  mt-5 w-full ">
          <section className="container ml-20  mx-auto border-b border-gray-200 w-[851px] pb-14">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>

                <h2 className="text-lg font-medium text-gray-500 mt-4">
                  Metadatos
                </h2>


                <div className="grid grid-rows-2 grid-flow-col gap-6 w-auto  ">
                  <div className=" flex  flex-col m-2 h-[72px] gap-4 mt-5 w-[240px] ">
                    <Label htmlFor="" value="Fecha de actualización" />
                    <Datepicker icon={RiCalendarLine} type="date" />
                  </div>
                  <div className=" flex  flex-col m-2 h-[72px]  w-[240px] gap-4 mt-5  ">
                    <Label htmlFor="" value="Responsable de la UPI" />
                    <TextInput placeholder="" type="text" />{" "}
                  </div>
                  <div className=" flex  flex-col m-2 h-[72px] gap-4 mt-5 w-[240px] ">
                    <Select
                      placeholder={"Periocidad de actualización"}
                      value={""}
                      onChange={() => { }}
                      options={[
                        {
                          value: "",
                          label: "Mensual",
                        },
                      ]}
                    />
                  </div>

                  <div className=" flex  flex-col m-2 h-[72px] gap-4 mt-5 w-[240px] ">
                    <Label htmlFor="" value="Correo Electronico" />
                    <TextInput placeholder="" type="text" />
                  </div>

                  <div className=" flex  flex-col m-2 h-[72px] gap-4 mt-5 w-[240px] ">
                    <Label htmlFor="" value="Número de teléfono" />
                    <TextInput placeholder="" type="number" />
                  </div>

                  <div className=" flex  flex-col m-2 h-[72px] gap-4 mt-5 w-auto ">
                    <Label
                      htmlFor=""
                      value="Unidad poseedora de la información"
                    />
                    <TextInput placeholder="" type="text" />{" "}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>




        <h2 className="text-lg font-medium text-gray-500 mt-14 ml-20">
          Diccionario de datos
        </h2>



        <div className="mr-48 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-5 flex-shrink-0">

          <Button
            type="button"
            onClick={props.onEdit}
            className=" flex items-center justify-center w-1/2 px-0 h-10 tracking-wide 
                            text-black transition-colors duration-200 bg-white border-gray-400 rounded-lg shrink-0 sm:w-auto gap-x-6 hover:bg-orange-200">
            <GrFormEdit size={28} className=" mr-2" />
            <span className="text-base">
              Editar
            </span>
          </Button>


          <Button
            type="submit"
            className="flex items-center justify-center w-1/2 h-10 px-0 text-sm tracking-wide
                            text-white transition-colors duration-200 bg-sky-900 hover:bg-sky-700 rounded-lg shrink-0 sm:w-auto gap-x-2">
            <IoCloudUploadOutline size={25} className=" mr-2" />
            <span className="text-base">
              Cargar
            </span>
          </Button>


        </div>
        <div className="ml-20 mt-10 w-[880px]">
          <TablePreview
            columns={[
              {
                render: () => <p>{""}</p>,


                title: "Tipo de norma",
                classname: "w-70",
              },
              {
                render: () => <p>{""}</p>,
                title: "Norma jurídica",
              },
              {
                render: () => <p>{ }</p>,
                title: "Publicación registro oficial",
              },
              {
                render: () => <p>{""}</p>,
                title: "Link de descarga",
              }
            ]}
            title={""}

            onFilter={function (type: string): void {
              throw new Error("Function not implemented." + type);
            }}
            data={[]}


          />
        </div>
      </div>



    </div>

















  );
};

export default ActivePreviewDataPresenter;
