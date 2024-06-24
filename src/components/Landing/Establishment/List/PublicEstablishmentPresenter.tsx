import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface";
import Select from "../../../Common/Select";
import Spinner from "../../../Common/Spinner";
import Table from "../../../Common/Table";


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
    options: OptionsSelectCreate;
    onSelectType: (type: string) => void;
    selectedType: string;
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
                                        className='mx-[4px] cursor-pointer rounded-md p-2 text-xl text-primary hover:cursor-pointer hover:bg-primary hover:text-white xl:ml-2'>
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
                            onChange={(e) => props.onSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className='max-w-sm'>
                    <label className='text-sm font-medium text-gray-900'>Tipo de Institución</label>

                    <Select
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 
                         text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50'
                        options={[
                            {
                                value: "",
                                label: "Todos"
                            },
                            ...props.options.functions.map((item) => {
                            return {
                                value: item.name,
                                label: item.name
                            }
                        })]}
                        onChange={(e) => props.onSelectType(e.target.value)}
                        selected={{value:props.selectedType}}

                    />
                </div>
            </section>
            <section className='mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-1'>
                {
                    props.loading &&
                    <Spinner />

                }
                <Table

                    show={props.entities.length > 0}
                    
                    columns={
                        [
                            {
                                render: (entity: EstablishmentEntity) => {
                                    return (
                                        <a
                                            className='uppercase cursor-pointer text-primary hover:underline hover:underline-offset-2'
                                            onClick={() => props.onItemClicked(entity.slug || "")}>
                                            {entity.name}
                                        </a>
                                    )
                                },
                                title: 'Institución',
                            },
                            {
                                render: (entity: EstablishmentEntity) => {
                                    return (
                                        <a
                                            className='uppercase cursor-pointer text-primary hover:underline hover:underline-offset-2'
                                            onClick={() => props.onItemClicked(entity.slug || "")}>
                                            {entity.function_organization}
                                        </a>
                                    )
                                },
                                title: 'Tipo de Institución'
                            }
                        ]
                    }
                    data={props.entities.map((entity) => entity.data).flat()}

                />


            </section>

        </section>
    )


}
export default PublicEstablishmentPresenter