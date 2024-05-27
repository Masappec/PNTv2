import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import HeaderTable from "./header";

import { Pagination, Table as TableFlowbite } from "flowbite-react";
interface Column<T> {
    title: string
    key?: string
    render: (data: T, index: number) => React.ReactNode,
    width?: number
}

interface TableProps<T> {
    columns: Column<T>[]
    title: string;
    description: string;
    onAdd?: () => void;
    isImport?: boolean;
    onImport?: () => void;
    onFilter: (type: string) => void;
    length: number;
    textAdd?: string;
    textImport?: string;
    data: T[];
    onSearch?: (search: string) => void;
    search: string;
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
                <TableFlowbite className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-400">
                    <TableFlowbite.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        {
                            props.columns.map(column => (

                                <TableFlowbite.HeadCell
                                    key={column.title} className={`px-4 py-3 ${props.sorteable ? 'cursor-pointer' : ''}`}
                                    onClick={() => props.onSort && props.onSort(column.key || "")}


                                >
                                    <div className="flex items-center">
                                        <span className="mr-2">
                                            {column.title}
                                        </span>
                                        {
                                            props.sorteable ?
                                                props.columns_sort &&
                                                    props.columns_sort.includes(column.key || "") ?
                                                    <FaChevronDown /> : <FaChevronUp />
                                                : null
                                        }
                                    </div>


                                </TableFlowbite.HeadCell>
                            ))
                        }
                    </TableFlowbite.Head>
                    <TableFlowbite.Body className="text-sm divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800">
                        {
                            props.data.map((row, index) => (
                                <TableFlowbite.Row>
                                    {
                                        props.columns.map((column) => (
                                            <TableFlowbite.Cell

                                                className={`px-4 py-3 `}
                                                key={column.title}>
                                                {column.render(row, index)}
                                            </TableFlowbite.Cell>
                                        ))
                                    }
                                </TableFlowbite.Row>
                            ))
                        }
                        {
                            props.data.length === 0 && (
                                <TableFlowbite.Row>
                                    <TableFlowbite.Cell className="px-4 py-3 text-center" colSpan={props.columns.length}>
                                        No hay datos
                                    </TableFlowbite.Cell>
                                </TableFlowbite.Row>
                            )
                        }

                    </TableFlowbite.Body>
                </TableFlowbite>
            </div>
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
                                />
                            </div>
                        )
                    }


                </ul>
            </nav>


        </div >
    )


}

export default Table;