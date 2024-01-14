import Modal from "../../../Common/Modal";
import Title from "../../../Common/Title";
import Alert from "../../../Common/Alert";
import { LuCheck, LuX } from "react-icons/lu"
import Table from "../../../Common/Table"
import Dropzone from "../../../Common/Dropzone";
import Spinner from "../../../Common/Spinner";



interface Props {
    error: string | null
    onSearch: (search: string) => void
    onImport: () => void;
    onCancel: () => void;
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
    onDelete: () => void
    loading: boolean;
    success: string;
    setError: (e: string) => void;
    setSuccess: (e: string) => void;
}
const UserImportPresenter = (props: Props) => {
    return (

        <div className="container">

            <div className="flex items-center py-5 justify-center">


            </div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            Importar Archivos
                        </h2>

                    </div>

                </div>
                <Dropzone
                    handleChageLogo={() => { }}
                    id="logo"
                    multiple={false}
                    type="archive"
                    name="archivo"
                    accept=""
                />
                <div className="flex items-center mt-4 gap-x-3">

                    <button
                        type="button"
                        onClick={props.onCancel}
                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                    text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <LuX className="w-5 h-5" />
                        <span>
                            Cancelar
                        </span>
                    </button>
                    {
                        props.loading ? <Spinner /> : <button
                            type="submit"
                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide
                    text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            <LuCheck className="w-5 h-5" />
                            <span>
                                Guardar
                            </span>
                        </button>
                    }
                </div>
            </div>
            <div className="flex items-center py-5 justify-center">

                <Modal
                    isvisible={props.visibleModal}
                    onClose={() => { }}
                    width="w-[500px]"
                >
                    {
                        props.error && <Alert type="error" message={props.error} onClose={() => { }} />
                    }
                    <Title title={`¿Desea eliminar este archivo }" ?`} color="black" text="" />
                    <div className="space-x-4 flex justify-center items-center mt-5">
                        <button
                            onClick={() => {
                                props.onConfirmDelete()
                            }
                            }
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                            Si
                        </button>
                        <button
                            onClick={() => {
                                props.onCancelDelete()
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">
                            No
                        </button>
                    </div>
                </Modal>

            </div>

            <Table

                isImport={false}
                columns={[
                    {
                        title: "Nombre",
                        render: () => (
                            <p>{ }</p>
                        )
                    },
                    {
                        title: "Archivo csv",
                        render: () => (
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                                </button>
                                <button
                                    onClick={() => {
                                        props.onDelete()

                                    }
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl">

                                </button>
                            </div>
                        )
                    }

                ]}

                currentPage={1}
                data={[]}
                description="CSV"
                length={0}
                onAdd={() => { }}
                onFilter={() => { }}
                onImport={() => { }}
                onSearch={() => { }}
                
                search={""}


                title="Archivos"
                key={""}


            />

        </div>

    );
}

export default UserImportPresenter;

