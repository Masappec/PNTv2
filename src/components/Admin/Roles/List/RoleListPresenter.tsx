import RoleEntity from "../../../../domain/entities/RoleEntity";
import Table from "../../../Common/Table/index";
import Modal from "../../../Common/Modal";
import Alert from "../../../Common/Alert";
import { Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";


interface Props {
    roles: RoleEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (role: RoleEntity) => void
    search: string
    setSeach: (search: string) => void
    page: number
    nextPage: number
    previousPage: number
    setPage: (page: number) => void
    setVisibleModal: (visible: boolean) => void
    visibleModal: boolean
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (RoleEntity: RoleEntity) => void
    selectedRole: RoleEntity | null
}
const RoleListPresenter = (props: Props) => {

    return (
        <>
            <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                {"Gestión de Roles"}

            </h2>
            <p className='my-8 max-w-3xl items-center text-sm text-primary'>
                En esta sección podrás visualizar, editar, activar e inactivar los roles del portal, así como
                crear nuevos roles.
            </p>
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
                        {`¿Desea eliminar este Rol "${props.selectedRole?.name}" ?`}
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
            <section className='mb-4 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center'>
                <div className='w-full max-w-md'>
                    <div className='group relative'>
                        <svg
                            className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-focus-within:text-primary group-hover:text-primary'
                            stroke='currentColor'
                            fill='currentColor'
                            stroke-width='0'
                            viewBox='0 0 24 24'
                            height='1em'
                            width='1em'
                            xmlns='http://www.w3.org/2000/svg'
                        ><path
                            d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'
                        ></path>
                        </svg>
                        <input
                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                            type='text'
                            placeholder='Buscar por nombre del rol'
                            name='first_name'
                            onChange={(e) => props.onSearch(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type='button'
                    onClick={() => props.onAdd()}
                    className='inline-flex w-max items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300'>
                    <div className='inline-flex items-center gap-2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='24px'
                            viewBox='0 -960 960 960'
                            width='24px'
                            fill='currentColor'
                        ><path
                            d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                        ></path>
                        </svg>
                        <span>Nuevo rol</span>
                    </div>
                </button>

            </section>
            <section className='h-min rounded-md bg-gray-100'>
                <Table
                    show={false}
                    columns={[
                        {
                            title: "Nombre",
                            render: (row: RoleEntity) => (
                                <p className="text-left">{row.name}</p>
                            )
                        },
                        {
                            title: "Acciones",
                            classes: 'flex w-full items-center justify-center gap-2',
                            render: (row: RoleEntity) => (
                                <>
                                    <button
                                        onClick={() => {
                                            props.onEdit(row)
                                        }}
                                        className='flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 -960 960 960'
                                            width='20px'
                                            fill='currentColor'>
                                            <path d='M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z' />
                                        </svg>
                                        <span>Editar</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            props.onDelete(row)
                                        }}
                                        className='flex w-full max-w-24 items-center gap-2 rounded-md border border-custom-red px-2 py-1 text-xs font-medium text-custom-red hover:bg-custom-red hover:text-white'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            height='20px'
                                            viewBox='0 -960 960 960'
                                            width='20px'
                                            fill='currentColor'>
                                            <path d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z' />{' '}
                                        </svg>

                                        <span>Eliminar</span>
                                    </button>
                                </>
                            )
                        }
                    ]}
                    currentPage={1}
                    data={props.roles}
                    description="Roles"
                    length={props.roles.length}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Agregar Rol"
                    textImport="Importar Roles"
                    title="Roles"
                    key={"roles-table"}




                />

            </section>
        </>
    )
    /*return (

        <div className=" w-full">
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
                        {`¿Desea eliminar este Rol "${props.selectedRole?.name}" ?`}
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
                    show= {true}
                    columns={[
                        {
                            title: "Nombre",
                            render: (row: RoleEntity) => (
                                <p>{row.name}</p>
                            )
                        },
                        {
                            title: "Acciones",
                            render: (row: RoleEntity) => (
                                <div className="flex items-center">
                                    <button
                                        onClick={() => {
                                            props.onEdit(row)
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.onDelete(row)

                                        }
                                        }
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaTrash />
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    currentPage={1}
                    data={props.roles}
                    description="Roles"
                    length={props.roles.length}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Agregar Rol"
                    textImport="Importar Roles"
                    title="Roles"
                    key={"roles-table"}




                />
            </div>
        </div>
    );*/
}

export default RoleListPresenter;