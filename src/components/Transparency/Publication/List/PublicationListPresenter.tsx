import { FaCheckCircle, FaEdit } from "react-icons/fa"
import Alert from "../../../Common/Alert"
import Modal from "../../../Common/Modal"
import Table from "../../../Common/Table/index"
import { IoCloseCircleOutline } from "react-icons/io5"
import { Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import PublicationEntity from "../../../../domain/entities/PublicationEntity"



interface Props {
    data: PublicationEntity[]
    error: string | null
    onSearch: (search: string) => void
    onAdd: () => void
    onImport: () => void
    onFilter: () => void
    onEdit: (id: number) => void
    search: string
    setSeach: (search: string) => void
    page: number
    setPage: (page: number) => void
    setVisibleModal: (visible: boolean) => void
    visibleModal: boolean
    onConfirmDelete: () => void
    onCancelDelete: () => void
    onDelete: (id: number) => void

    publicationSelected: PublicationEntity | null

    from: number
    to: number
    total: number
    totalPage: number
}

const PublicationListPresenter = (props: Props) => {
    return (
        <div className="container h-screen">
            <div className="flex items-center py-5 justify-center">


                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => props.setVisibleModal(false)}
                >
                    {
                        props.error && <Alert type="error" message={props.error} onClose={() => { }} />
                    }


                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">{`
                        ¿Está seguro de ${props.publicationSelected?.is_active ? "desactivar" : "activar"} esta publicación?
                        
                        `}</p>

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
                    show={true}
                    columns={[
                        {
                            title: "Titulo",
                            render: (publicacion: PublicationEntity) => (
                                <p>{publicacion.name}</p>
                            )
                        },
                        {
                            title: "Descripción",
                            render: (publicacion: PublicationEntity) => (
                                <p>{publicacion.description}</p>
                            )
                        },
                        {
                            title: "Creado por",
                            render: (publicacion: PublicationEntity) => (
                                <p>{publicacion.userCreated}</p>
                            )
                        },

                        {
                            title: "Acciones",
                            render: (publicacion: PublicationEntity) => (
                                <div className="flex items-center">
                                    <button
                                        onClick={() => {
                                            props.onEdit(publicacion.id || 0)
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                        <FaEdit />
                                    </button>
                                    <button

                                        //add alt
                                        onClick={() => {
                                            props.onDelete(publicacion.id || 0)

                                        }
                                        }
                                        className={" text-white font-bold py-2 px-4 rounded-2xl" + (publicacion.is_active ? " bg-red-500 hover:bg-red-700" : " bg-green-500 hover:bg-green-700")}>
                                        {
                                            publicacion.is_active ? <IoCloseCircleOutline /> : <FaCheckCircle />
                                        }
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    currentPage={1}
                    data={props.data}
                    description="aquí se muestran las instituciones registradas en el sistema"
                    length={0}
                    onAdd={props.onAdd}
                    onFilter={props.onFilter}
                    onImport={props.onImport}
                    onSearch={props.onSearch}

                    search={props.search}
                    textAdd="Agregar Publicación"
                    textImport="Importar Publicaciones"
                    title="Publicaciones"
                    key={""}
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


export default PublicationListPresenter;