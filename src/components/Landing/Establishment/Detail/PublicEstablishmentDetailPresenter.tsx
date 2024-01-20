import { Alert, Card, Tabs } from "flowbite-react"
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { HiInformationCircle } from "react-icons/hi";
import Spinner from "../../../Common/Spinner";
import { FaInfoCircle } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { MdDataset } from "react-icons/md";

interface Props {
    entity: EstablishmentEntity;
    error: string;
    loading: boolean;
}

const PublicEstablishmentDetailPresenter = (props: Props) => {
    if (props.loading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            {
                props.error &&
                <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">Error!</span> {props.error}
                </Alert>
            }

            <div className="flex w-full h-full p-32">


                <Card

                    imgSrc={props.entity.logo ? props.entity.logo as string : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
                    className="w-1/5 box-shadow-2xl">

                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {props.entity.name}
                    </p>


                </Card>
                <Card className="w-full box-shadow-2xl">
                    <Tabs aria-label="Default tabs" style="underline"

                    >
                        <Tabs.Item active title="Publicaciones" icon={MdDataset}>
                            This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
                            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                            control the content visibility and styling.
                        </Tabs.Item>
                        <Tabs.Item title="Actividad" icon={RxActivityLog}>
                            This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                            control the content visibility and styling.
                        </Tabs.Item>
                        <Tabs.Item title="Acerca de" icon={FaInfoCircle}>
                            <span className="text-3xl mb-5 text-gray-800 dark:text-white">
                                {props.entity.name}
                            </span>
                            <br />
                            <span className="font-medium mt-10 text-gray-800 dark:text-white">
                                </span>{props.entity.abbreviation}
                            <br />


                            <span className="font-medium text-gray-800 dark:text-white">
                                Autoridad: </span>{props.entity.first_name_authority + " " + props.entity.last_name_authority}

                            <br />
                            <span className="font-medium text-gray-800 dark:text-white">
                                Correo de la autoridad: </span>{props.entity.email_authority}
                            <br />





                        </Tabs.Item>
                    </Tabs>
                </Card>
            </div>
        </>
    )
}
export default PublicEstablishmentDetailPresenter