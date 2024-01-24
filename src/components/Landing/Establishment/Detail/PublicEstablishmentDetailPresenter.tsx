import { Alert, Card, Pagination, Tabs } from "flowbite-react"
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { HiInformationCircle } from "react-icons/hi";
import Spinner from "../../../Common/Spinner";
import { FaInfoCircle } from "react-icons/fa";
import { MdDataset } from "react-icons/md";
import PublicationEntity from "../../../../domain/entities/PublicationEntity";
import CardPublication from "../../../Common/CardPublication";
import default_logo from '../../../../assets/default_logo.svg'

interface Props {
    entity: EstablishmentEntity;
    error: string;
    loading: boolean;
    publications: PublicationEntity[];
    total: number;
    totalPages: number;
    from: number;
    to: number;
    current_page: number;
    onChangePage: (page: number) => void;
    onItemPublicationClick: (slug: string) => void;
}

const PublicEstablishmentDetailPresenter = (props: Props) => {
    if (props.loading) {
        return (
            <Spinner />
        )
    }

    if (props.error) {
        return (
            <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error!</span> {props.error}
            </Alert>
        )
    }

    return (
        <>

            <div className="flex w-full h-full p-32">


                <Card

                    imgSrc={props.entity.logo ? props.entity.logo as string : default_logo}
                    imgAlt="Imagen Logo"
                    className="w-1/3 h-1/5">
                    <div className="flex flex-col justify-between">
                    <p className="font-bold text-2xl text-gray-700 dark:text-gray-400">
                        {props.entity.name}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-white">
                            Publicaciones
                        </span> 
                        <br/>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">
                            
                        {props.total}
                        </span>
                    </p>
                    </div>


                </Card>
                <Card className="w-full box-shadow-2xl">
                    <Tabs aria-label="Default tabs" style="underline"

                    >
                        <Tabs.Item active title="Publicaciones" icon={MdDataset}>

                            {
                                props.publications.length === 0 &&
                                <Alert color="info" icon={HiInformationCircle}>
                                    <span className="font-medium">Información</span> No hay publicaciones disponibles
                                </Alert>
                            }

                            {
                                props.publications.map((publication) => (
                                    <CardPublication
                                    description={publication.description || "No hay descripción"}
                                    title={publication.name || "No hay título"}
                                    tags={publication.tag?.map((tag) => (tag.name || "No hay etiqueta")) || []}
                                    date={publication.createdAt}
                                    author={publication.userCreated || "No hay autor"}
                                    onClick={() => props.onItemPublicationClick(publication.slug || "")}
                                    />
                                ))
                            }

                            <Pagination
                                className="mt-10"
                                totalPages={props.totalPages}
                                currentPage={props.current_page}
                                onPageChange={(page) => props.onChangePage(page)}
                            />
                        </Tabs.Item>
                        
                        <Tabs.Item title="Acerca de" icon={FaInfoCircle}>
                            <span className="text-3xl m-5 text-gray-800 dark:text-white font-semibold">
                                {props.entity.name}
                            </span>
                            <br />
                            <span className="font-medium m-5 text-gray-800 dark:text-white">
                            {props.entity.abbreviation}
                                </span>
                            <br />


                            <span className="font-medium text-gray-800 m-5 dark:text-white">
                                Autoridad: 
                            </span>{props.entity.first_name_authority + " " + props.entity.last_name_authority}

                            <br />
                            <span className="font-medium m-5 text-gray-800 dark:text-white">
                                Correo de la autoridad: 
                            </span>{props.entity.email_authority}
                            <br />





                        </Tabs.Item>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}
export default PublicEstablishmentDetailPresenter