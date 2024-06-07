import EstablishmentEntity from "../../../../domain/entities/Establishment"
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
    onSearch: (search: string) => void;
}

const PublicEstablishmentPresenter = (props: Props) => {

    return (
        <section className='section-container my-16'>
            <h1 className='mb-8 text-balance text-2xl font-normal leading-tight md:text-[40px]'>
                Instituciones que publican en el Portal
            </h1>

            <div className='mb-4 flex max-w-2xl flex-wrap items-center'>
                {
                    props.letters.map((letter, i) => {
                        return (
                            <div className='flex flex-row mt-3'>
                                <p className='text-primary mx-[3px] text-xl'>
                                    {i === 0 ? "" : i % 3 === 0 ? "  " : "-"}
                                </p>
                                <div>
                                    <a
                                        onClick={() => props.onPageChange(letter)}
                                        className='mx-[4px] rounded-md p-2 text-xl text-primary hover:cursor-pointer hover:bg-primary hover:text-white xl:ml-2'>
                                        {letter}
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
               
            </div>
            <section className='grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='max-w-sm'>
                    <label className='text-sm font-medium text-gray-900'>Institución</label>

                    <div className='group relative'>
                        <svg
                            className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-hover:text-primary'
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
                            placeholder='Buscar por nombre'
                            name='first_name'
                            value=''
                        />
                    </div>
                </div>

                <div className='max-w-sm'>
                    <label className='text-sm font-medium text-gray-900'>Tipo de Institución</label>

                    <div className='group relative'>
                        <svg
                            className='absolute left-2 top-3 mt-auto h-5 w-5 text-gray-300 group-hover:text-primary'
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
                            placeholder='Buscar por tipo'
                            name='first_name'
                            value=''
                        />
                    </div>
                </div>
            </section>
            <section className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {
                    props.loading &&
                    <Spinner />

                }
                <article className='flex w-full flex-col'>

                {
                    !props.loading && props.letters.filter((letter) => props.entities.some((entity) => entity.letter === letter)).map((letra) => {
                        return (
                            <>

                                <h3 className='mb-4 text-2xl font-bold tracking-tight text-primary'>{letra}</h3>
                                {
                                    props.entities.filter((entity) => entity.letter === letra).map((items) => {
                                        return items.data.map((entity) => {
                                            return (

                                                <div className='flex flex-col gap-y-2 mt-2'>
                                                    <a
                                                        className='uppercase text-primary hover:underline hover:underline-offset-2'
                                                        onClick={() => props.onItemClicked(entity.slug || "")}>
                                                        {entity.name}
                                                    </a>
                                                </div>
                                            )
                                        })
                                    })
                                }
                            </>
                        )
                    })

                }
                </article>

            </section>

        </section>
    )

    /*
    return (
        <div className="flex flex-col w-full  bg-white pr-10">
            <div></div>
            <div className="border-l-[1px]  border-gray-800 ml-8 md:ml-14">

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
                                onChange={(e) => props.onSearch(e.target.value)}
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
                            !props.loading && props.letters.filter((letter) => props.entities.some((entity) => entity.letter === letter)).map((letra) => {
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
    )*/
}
export default PublicEstablishmentPresenter