import { Pagination, Checkbox,  Table as TableFlowbite } from "flowbite-react";
import { FaSearch } from "react-icons/fa";


interface Column<T> {
    title: string  | React.ReactNode
    render: (data: T) => React.ReactNode,
    classname?: string

    
}

interface TableProps<T> {
    columns: Column<T>[]
    title: string;
    
    onAdd?: () => void;
    onFilter: (type: string) => void;
    data: T[];
    onChangePage?: (page: number) => void;
    currentPage?: number;
    totalPages?: number;
    from?: number;
    to?: number;
    total?: number;
   
    

}

function TableInfo<T>(props: TableProps<T>) {

    return (

        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden w-full border border-gray-200 ">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-6 p-4">
            <div className="w-full md:w-auto">
                <span className="flex items-center text-lg font-bold">
                   Archivos Cargados
                </span>
            </div>

                     


                   <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 ">
                
    
                    <button type="button"
                        onClick={()=>{}}
                        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <FaSearch  className="mr-2" />
                        Buscar
                    </button>
                    </div>
                     </div>
       

            <div className="overflow-x-auto ">
                <TableFlowbite>
                    <TableFlowbite.Head className="text-xs text-gray-700 border bg-gray-200 normal-case gap-40">
                 
                        {
                            props.columns.map(column => (
                                <TableFlowbite.HeadCell  className={"px-10 p py-3"+ column.classname}>
                                    
                                    {column.title} 
                                </TableFlowbite.HeadCell>
                        
                            ))
                        }

                        


                    </TableFlowbite.Head> 
                    <TableFlowbite.Body className="text-sm  divide-gray-200 dark:divide-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800 dark:border-gray-700 divide-y">
                  
                        {
                            props.data.map(row => (
                                <TableFlowbite.Row>
                                    {
                                        props.columns.map(column => (
                                            <TableFlowbite.Cell className="px-4 py-3">
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
                                <Pagination currentPage={props.currentPage || 1
                                } totalPages={props.totalPages} onPageChange={props.onChangePage || (() => { })} />
                            </div>
                        )
                    }


                </ul>
            </nav>


        </div>



    )


}

export default TableInfo;