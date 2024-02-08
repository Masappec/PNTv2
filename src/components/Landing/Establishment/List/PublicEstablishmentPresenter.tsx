import { Alert, Label, Pagination, TextInput } from "flowbite-react"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { HiInformationCircle } from "react-icons/hi"
import { FormattedMessage, useIntl } from "react-intl";
import { BiSearch } from "react-icons/bi";


interface Props {
    entities: EstablishmentEntity[]
    error: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
    total: number;
    onItemClicked: (slug: string) => void;
    letters: string[];
}

const PublicEstablishmentPresenter = (props: Props) => {

    const intl = useIntl();

    return (
        <div className="flex flex-col w-full  bg-white pr-10">
            <div></div>
            <div className="border-l-2 border-gray-900 ml-0 md:ml-10">

                {
                    props.error &&
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Error!</span> {props.error}
                    </Alert>
                }
                <div className="flex flex-col m-10 p-10 justify-normal w-full h-full">
                    <p className="text-2xl flex-col w-1/5 tracking-tight text-gray-900 dark:text-white">
                        Instituciones que publican en el Portal

                    </p>
                    <div className="flex flex-wrap mt-24">
                        {
                            props.letters.map((letter, i) => {
                                return (
                                    <div className="flex flex-row">
                                        <p className="text-primary-500 hover:text-primary-600 text-xl">
                                            {i === 0 ? "" : "-"}
                                        </p>
                                        <div>

                                            <a
                                                onClick={() => props.onPageChange(1)}
                                                className="text-primary-500 hover:text-primary-600 text-xl ml-2"
                                            >


                                                {letter}
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="flex flex-row justify-start mt-10 w-full h-full gap-12">
                    <div>
                        <Label htmlFor="search" className="text-base tracking-tight text-gray-900 dark:text-white">
                           <FormattedMessage id="establishment"></FormattedMessage> 
                        </Label>
                        <TextInput
                        icon={BiSearch}
                        id="search" type="search" 
                        className="w-72"

                        placeholder={intl.messages['search_by_establishment'] as string||""}
                        
                        required />
                    </div>
                    <div>
                        <Label htmlFor="search" className="text-base  tracking-tight text-gray-900 dark:text-white">
                           <FormattedMessage id="type_establishment"></FormattedMessage> 
                        </Label>
                        <TextInput
                        icon={BiSearch}
                        id="search" type="search" 
                        placeholder={intl.messages['search_by_type_establishment'] as string||""}
                        className="w-72"
                        required />
                    </div>

                </div>
                <div className="flex flex-wrap p-5">

                    {
                        props.letters.map((letra) => {
                            return (
                                <div className="flex flex-col w-full">
                                    <h3 className="text-2xl font-bold tracking-tight text-primary-500 dark:text-white mt-5 mb-5">
                                        {letra}
                                    </h3>
                                    <div className="flex flex-wrap w-full">
                                        {
                                            props.entities.map((entity) => {
                                                if (entity.name.charAt(0).toLowerCase() === letra.toLowerCase()) {
                                                    return (
                                                        <a className="w-1/4 text-primary-500" onClick={() => props.onItemClicked(entity.code)}>
                                                            {entity.name}
                                                        </a>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
                </div>
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={props.currentPage} totalPages={props.totalPages} onPageChange={props.onPageChange} />
                </div>
            </div>
        </div>
    )
}
export default PublicEstablishmentPresenter