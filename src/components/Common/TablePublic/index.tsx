import { Pagination, Table as TableFlowbite } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
interface Column<T> {
    title: string
    key?: string
    render: (data: T, index: number) => React.ReactNode,
    className?: string

}

interface TableProps<T> {
    columns: Column<T>[]

    length?: number;
    data: T[];
    currentPage?: number;
    totalPages?: number;
    from?: number;
    to?: number;
    total?: number;
    sorteable?: boolean;
    onSort?: (sort: string) => void;
    columns_sort?: string[];
    className?: string;
    showing?: number;
    Notpaginable?:boolean;
}


function TablePublic<T>(props: TableProps<T>) {

    const [data, setData] = useState<T[]>(props.data)
    const [currentPage, setCurrentPage] = useState(1);
    const [limit,] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);

    useEffect(() => {
        setData(props.data.slice((currentPage * limit) - limit, currentPage * limit))
        setTotalPages(Math.ceil(props.data.length / limit))
        setFrom((currentPage * limit) - limit + 1)
        setTo(currentPage * limit > props.data.length ? props.data.length : currentPage * limit + 1)
    }, [props.data])

    const onPageChange = (page: number) => {
        setCurrentPage(page)
        setFrom((page * limit) - limit + 1)
        setTo(page * limit > data.length ? data.length : page * limit + 1)
        setData(props.data.slice((page * limit) - limit, page * limit))
    }
    return (
        <div>

            <div className="tableHeight scrollbar w-full overflow-auto">
                <TableFlowbite className="w-full divide-y divide-gray-200">
                    <TableFlowbite.Head className="sticky top-0 z-10 w-full bg-gray-100 text-center">

                        {
                            props.columns.map(column => (

                                <TableFlowbite.HeadCell
                                    key={column.title} className={`text-sm ${props.sorteable ? 
                                        'cursor-pointer' : ''} ${column.className}`}
                                    onClick={() => props.onSort && props.onSort(column.key || "")}
                                    

                                >
                                    <div className={" items-center" + props.className}>
                                        <span className=" text-center">
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
                    <TableFlowbite.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                        {
                            data.map((row, index) => (
                                <TableFlowbite.Row>
                                    {
                                        props.columns.map((column) => (
                                            <TableFlowbite.Cell

                                                className={`text-center `}
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
                                    <TableFlowbite.Cell className="text-center" colSpan={props.columns.length}>
                                        No hay datos para mostrar
                                    </TableFlowbite.Cell>
                                </TableFlowbite.Row>
                            )
                        }

                    </TableFlowbite.Body>
                </TableFlowbite>
            </div>
            <footer className='w-full bg-gray-100'>
                <section
                    className='flex w-full flex-col items-end justify-between gap-2 space-x-3 p-2 text-sm sm:flex-row sm:items-center'>

                    {
                        props.showing && (

                            <div className='flex items-center gap-4 font-normal text-gray-400'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <span>Mostrar</span>
                                    <select
                                        className='block w-max rounded-md border border-gray-300 bg-gray-50 p-1 text-sm text-gray-600 focus:ring-primary'>
                                        <option value='5'>5</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='40'>40</option>
                                        <option value='50'>50</option>
                                    </select>
                                </div>

                                <div>
                                    <span className='font-semibold text-gray-600'>{from} - {to}</span>
                                    de
                                    <span className='font-semibold text-gray-600'> {props.data.length} </span>
                                </div>
                            </div>
                        )
                    }
                    <div className='flex items-center gap-x-4'>

                        {!props.Notpaginable || props.Notpaginable==undefined  ?<Pagination currentPage={currentPage} totalPages={totalPages}
                            onPageChange={onPageChange} showIcons
                            nextLabel="Siguiente"
                            previousLabel="Anterior"
                        />:null
                }

                    </div>
                </section>
            </footer>
        </div>





    )
}
export default TablePublic