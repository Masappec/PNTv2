import HeaderTable from "./header";

import { Pagination, Table as TableFlowbite } from "flowbite-react";
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
    onChangePage: (page: number) => void;
    currentPage: number;
    totalPages: number;
    from: number;
    to: number;
    total: number;
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
                onSearch={props.onSearch}
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
                    {

                        props.from ?
                            <> <span className="font-semibold text-gray-900 dark:text-white">
                                {props.from} - {props.to}
                            </span>
                                de
                            </> : <></>
                    }
                    <span className="font-semibold text-gray-900 dark:text-white">{props.total}</span>
                </span>

                <ul className="inline-flex items-stretch -space-x-px">
                    {
                        props.totalPages && (
                            <div className="flex overflow-x-auto sm:justify-center">
                                <Pagination currentPage={props.currentPage} totalPages={props.totalPages} onPageChange={props.onChangePage} />
                            </div>
                        )
                    }


                </ul>
            </nav>


        </div>
    )


}

export default Table;