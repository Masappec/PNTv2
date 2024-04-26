import { Button, TextInput } from "flowbite-react";
import Select from "../../../Common/Select";
import { CiSearch } from "react-icons/ci"
import { IoBagAddOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Table from "../../../Common/Table";
import TransparencyCollab from "../../../../domain/entities/TransparencyCollab";

interface Props {

  data: TransparencyCollab[]
  error: string | null
  onSearch: (search: string) => void
  onAdd: () => void
  onImport: () => void
  onFilter: () => void
  onEdit: (transparency: TransparencyCollab) => void
  search: string
  setSeach: (search: string) => void
  page: number
  setPage: (page: number) => void
  setVisibleModal: (visible: boolean) => void
  visibleModal: boolean
  onConfirmDelete: () => void
  onCancelDelete: () => void
  onDelete: (Transparency: TransparencyCollab) => void
  from: number
  to: number
  total: number
  totalPage: number

}
const CollaborativeListPresenter = (props: Props) => {

  return (

    <div className="h-full">
      <div className="border-gray-300 py-5 border-b  ">
        <h2 className="text-2xl font-semibold text-black ml-11">
          Transparencia LOTAIP - Transparencia focalizada
        </h2>
      </div>
      <div className="ml-11 mt-10">
        <h2 className="text-xl text-black font-bold  mb-10">
          Transparencia focalizada
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

        <Select
          className="w-[240px] mb-8"
          placeholder={"Categoría"}
          value={""}
          onChange={() => { }}
          options={[
            {
              value: "",
              label: "Medioambiente",
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

      <div className="">
        <Table<TransparencyCollab>
          show={true}
          columns={[
            {
              render: (row: TransparencyCollab) => <p>{new Date(row.published_at).toLocaleString()}</p>,


              title: "Fecha",
            },

            {
              render: () => (
                <p>
                  <button
                    onClick={() => {
                    }}
                    className=" p-5 text-lg text-slate-400 font-bold rounded-full">
                    <FiEdit2 />
                  </button>

                  <button
                    onClick={() => {
                    }}
                    className=" p-5 text-slate-400font-bold ">
                    <GrView />
                  </button>
                  <button
                    onClick={() => {
                    }}
                    className=" p-5 text-slate-400 font-bold ">
                    <RiDeleteBinLine />
                  </button>

                </p>
              ),
              title: "Acciones"
            }
          ]}
          title={""}
          onFilter={() => { }}
          data={props.data}
          description="No hay datos"
          length={props.data.length}
          currentPage={props.page}
          from={props.from}
          search={props.search}
          isImport={false}
          onChangePage={props.setPage}
          onImport={props.onImport}
          textImport="Importar"
          totalPages={props.totalPage}


        />
      </div>
    </div>



  )
}

export default CollaborativeListPresenter;