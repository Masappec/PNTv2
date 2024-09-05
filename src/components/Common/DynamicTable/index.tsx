import { useEffect, useState } from "react"
import { Row } from "../../../utils/interface";
import { Pagination } from "flowbite-react";



interface Props {


    data: Row[][];
    isSaved: boolean;
    onSaveTable: (data: Row[][]) => void
    limitRows?: number
    errors?: { row: number, column: number }[]

}


const DynamicTable = (props: Props) => {
    const [hovered, setHovered] = useState<{ row: number; column: number } | null>(
        null
    );
    const [data, setData] = useState<Row[][]>(props.data)
    const [currentPage, setCurrentPage] = useState(1);
    const [limit,] = useState(15);
    const [totalPages, setTotalPages] = useState(1);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [datarows, setDatarows] = useState<Row[][]>([])

    useEffect(() => {
        setData(props.data)
        setTotalPages(Math.ceil(props.data.length / limit))
        setCurrentPage(Math.ceil(props.data.length / limit))
        setFrom((currentPage * limit) - limit + 1)
        setTo(currentPage * limit > props.data.length ? props.data.length : currentPage * limit + 1)

        setDatarows(props.data.slice(0))
    }, [props.data])

    useEffect(() => {
        props.onSaveTable(data)
    }, [data])

    const handleMouseEnter = (row: number, column: number) => {
        setHovered({ row, column });
    };




    const handleClick = (row: number) => {
        if (props.limitRows) {
            if (data.length > props.limitRows) {
                return
            }
        }

        const copy_data = [...datarows]

        copy_data.splice(row + 1, 0,
            Array.from({ length: copy_data[row].length }, () => ({
                key: Math.random().toString(36).substring(7),
                value: "",
            }))
        )

        setData(copy_data)
        setDatarows(copy_data)
        setTotalPages(Math.ceil(copy_data.length / limit))
        setCurrentPage(Math.ceil(copy_data.length / limit))
        setFrom((currentPage * limit) - limit + 1)
        setTo(currentPage * limit > copy_data.length ? copy_data.length : currentPage * limit + 1)


    }
    const onPageChange = (page: number) => {
        setCurrentPage(page)
        setFrom((page * limit) - limit + 1)
        setTo(page * limit > data.length ? data.length : page * limit + 1)
    }

    const handleChanged = (row: number, column: number, value: string) => {

        const copy_data = [...data]
        copy_data[row][column].value = value
        setData(copy_data)
        setDatarows(copy_data)
    }

    const handleRemove = (row: number, column: number, is_header: boolean) => {
        if (is_header) {
            const copy_data = [...data]

            copy_data.map((_row, index) => {
                if (index !== row) {
                    _row.splice(column, 1)
                }
            })


            copy_data[row].splice(column, 1)
            setData(copy_data)
            setDatarows(copy_data)

        } else {
            let copy_data = [...data]
            copy_data = copy_data.filter((_row, index) => index !== row + 1)
            setData(copy_data)
            setDatarows(copy_data)
        }
    }

    return (

        <div className="scrollbar w-full overflow-x-auto">

            <table className='w-full divide-y divide-gray-200'>
                <thead className='sticky top-0 z-10 w-full bg-gray-100 text-center'>
                    <tr className='text-sm'>

                        {
                            data[0].map((column, index) => {
                                return (

                                    <th scope='col' key={index}>{column.value}</th>
                                )
                            })
                        }

                        {
                            !props.isSaved && <th scope='col'></th>
                        }
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800'>

                    {datarows.slice(from, to).map((row, rowIndex) => {
                        return (

                            <tr key={rowIndex}
                                className={hovered?.row === rowIndex ? "bg-gray-200" : ""}>




                                {row.map((column, columnIndex) => {
                                    return (

                                        <td onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}>
                                            <input
                                                className={`w-full rounded-md 
                                                border border-gray-300 bg-gray-50
                                                 p-2.5 text-sm text-gray-900 outline-primary
                                                  focus:border-cyan-500 focus:ring-cyan-500 
                                                  disabled:cursor-not-allowed disabled:opacity-80
                                                  
                                                    ${props.errors?.some((error) => error.row === rowIndex && error.column === columnIndex) ? 'border-red-500' : 'border-gray-300'}
                                                  `}
                                                type='text'
                                                placeholder={`Ingrese ${data[0][columnIndex].value}`}
                                                name='data'
                                                value={column.value}
                                                onChange={(e) => handleChanged(rowIndex + 1, columnIndex, e.currentTarget.value)}
                                                disabled={props.isSaved}
                                                required
                                            />
                                        </td>
                                    );
                                })}
                                {
                                    !props.isSaved && <td className='text-center'>
                                        <button
                                            onClick={() => handleRemove(rowIndex, 0, false)}
                                            className='mx-auto flex items-center gap-2 rounded-md border border-red-500 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                height='20px'
                                                viewBox='0 -960 960 960'
                                                width='20px'
                                                fill='currentColor'>
                                                <path
                                                    d='M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z'
                                                ></path>
                                            </svg>
                                            <span>Eliminar</span>
                                        </button>
                                    </td>
                                }


                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <footer className='w-full bg-gray-100'>
                {
                    !props.isSaved && (props.limitRows !== (data.length - 1)) ?
                        <section className='flex w-full items-end justify-center gap-2 p-2 text-sm'>
                            <button
                                onClick={() => handleClick(data.length - 1)}
                                className='flex items-center gap-2 rounded-md border border-primary px-2 py-1 font-medium text-primary hover:bg-primary hover:text-white'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='24px'
                                    viewBox='0 -960 960 960'
                                    width='24px'
                                    fill='currentColor'
                                ><path
                                    d='M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'
                                ></path>
                                </svg>
                                <span>Añadir fila</span>
                            </button>
                        </section> : null}
            </footer>


            {
                props.limitRows && props.limitRows < limit ? null :
                    <>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Página {currentPage} de {totalPages}
                        </p>
                        <div className="flex overflow-x-auto sm:justify-center">

                            <Pagination currentPage={currentPage} totalPages={totalPages}
                                onPageChange={onPageChange} showIcons
                                nextLabel="Siguiente"
                                previousLabel="Anterior"
                            />
                        </div></>
            }

        </div >
    );
};
export default DynamicTable