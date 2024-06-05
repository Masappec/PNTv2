import { Pagination, Table as TableFlowbite } from "flowbite-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
interface Column<T> {
    title: string
    key?: string
    render: (data: T, index: number) => React.ReactNode,
  
    
}

interface TableProps<T> {
    columns: Column<T>[]

    length?: number;
    data: T[];
    onChangePage?: (page: number) => void;
    currentPage?: number;
    totalPages?: number;
    from?: number;
    to?: number;
    total?: number;
    sorteable?: boolean;
    onSort?: (sort: string) => void;
    columns_sort?: string[];
      className?: string;
}

 
function  TablePublic<T>(props: TableProps<T>) {

    return  (
        <div>

        <div className="tableHeight scrollbar w-full overflow-auto">
        <TableFlowbite className="w-full divide-y divide-gray-200">
            <TableFlowbite.Head className="sticky top-0 z-10 w-full bg-gray-100 text-center">

                {
                    props.columns.map(column => (

                        <TableFlowbite.HeadCell
                            key={column.title} className={`text-sm ${props.sorteable ? 'cursor-pointer' : ''}`}
                            onClick={() => props.onSort && props.onSort(column.key || "")}


                        >
                            <div className={" items-center"+props.className}>
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
                    props.data.map((row, index) => (
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
          <span className='font-semibold text-gray-600'>0 - 0</span>
          de
          <span className='font-semibold text-gray-600'> 0 </span>
        </div>
      </div>
      <div className='flex items-center gap-x-4'>
      
        <a
          className='group flex items-center gap-x-1 text-sm font-medium text-gray-600 hover:text-gray-400'
          href='#'>
          <svg
            className='size-4'
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='currentColor'
            ><path d='M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z'></path>
          </svg>
          <span>Anterior</span>
        </a>
        

        <a
          className='group flex items-center gap-x-1 text-sm font-medium text-gray-600 hover:text-gray-400'
          href='#'>
          <span>Siguiente</span>
          <svg
            className='size-4'
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='currentColor'
            ><path d='m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z'></path>
          </svg>
        </a>
          
      </div>
    </section>
  </footer>
  </div>
    
   
    
    

    )
}
export default TablePublic