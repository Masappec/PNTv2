import { Alert, Badge, Card } from "flowbite-react";
import Spinner from "../../../Common/Spinner";
import { HiInformationCircle } from "react-icons/hi";
import { AttachmentEntity, FilePublicationEntity } from "../../../../domain/entities/PublicationEntity";
import { FaDownload, FaExternalLinkAlt, FaFileCsv } from "react-icons/fa";



interface Props {
    loading: boolean;
    error: string;
    title: string;
    description: string;
    user_name: string;
    tags: string[];
    files: FilePublicationEntity[];
    date_created?: string;
    date_modified?: string;
    date_publication?: string;
    establishment: string;
    email_establishment: string;
    attachments: AttachmentEntity[];
}
const PublicationDetailPresenter = (props: Props) => {
    if (props.loading) {
        return <Spinner />
    }
    if (props.error) {
        return <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Error!</span> {props.error}
        </Alert>
    }
    return (
        <div className="flex w-full h-full p-32">


            <Card className="w-full box-shadow-2xl"
                style={{
                    border: "0px solid #e2e8f0",
                    borderRadius: "0",
                    boxShadow: "none",
                }}
            >
                <div className="flex">
                    {
                        props.tags.map((tag) => {
                            return <Badge className="mr-2">{tag}</Badge>
                        })
                    }

                </div>
                <h3 className="font-bold text-2xl text-gray-700 dark:text-gray-400">
                    {props.title}
                </h3>
                <h4 className="text-xl font-light text-orange-600 dark:text-gray-300">
                    {props.establishment}
                </h4>
                <p className="text-gray-700 dark:text-gray-400">
                    {props.description}
                </p>





                <Card className="w-full"

                >
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-primary-900 dark:text-white">Archivos adjuntos</h5>

                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                props.files.map((file) => {
                                    return <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="shrink-0">
                                                <FaFileCsv
                                                    className="h-8 w-8 text-green-400 dark:text-gray-300"
                                                    size={30}
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                    {file.name !== "" ? file.name : "Sin nombre"}
                                                </p>
                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                    {file.description !== "" ? file.description : "Sin descripción"}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <a href={file.url_download as string} target="_blank" rel="noreferrer">
                                                    <FaDownload size={20} className="mr-2 text-green-600" /></a>

                                            </div>
                                        </div>
                                    </li>
                                })
                            }


                        </ul>
                    </div>
                </Card>
                <Card className="w-full"

                >
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-primary-900 dark:text-white">Enlaces adjuntos</h5>

                    </div>
                    <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                props.attachments.map((file) => {
                                    return <li className="py-3 sm:py-4">
                                        <a href={file.url_download as string} target="_blank" rel="noreferrer">
                                            <div className="flex items-center space-x-4">
                                                <div className="shrink-0">
                                                    <FaExternalLinkAlt
                                                        className="h-8 w-8 text-primary-600 dark:text-gray-300"
                                                        size={30}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                        {file.name !== "" ? file.name : "Sin nombre"}
                                                    </p>
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                        {file.description !== "" ? file.description : "Sin descripción"}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                })
                            }


                        </ul>
                    </div>
                </Card>
            </Card>

            <Card className="w-1/3 box-shadow-2xl" style={{
                border: "0px solid #e2e8f0",
                borderRadius: "0",
                boxShadow: "none",
            }}>

                <h5 className="text-xl font-bold leading-none text-primary-900 dark:text-white">
                    Meta datos
                </h5>
                <div className="flex flex-col">
                    <span className="text-gray-700 dark:text-gray-400">Fuente</span>
                    <span className="text-gray-700 font-bold dark:text-gray-400">{props.establishment}</span>
                    <span className="text-gray-700 dark:text-gray-400">Correo</span>
                    <span className="text-gray-700 font-bold dark:text-gray-400">{props.email_establishment}</span>
                    <span className="text-gray-700 dark:text-gray-400">Autor</span>
                    <span className="text-gray-700 font-bold dark:text-gray-400">{props.user_name}</span>
                    <span className="text-gray-700 dark:text-gray-400">Fecha de creación</span>
                    <span className="text-gray-700 font-bold dark:text-gray-400">{props.date_created}</span>
                    <span className="text-gray-700 dark:text-gray-400">Fecha de modificación</span>
                    <span className="text-gray-700 font-bold dark:text-gray-400">{props.date_modified}</span>
                    <span className="text-gray-700 dark:text-gray-400">Fecha de publicación</span>
                    <span className="text-gray-700 font-bold dark:text-gray-400">{props.date_publication}</span>
                </div>

            </Card>
        </div>

    )
}

export default PublicationDetailPresenter;