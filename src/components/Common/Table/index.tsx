
import HeaderTable from "./header";

import { Pagination } from "flowbite-react";
export interface Column<T> {
    title: string
    key?: string
    render: (data: T, index: number) => React.ReactNode,
    width?: number,
    classes?: string
}

interface TableProps<T> {
    columns: Column<T>[]
    text?: string;
    title?: string;
    description?: string;
    onAdd?: () => void;
    isImport?: boolean;
    onImport?: () => void;
    onFilter?: (type: string) => void;
    length?: number;
    textAdd?: string;
    textImport?: string;
    data: T[];
    onSearch?: (search: string) => void;
    search?: string;
    onChangePage?: (page: number) => void;
    currentPage?: number;
    totalPages?: number;
    from?: number;
    to?: number;
    total?: number;
    show: boolean;
    limits?: number[];
    onChangesLimit?: (limit: number) => void;
    sorteable?: boolean;
    onSort?: (sort: string) => void;
    columns_sort?: string[];
}

function Table<T>({ ...props }: TableProps<T>) {
    const defaultMessage = "No hay datos";
    

    return (
        <div className="container w-full mx-auto">
            {props.show &&
                <HeaderTable
                    isImport={props.isImport}
                    textImport={props.textImport}
                    textAdd={props.textAdd}
                    onAdd={props.onAdd}
                    key={props.title}
                    onImport={props.onImport}
                    onSearch={props.onSearch}
                    limits={props.limits}
                    onChangesLimit={props.onChangesLimit}
                />
            }
            <div className="overflow-x-auto">


                <table className='w-full divide-y divide-gray-200'>
                    <thead className='sticky top-0 z-1 w-full bg-gray-100 text-center'>
                        <tr className='text-sm'>
                            {
                                props.columns.map(column => (

                                    <th scope='col'>
                                        <span className="flex text-center justify-center">
                                            {column.title}
                                            
                                            {
                                                props.sorteable && column.key ?
                                                    <a href='#'
                                                        onClick={() => props.onSort && props.onSort(column.key || '')}
                                                    >
                                                        <svg
                                                            className='size-3'
                                                            aria-hidden='true'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='currentColor'
                                                            viewBox='0 0 24 24'>
                                                            <path
                                                                d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'
                                                            ></path>
                                                        </svg>
                                                    </a>
                                                    : null
                                            }
                                        </span>
                                    </th>

                                ))

                            }
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800'>

                        {
                            props.data.map((row, index) => (

                                <tr>
                                    {
                                        props.columns.map((column) => (
                                            <td key={column.title} className={` ${column.classes || ''}`}>
                                                {column.render(row, index)}
                                            </td>
                                        ))
                                    }

                                </tr>
                            ))

                        }
                        {
                            props.data.length === 0 && (
                                <tr>
                                    <td colSpan={props.columns.length}>
                                        {props.text ? props.text : defaultMessage}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>


            </div>
            {
                (props.totalPages || 0) > 1 && (
                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        {props.totalPages && (<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Mostrando
                            {

                                props.from ?
                                    <> <span className="font-semibold text-gray-500 dark:text-white mr-2">
                                        {props.from} - {props.to}
                                    </span>
                                        <span className=" text-gray-500 dark:text-white mr-2">
                                            de
                                        </span>
                                    </> : <></>
                            }
                            <span className="font-semibold text-gray-500 dark:text-white">{props.total}</span>
                        </span>)}

                        <ul className="inline-flex items-stretch -space-x-px">
                            {
                                props.totalPages && (
                                    <div className="flex overflow-x-auto sm:justify-center">
                                        <Pagination currentPage={props.currentPage || 1
                                        } totalPages={props.totalPages}
                                            onPageChange={props.onChangePage || (() => { })}
                                            nextLabel="Siguiente"
                                            previousLabel="Anterior"
                                            className="bg-transparent"
                                            style={{

                                            }}
                                        />

                                    </div>
                                )
                            }


                        </ul>
                    </nav>
                )
            }


        </div >
    )


}

export default Table;