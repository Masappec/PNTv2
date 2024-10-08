import { useEffect, useState } from "react"
import { IoAddCircle } from "react-icons/io5";
import { Row } from "../../../utils/interface";
import { Button, Pagination, Table } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import Input from "../Input";


interface Props {


    data: Row[][];
    isSaved: boolean;
    onSaveTable: (data: Row[][]) => void
    limitRows?: number


}


const DynamicReadTable = (props: Props) => {
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
        console.log("data changed", props.data)
        setData(props.data)
        setTotalPages(Math.ceil(props.data.length / limit))
        setCurrentPage(Math.ceil(props.data.length / limit))
        setFrom((currentPage * limit) - limit + 1)
        setTo(currentPage * limit > props.data.length ? props.data.length : currentPage * limit + 1)

        setDatarows(props.data.slice(0))
    }, [props.data])



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
                value: "Ingrese valor",
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

    /*const handleChanged = (row: number, column: number, value: string) => {

        console.log(row, column, value)
        const copy_data = [...data]
        copy_data[row][column].value = value
        setData(copy_data)
        setDatarows(copy_data)
    }*/

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

    const handleSearch = (value: string) => {
        const copy_data = [...data]
        const filter = copy_data.filter((row) => {
            return row.some((column) => {
                return column.value.toLowerCase().includes(value.toLowerCase())
            })
        })

        setDatarows(filter)
    }

    return (
        <>
            <div className=" flex flex-col">
                <div className="m-2">
                    <Input
                        type="search"
                        placeholder="Buscar por cualquier criterio"
                        onChange={(value) => handleSearch(value.target.value)}

                    />
                </div>
            </div>

            <div className="overflow-x-auto">


                <Table>
                    <Table.Head>
                        {
                            !props.isSaved && <Table.HeadCell className="w-10">

                            </Table.HeadCell>
                        }

                        {
                            data[0].map((column, index) => {
                                return (
                                    <>

                                        <Table.HeadCell key={index}>
                                            {column.value}
                                        </Table.HeadCell>
                                    </>
                                )
                            })
                        }
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {datarows.slice(from, to).map((row, rowIndex) => {
                            return (
                                <>

                                    <Table.Row key={rowIndex}
                                        className={hovered?.row === rowIndex ? "bg-gray-200" : ""}>

                                        {
                                            !props.isSaved && <Table.Cell>
                                                <Button className="w-5 h-5" color="failure" onClick={() => handleRemove(rowIndex, 0, false)} >
                                                    <FaTrash size={10} />
                                                </Button>
                                            </Table.Cell>

                                        }



                                        {row.map((column, columnIndex) => {
                                            return (
                                                <Table.Cell
                                                    key={columnIndex}
                                                    onMouseEnter={() => handleMouseEnter(rowIndex + 1, columnIndex)}


                                                >

                                                    {column.value}

                                                </Table.Cell>
                                            );
                                        })}

                                    </Table.Row>
                                </>
                            );
                        })}
                        {
                            !props.isSaved && (props.limitRows !== (data.length - 1)) ? <Table.Row>
                                <Table.Cell colSpan={data[0].length + 1}>
                                    <Button className="w-full" color="gray" onClick={() => handleClick(data.length - 1)} >
                                        <IoAddCircle size={20} />

                                    </Button>
                                </Table.Cell>
                            </Table.Row> : null
                        }

                    </Table.Body>

                </Table>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Página {currentPage} de {totalPages}
                </p>
                <div className="flex overflow-x-auto sm:justify-center">

                    <Pagination currentPage={currentPage} totalPages={totalPages}
                        onPageChange={onPageChange} showIcons
                        nextLabel="Siguiente"
                        previousLabel="Anterior"
                    />
                </div>
            </div >
        </>
    );
};
export default DynamicReadTable