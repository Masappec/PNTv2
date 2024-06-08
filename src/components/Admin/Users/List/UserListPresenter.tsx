import UserEntity from "../../../../domain/entities/UserEntity"
import Table from "../../../Common/Table/index"
import { HiOutlineExclamationCircle, HiOutlinePencil } from 'react-icons/hi';
import Modal from "../../../Common/Modal";

import { FiUserCheck, FiUserX } from "react-icons/fi";
import CustomButton from "../../../Common/CustomButton"
import Alert from "../../../Common/Alert";



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
        <><h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
            {"Gestión de Usuarios"}

        </h2>
            <p className='my-8 max-w-3xl items-center text-sm text-primary'>
                En esta sección podrás visualizar, editar, activar e inactivar los usuarios del portal, así como
                crear nuevos usuarios.
            </p>

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
                            placeholder='Buscar por nombre o usuario'
                            name='first_name'
                            onChange={(e) => props.onSearch(e.target.value)}
                            value={props.search}
                        />
                    </div>
                </div>

                <button
                    onClick={props.onAdd}
                    type='button'
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
                        <span>Nuevo usuario</span>
                    </div>
                </button>
            </section>

            <Modal
                isvisible={props.visibleModal}
                onClose={() => { }}
            >
                {
                    props.error && <Alert type="error" message={props.error} onClose={() => { }} />
                }


                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {`¿Desea eliminar este Rol "${props.selectedUser?.email}" ?`}
                </h3>
                <div className="flex justify-center gap-4">
                    <button onClick={() => props.onConfirmDelete()} className='flex w-full max-w-24 items-center gap-2 rounded-md border border-primary bg-primary px-2 py-1 text-xs font-medium text-white hover:bg-transparent hover:text-primary'>
                                                {"Si, Estoy seguro"}
                    </button>
                    <button color="gray" onClick={() => props.onCancelDelete()} className='flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>

                        No, Cancelar
                    </button>
                </div>
            </Modal>
            <section className='h-min rounded-md bg-gray-100'>
                <Table
                    show={false}
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
                                row.group?.map((group) => (
                                    <p className='text-primary'>
                                        {group.name}
                                    </p>
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

                                row.is_active ? <span className='mx-auto block w-full max-w-20 rounded-md border border-custom-green bg-custom-green/5 px-2 py-1 text-xs font-normal text-custom-green sm:text-sm'>
                                    Activo
                                </span> : <span className='mx-auto block w-full max-w-20 rounded-md border border-custom-red bg-custom-red/5 px-2 py-1 text-xs font-normal text-custom-red sm:text-sm'>
                                    Inactivo
                                </span>
                            ),
                            title: "Estado"
                        },
                        {
                            render: (row: UserEntity) => (
                                <>
                                        <CustomButton
                                            text="Editar"
                                            onClick={() => props.onEdit(row)}
                                            icon={<HiOutlinePencil size={19}/>}
                                        />
                                        
                                        <CustomButton
                                            text={row.is_active ? "Inactivar " : "Activar "}
                                            onClick={() => props.onDelete(row)}
                                            icon={row.is_active ? <FiUserX size={19} /> : <FiUserCheck size={19} />}
                                        />
                                </>
                            ),
                            title: "Acciones",
                            classes: 'flex w-full items-center justify-center gap-2'
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
            </section>
        </>
    )
    
}

export default UserListPresenter