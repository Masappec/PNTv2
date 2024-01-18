import HeaderTable from "./header";

import { Table as TableFlowbite } from "flowbite-react";
interface Column<T> {
    title: string
    render: (data: T) => React.ReactNode,
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
    onSearch: (search: string) => void;
    search: string;
    onPrevious?: () => void;
    onNext?: () => void;
    currentPage: number;

}

function Table<T>(props: TableProps<T>) {

    return (
        <div className="w-full mx-5">

            <HeaderTable
                isImport={props.isImport}
                textImport={props.textImport}
                textAdd={props.textAdd}
                onAdd={props.onAdd}
                key={props.title}
                onImport={props.onImport}
            />
            <div className="overflow-x-auto">
                <TableFlowbite>
                    <TableFlowbite.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        {
                            props.columns.map(column => (
                                <TableFlowbite.HeadCell key={column.title} className="px-4 py-3">
                                    {column.title}
                                </TableFlowbite.HeadCell>
                            ))
                        }
                    </TableFlowbite.Head>
                    <TableFlowbite.Body>
                        {
                            props.data.map(row => (
                                <TableFlowbite.Row>
                                    {
                                        props.columns.map(column => (
                                            <TableFlowbite.Cell className="px-4 py-3" key={column.title}>
                                                {column.render(row)}
                                            </TableFlowbite.Cell>
                                        ))
                                    }
                                </TableFlowbite.Row>
                            ))
                        }

                    </TableFlowbite.Body>
                </TableFlowbite>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Mostrando
                    <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    de
                    <span className="font-semibold text-gray-900 dark:text-white">{props.length}</span>
                </span>

                <ul className="inline-flex items-stretch -space-x-px">
                    {
                        props.onPrevious && (<li>
                            <a href="#"
                                onClick={() => props.onPrevious && props.onPrevious()}
                                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="">Anterior</span>

                            </a>
                        </li>
                        )
                    }

                    {
                        props.onNext && (<li>
                            <a href="#"
                                onClick={() => props.onNext && props.onNext()}

                                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="">Siguiente</span>

                            </a>
                        </li>
                        )
                    }
                </ul>
            </nav>


        </div>
    )


}

export default Table;