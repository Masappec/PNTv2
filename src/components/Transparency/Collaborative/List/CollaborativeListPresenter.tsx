import { Button, TextInput } from "flowbite-react";
import Select from "../../../Common/Select";
import { CiSearch } from "react-icons/ci"
import { IoBagAddOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Table from "../../../Common/Table";

interface Props {

  onAdd: () => void
  onFilter: () => void
  data: []
  showPagination: boolean

}

const CollaborativeListPresenter = (props: Props) => {

  return (

    <div>
      <div className="border-gray-300 py-5 border-b  ">
        <h2 className="text-2xl font-semibold text-black ml-11">
          Transparencia LOTAIP - Transparencia colaborativa
        </h2>
      </div>
      <div className="ml-11 mt-10">
        <h2 className="text-xl text-black font-bold  mb-10">
          Transparencia colaborativa
        </h2>
      </div>

      <div className="mr-40 mt-5 flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-5 flex-shrink-0 ">



        <TextInput
          icon={CiSearch}
          id="buscar"
          type="text"
          placeholder="Buscar por datos"
          className="w-[190px] mt-0  border-black text-center  bg-gray-100 rounded-full "
          tabIndex={7}
          sizing="base"
        />
        <div className="pl-56 grid-col-2 flex -ml-56"></div>

        <Select
          className="w-[240px] "

          value={""}
          onChange={() => { }}
          options={[
            {
              value: "",
              label: "Tipo",
            },
          ]}
        />


        <Button
          onClick={props.onAdd}
          type="submit"
          className="flex items-center justify-center w-1/2 h-10 px-0 text-sm tracking-wide 
                            text-white transition-colors duration-200 bg-sky-900 hover:bg-sky-700 rounded-lg shrink-0 sm:w-auto gap-x-2 ">
          <IoBagAddOutline size={25} className=" mr-2" />
          <span className="text-base">
            Agregar
          </span>
        </Button>

      </div>

      <Table
        columns={[
          {
            render: () => <p>{""}</p>,


            title: "Imagen",
          },
          {
            render: () => <p>{""}</p>,
            title: "Título",
          },
          {
            render: () => <p>{ }</p>,
            title: "Tipo",
          },
          {
            render: () => (
              <p>
                <button
                  onClick={() => {
                  }}
                  className=" hover:bg-blue-700 text-black font-bold ">
                  <FiEdit2 />
                </button>

                <button
                  onClick={() => {
                  }}
                  className=" hover:bg-blue-700 text-black font-bold ">
                  <GrView />
                </button>
                <button
                  onClick={() => {
                  }}
                  className=" hover:bg-blue-700 text-black font-bold ">
                  <RiDeleteBinLine />
                </button>

              </p>
            ),
            title: "Acciones"
          }
        ]}
        title={""}
        onFilter={() => { }}
        data={[]}
        description="No hay datos"
        length={props.data.length}
        search=""
        currentPage={1}
        from={1}



      />

    </div>


  )
}

export default CollaborativeListPresenter