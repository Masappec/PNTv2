

interface Column<T> {
    title: string
    render: (data: T) => React.ReactNode,
}

interface TableProps<T> {
    columns: Column<T>[]
    title: string;
    description: string;
    onAdd: () => void;
    onImport: () => void;
    onFilter: (type: string) => void;
    length: number;
    textAdd: string;
    textImport: string;
    data: T[];
    onSearch: (search: string) => void;
    search: string;
    onPrevious?: () => void;
    onNext?: () => void;
    currentPage: number;

}

function Table<T>(props: TableProps<T>) {
    return (
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">{props.title}</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                            {props.length}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        {props.description}
                    </p>
                </div>

                <div className="flex items-center mt-4 gap-x-3">
                    

                    <button
                        onClick={() => props.onAdd()}

                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span>
                            {props.textAdd}
                        </span>
                    </button>
                </div>
            </div>

            <div className="mt-6 md:flex md:items-center md:justify-between">
                
                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>

                    <input type="text" placeholder="Search"
                        value={props.search}
                        onChange={(e) => props.onSearch(e.target.value)}
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>

                                        {
                                            props.columns.map((column, index) => (
                                                <th key={index} scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    {column.title}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                    {
                                        props.data.map((row, index) => (
                                            <tr key={index}>
                                                {
                                                    props.columns.map((column, index) => (
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap" key={index}>
                                                            {column.render(row)}
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
                </div>

                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                    {
                        props.onPrevious && (
                            <>
                                <a href="#"
                                    onClick={() => props.onPrevious && props.onPrevious()}
                                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>

                                    <span>
                                        previous
                                    </span>
                                </a>


                            </>
                        )
                    }

                    {
                        props.onNext && (
                            <a href="#"
                                onClick={() => props.onNext && props.onNext()}
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                <span>
                                    Next
                                </span>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Table