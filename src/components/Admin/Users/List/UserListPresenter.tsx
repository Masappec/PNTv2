import UserEntity from "../../../../domain/entities/UserEntity"
import Badge from "../../../Common/Badge"
import Table from "../../../Common/Table/index"
import Modal from "../../../Common/Modal"
import Alert from "../../../Common/Alert"

import { CiCircleCheck, CiTrash } from "react-icons/ci";
import { Button, Tooltip } from "flowbite-react"
import { HiOutlineExclamationCircle } from 'react-icons/hi';
//import Select from "../../../Common/Select";
//import { BiExport } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";



interface Props {

    users: UserEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (user: UserEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    setPage: (page: number) => void
    visibleModal: boolean
    selectedUser: UserEntity | null,
    setVisibleModal: (visible: boolean) => void
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (user: UserEntity) => void,
    type_alert: "success" | "warning" | "info" | "error"
    totalPage: number
    from: number
    to: number
    total: number
}

export const UserListPresenter = (props: Props) => {
    return (

        <div className="w-full">
            <div className="border-gray-300border-b">
                <h2 className="text-2xl font-semibold text-black ml-5">
                    Transparencia LOTAIP
                </h2>
            </div>
            <div className="grid grid-rows-1 grid-flow-col ml-7 ">

                <h1 className="flex flex-col mt-7 text-black text-lg  font-bold pr-96">Usuarios</h1>

                <div className=" flex  flex-col mt-6 ml-36 ">

                </div>
                {/*<div className=" flex  flex-col mt-6  ">
                    <button type="button"
                        onClick={() => { }}
                        className="w-[115px] h-[40px] flex items-center justify-center text-white bg-[#B5B5B5] hover:bg-slate-300 font-medium rounded-lg text-sm px-4 py-2 ">
                        <BiExport size={25} className="mr-2" />
                        Exportar
                        { }
                    </button>
                </div>
                <div className=" flex  flex-col mt-6 pr-32">

                    <button id=""
                        onClick={props.onImport}
                        data-dropdown-toggle="actionsDropdown"
                        className="w-[115px] h-[40px] flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" type="button">
                        <RxCardStackPlus size={25} className="mr-2" />
                        { }
                        Importar
                    </button>
    </div>*/}

            </div>



            <div className="grid grid-rows-1 grid-flow-col space-x-2 w-full pl-10 mt-12">

                {/* <div className=" flex  flex-col h-[44px]  w-[282px] mt-6 gap-2 ">
                    <Label htmlFor="" value="Nombre de funcionario" />
                    <TextInput placeholder="Ingresar nombre" type="text" />{" "}
                </div>
                <div className=" flex  flex-col h-[44px]  mt-5 w-[282px]  gap-2">
                    <Select
                        placeholder={"Nombre de la Institución"}
                        value={""}
                        onChange={() => { }}
                        options={[
                            {
                                value: "",
                                label: "Defensoría del Pueblo",
                            },
                        ]}
                    />
                </div>

                <div className=" flex  flex-col h-[44px] mt-5 w-[282px] gap-2">
                    <Select
                        placeholder={"Rol"}
                        value={""}
                        onChange={() => { }}
                        options={[
                            {
                                value: "",
                                label: "Administrador general",
                            },
                        ]}
                    />
                </div>
                    */}
            </div>
            <div className="flex items-center py-5 justify-center">

                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                >
                    {
                        props.error && <Alert type={props.type_alert} message={props.error} onClose={() => { }} />
                    }


                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {`¿Desea ${props.selectedUser?.is_active ? "inactivar" : "activar"

                            } este Usuario "${props.selectedUser?.first_name} ${props.selectedUser?.last_name}" ?`}
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
            <div className="flex w-full justify-between items-center mt-5">
                <Table
                    show={true}
                    columns={[
                        {
                            render: (row: UserEntity) => (
                                <p>{row.first_name + " " + row.last_name}</p>
                            ),
                            title: "Nombre",

                        },
                        {
                            render: (row: UserEntity) => (
                                <p>{row.email}</p>
                            ),
                            title: "Correo"
                        },
                        {
                            render: (row: UserEntity) => (
                                row.group?.map((group, index) => (
                                    <Badge key={index} text={group.name} color="primary" />
                                ))
                            ),
                            title: "Rol"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>{row.username}</p>
                            ),
                            title: "Usuario"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p>
                                    <Badge text={row.is_active ? "Activo" : "Inactivo"} color={row.is_active ? "success" : "danger"} />
                                </p>
                            ),
                            title: "Estado"
                        },
                        {
                            render: (row: UserEntity) => (
                                <p className="flex gap-2">
                                    <Tooltip content="Editar ">
                                        <button
                                            onClick={() => {
                                                props.onEdit(row)
                                            }}
                                            className="py-2 px-2 text-lg hover:text-blue-500">
                                            <FiEdit2 />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content={row.is_active ? "Inactivar " : "Activar "} >
                                        <button

                                            //add alt
                                            onClick={() => {
                                                props.onDelete(row)

                                            }
                                            }
                                            className={"  font-bold py-2 px-2 text-lg" + (row.is_active ? "  hover:text-red-700" : "text-green-500 hover:text-green-700")}>
                                            {
                                                row.is_active ? <CiTrash /> : <CiCircleCheck size={20} />
                                            }
                                        </button>
                                    </Tooltip>
                                </p>
                            ),
                            title: "Acciones"
                        }
                    ]}

                    description={props.users.length === 0 ? "No hay usuarios" : "Consulta los usuarios registrados"}
                    length={props.users.length}
                    onAdd={props.onAdd}
                    onFilter={() => { }}
                    isImport={false}
                    onImport={props.onImport}
                    textAdd="Agregar usuario"
                    textImport="Importar usuarios"
                    title="Usuarios"
                    data={props.users}
                    currentPage={props.page}
                    onSearch={props.onSearch}
                    search={props.search}
                    onChangePage={props.setPage}
                    totalPages={props.totalPage}
                    from={props.from}
                    to={props.to}
                    total={props.total}
                />
            </div>


        </div>
    )
}

export default UserListPresenter