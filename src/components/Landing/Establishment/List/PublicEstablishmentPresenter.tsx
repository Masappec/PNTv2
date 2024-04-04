import { Alert, Label, TextInput } from "flowbite-react"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { HiInformationCircle } from "react-icons/hi"
import { FormattedMessage, useIntl } from "react-intl";
import { BiSearch } from "react-icons/bi";
import Spinner from "../../../Common/Spinner";


interface Props {
    entities: {
        letter: string,
        data: EstablishmentEntity[]
    }[];
    error: string;
    onPageChange: (letter: string) => void;
    total: number;
    onItemClicked: (slug: string) => void;
    letters: string[];
    loading: boolean;
}

const PublicEstablishmentPresenter = (props: Props) => {

    const intl = useIntl();

    return (
        <div className="flex flex-col w-full  bg-white pr-10">
            <div></div>
            <div className="border-l-2 border-gray-900 ml-10 md:ml-10">

                {
                    props.error &&
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Error!</span> {props.error}
                    </Alert>
                }
                <div className="flex flex-col ml-5 mt-9 xl:m-10 xl:p-10 justify-normal w-full h-full">
                    <p className="text-2xl flex-col xl:w-1/5 tracking-tight font-bold xl:font-normal text-gray-900 dark:text-white">
                        Instituciones que publican en el Portal

                    </p>
                    <div className="flex flex-wrap mt-24">
                        {
                            props.letters.map((letter, i) => {
                                return (
                                    <div className="flex flex-row ">
                                        <p className="text-primary-500 mx-[3px] hover:text-primary-600 text-xl">
                                            {i === 0 ? "" : i % 8 === 0 ? "  " : "-"}
                                        </p>
                                        <div>

                                            <a
                                                onClick={() => props.onPageChange(letter)}
                                                className="text-primary-500 hover:text-primary-600 text-xl xl:ml-2 mx-[4px]
                                                hover:cursor-pointer 
                                                "
                                            >


                                                {letter}
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="flex flex-col xl:flex-row justify-start mt-10 w-full h-full gap-12">
                        <div>
                            <Label htmlFor="search" className="text-base tracking-tight text-gray-900 dark:text-white">
                                <FormattedMessage id="establishment"></FormattedMessage>
                            </Label>
                            <TextInput
                                icon={BiSearch}
                                id="search" type="search"
                                className="w-72"

                                placeholder={intl.messages['search_by_establishment'] as string || ""}

                                required />
                        </div>
                        <div>
                            <Label htmlFor="search" className="text-base  tracking-tight text-gray-900 dark:text-white">
                                <FormattedMessage id="type_establishment"></FormattedMessage>
                            </Label>
                            <TextInput
                                icon={BiSearch}
                                id="search" type="search"
                                placeholder={intl.messages['search_by_type_establishment'] as string || ""}
                                className="w-72"
                                required />
                        </div>

                    </div>
                    <div className="flex flex-wrap p-5">
                        {
                            props.loading &&
                            <Spinner />

                        }
                        {
                            !props.loading && props.letters.map((letra) => {
                                return (
                                    <div className="flex flex-col w-full">
                                        <h3 className="text-2xl font-bold tracking-tight text-primary-500 dark:text-white mt-5 mb-5">
                                            {letra}
                                        </h3>
                                        <div className="flex flex-wrap w-full">
                                            {
                                                props.entities.filter((entity) => entity.letter === letra).map((items) => {
                                                    return items.data.map((entity) => {
                                                        return (
                                                            <a className="xl:w-1/4 
                                                            lg:w-1/4 w-fit m-5 xl:m-0 text-primary-500 underline-offset-1	hover:cursor-pointer" onClick={() => props.onItemClicked(entity.slug || "")}>
                                                                {entity.name}
                                                            </a>
                                                        )
                                                    })
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PublicEstablishmentPresenter