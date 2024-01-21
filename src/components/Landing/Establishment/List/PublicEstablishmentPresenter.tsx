import { Alert, Card, Pagination, TextInput } from "flowbite-react"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { HiInformationCircle } from "react-icons/hi"


interface Props {
    entities: EstablishmentEntity[]
    error: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    total: number;
    onItemClicked: (id: number,name:string) => void;
}

const PublicEstablishmentPresenter = (props: Props) => {


    return (
        <div className="flex flex-col items-center justify-center w-full h-full">

            {
                props.error &&
                <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">Error!</span> {props.error}
                </Alert>
            }
            <Card className="w-10/12 box-shadow-2xl m-10">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ¿Que son las entidades? <span className="text-primary-500">🤔</span>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Las entidades son las organizaciones que se registran en la plataforma para poder 
                    gestionar y publicar sus conjuntos de datos. Estas pueden ser tanto públicas como privadas.
                </p>
            </Card>
            <Card href="#" className="w-10/12 box-shadow-2xl m-10">
                <div>
                    <TextInput id="search" type="search" placeholder="Buscar..." required />
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-5 mb-5">
                {props.total} Entidades Encontradas 
                </h5>
                <div className="bg-gray-200 flex flex-wrap p-5">
                
                    {
                        props.entities.map((entity) => {
                            return (
                                <Card
                                    onClick={() => props.onItemClicked(entity.id||0,entity.name)}
                                    className="w-72 m-2"
                                    imgAlt={entity.name}
                                    imgSrc={entity.logo ? entity.logo as string : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
                                >
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {entity.name}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {entity.abbreviation}
                                    </p>
                                </Card>
                            )
                        })
                    }
                </div>
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={props.currentPage} totalPages={props.totalPages} onPageChange={props.onPageChange} />
                </div>
            </Card>
        </div>
    )
}
export default PublicEstablishmentPresenter