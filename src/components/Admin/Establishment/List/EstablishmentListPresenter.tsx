import EstablishmentEntity from "../../../../domain/entities/Establishment"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

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
        <>
            <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
                {"Gestión de Instituciones"}

            </h2>
            <p className='my-8 max-w-3xl items-center text-sm text-primary'>
                En esta sección podrás visualizar, editar, activar e inactivar las instituciones del portal, así
                como crear nuevas instituciones.
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
                            placeholder='Buscar por nombre de la institución'
                            onChange={(e) => { props.onSearch(e.target.value) }}
                        />
                    </div>
                </div>

                <button
                    type='button'
                    onClick={props.onAdd}
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
                        <span>Nueva institución</span>
                    </div>
                </button>
            </section>
            <section className='h-min rounded-md bg-gray-100'>
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

                                row.is_active ? (
                                    <span className='mx-auto block w-full max-w-20 rounded-md border border-custom-green bg-custom-green/5 px-2 py-1 text-xs font-normal text-custom-green sm:text-sm'>
                                        Activo
                                    </span>
                                ) : (
                                    <span className='mx-auto block w-full max-w-20 rounded-md border border-custom-red bg-custom-red/5 px-2 py-1 text-xs font-normal text-custom-red sm:text-sm'>
                                        Inactivo
                                    </span>
                                )


                            )
                        },
                        {
                            title: "Acciones",
                            classes: 'flex w-full items-center justify-center gap-2',
                            render: (row: EstablishmentEntity) => (
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

                                    {
                                        row.is_active ? (
                                            <button
                                                onClick={() => {
                                                    props.onDelete(row)
                                                }}
                                                className='flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    height='20px'
                                                    viewBox='0 -960 960 960'
                                                    width='20px'
                                                    fill='currentColor'>
                                                    <path d='m674-456-50-50 69-70-69-69 50-51 70 70 69-70 51 51-70 69 70 70-51 50-69-69-70 69Zm-290-24q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14.5T179-304q-4.95 2.94-7.98 8.24Q168-290.47 168-284v20Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21Zm-.21-73Zm0 361Z' />
                                                </svg>
                                                <span>Inactivar</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    props.onDelete(row)
                                                }}
                                                className='flex w-full max-w-24 items-center gap-2 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-white'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    height='20px'
                                                    viewBox='0 -960 960 960'
                                                    width='20px'
                                                    fill='currentColor'>
                                                    <path d='M695-456 576-575l51-51 68 68 153-152 51 50-204 204Zm-311-24q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM96-192v-92q0-25.78 12.5-47.39T143-366q55-32 116-49t125-17q64 0 125 17t116 49q22 13 34.5 34.61T672-284v92H96Zm72-72h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14.5T179-304q-4.95 2.94-7.98 8.24Q168-290.47 168-284v20Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21ZM384-312Zm0-312Z' />
                                                </svg>
                                                <span>Activar</span>
                                            </button>


                                        )
                                    }
                                </>
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

            </section>
        </>
    )

}
export default EstablishmentListPresenter