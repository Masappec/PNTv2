import { FaCheckCircle } from "react-icons/fa"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { FiEdit2 } from "react-icons/fi";
import Badge from "../../../Common/Badge"
import { Button, Tooltip, } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { RxCardStackPlus } from "react-icons/rx"
import Select from "../../../Common/Select";
import { RiDeleteBin6Line } from "react-icons/ri";
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface"



interface Props {
    establishments: EstablishmentEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (role: EstablishmentEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    setPage: (page: number) => void
    setVisibleModal: (visible: boolean) => void
    visibleModal: boolean
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (RoleEntity: EstablishmentEntity) => void
    selectedEstablishment: EstablishmentEntity | null
    from: number
    to: number
    total: number
    totalPage: number,
    options: OptionsSelectCreate;
    onChangeFilter: (name: string) => void;
    functionSelected: string;
}

const EstablishmentListPresenter = (props: Props) => {
    return (
        <div className="container">
            <div className="border-gray-300 py-5 border-b  ">
                <h2 className="text-2xl font-semibold text-black ml-11">
                    Transparencia LOTAIP
                </h2>
            </div>
            <div className="grid grid-rows-1 grid-flow-col  w-auto ml-7 ">

                <h1 className="flex flex-col mt-7 text-black text-lg  font-bold pr-96">Instituciones</h1>

                <div className=" flex  flex-col mt-6 ml-36 ">
                    <button type="button"
                        onClick={props.onAdd}
                        className="w-[100px] h-[40px] flex items-center justify-center text-white bg-[#B5B5B5] hover:bg-primary-400 font-medium rounded-lg text-sm px-4 py-2 ">
                        <RxCardStackPlus size={25} className="mr-2 " />
                        Nuevo
                    </button>
                </div>


            </div>
            <div className="grid grid-rows-1 grid-flow-col space-x-2 w-full pl-10 mt-12">
                <div className=" flex  flex-col h-[44px] mt-5 w-[242px] gap-2">
                    <Select
                        placeholder={"Función"}

                        onChange={(e) => {
                            props.onChangeFilter(e.target.value)
                        }}
                        options={[
                            { value: "", label: "Seleccione una opción" },
                            ...props.options.functions.map((func) => ({
                                value: func.name,
                                label: func.name
                            }))

                        ]}
                        name="function_organization"


                    />
                </div>
            </div>


            <div className="flex items-center py-5 justify-center">


                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                >
                    {
                        props.error && <Alert type="error" message={props.error} onClose={() => { }} />
                    }


                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {`¿Desea ${props.selectedEstablishment?.is_active ? "desactivar" : "activar"
                            } esta Entidad "${props.selectedEstablishment?.name}" ?`}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => props.onConfirmDelete()}>
                            {"Si, Estoy seguro"}
                        </Button>
                        <Button color="gray" onClick={() => props.onCancelDelete()}>
                            No, Cancelar
                        </Button>
                    </div>
                </Modal>
            </div>
            <div className="flex justify-between items-center mt-5">
                <Table
                    show={false}
                    columns={[
                        {
                            title: "Nombre",
                            render: (row: EstablishmentEntity) => (
                                <p>{row.name}</p>
                            )
                        },
                        {
                            title: "Abreviatura",
                            render: (row: EstablishmentEntity) => (
                                <p>{row.abbreviation}</p>
                            )
                        },
                        {
                            title: "Maxima autoridad",
                            render: (row: EstablishmentEntity) => (
                                <p>{row.highest_authority + " " + row.first_name_authority + " " + row.last_name_authority}</p>
                            )
                        },
                        {
                            title: "Estado",
                            render: (row: EstablishmentEntity) => (
                                <Badge
                                    color={row.is_active ? "success" : "danger"}
                                    text={row.is_active ? "Activo" : "Inactivo"}
                                />
                            )
                        },
                        {
                            title: "Acciones",
                            render: (row: EstablishmentEntity) => (
                                <div className="flex items-center">
                                    <Tooltip content="Editar" placement="top">
                                    <button
                                        onClick={() => {
                                            props.onEdit(row)
                                        }}
                                        className=" hover:text-blue-700  font-bold py-2 px-4 text-lg">
                                        <FiEdit2 />
                                    </button>
                                    </Tooltip>
                                    <Tooltip content={row.is_active ? "Desactivar" : "Activar"} placement="top">
                                    <button

                                        //add alt
                                        onClick={() => {
                                            props.onDelete(row)

                                        }
                                        }
                                        className={"  font-bold py-2 px-4 text-lg" + (row.is_active ? "  hover:text-red-700" : "  hover:text-green-700")}>
                                        {
                                            row.is_active ? <RiDeleteBin6Line /> : <FaCheckCircle />
                                        }
                                    </button>
                                    </Tooltip>
                                </div>
                            )
                        }
                    ]}
                    currentPage={props.page}
                    data={props.establishments}
                    description="aquí se muestran las instituciones registradas en el sistema"
                    length={props.establishments.length}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Agregar Institución"
                    textImport="Importar Instituciones"
                    title="Instituciones"
                    key={"roles-table"}
                    onChangePage={props.setPage}
                    from={props.from}
                    to={props.to}
                    total={props.total}
                    totalPages={props.totalPage}


                />
            </div>
        </div>
    )
}
export default EstablishmentListPresenter