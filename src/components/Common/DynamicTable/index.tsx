import { useEffect, useState } from "react"
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { Row } from "../../../utils/interface";
import { Button, Pagination, Table } from "flowbite-react";


interface Props {


    data: Row[][];
    isSaved: boolean;
    onSaveTable: (data: Row[][]) => void
    limitRows?: number


}


const DynamicTable = (props: Props) => {
    const [hovered, setHovered] = useState<{ row: number; column: number } | null>(
        null
    );
    const [data, setData] = useState<Row[][]>(props.data)
    const [currentPage, setCurrentPage] = useState(1);
    const [limit,] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);


    useEffect(() => {
        setData(props.data)
    }, [props.data])

    useEffect(() => {
        props.onSaveTable(data)
    }, [data])

    const handleMouseEnter = (row: number, column: number) => {
        setHovered({ row, column });
    };




    const handleClick = (row: number) => {
        console.log(data.length, props.limitRows)
        if (props.limitRows) {
            if (data.length > props.limitRows) {
                return
            }
        }

        const copy_data = [...data]

        copy_data.splice(row + 1, 0,
            Array.from({ length: copy_data[row].length }, () => ({
                key: Math.random().toString(36).substring(7),
                value: "Ingrese valor",
            }))
        )

        setData(copy_data)
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

        console.log(row, column, value)
        const copy_data = [...data]
        copy_data[row][column].value = value
        setData(copy_data)
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

        } else {
            const copy_data = [...data]
            copy_data.splice(row, 1)
            setData(copy_data)
        }
    }

    return (

        <div className="overflow-x-auto">


            <Table>
                <Table.Head>

                    <Table.HeadCell className="w-10">

                    </Table.HeadCell>

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
                    {data.slice(from, to).map((row, rowIndex) => {
                        return (
                            <>

                                <Table.Row key={rowIndex}
                                    className={hovered?.row === rowIndex ? "bg-gray-200" : ""}>

                                    <Table.Cell>
                                        <Button className="w-5 h-5" color="failure" onClick={() => handleRemove(rowIndex, 0, false)} >
                                            <IoCloseCircle size={20} />
                                        </Button>
                                    </Table.Cell>



                                    {row.map((column, columnIndex) => {
                                        return (
                                            <Table.Cell
                                                key={columnIndex}
                                                onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}

                                                contentEditable={!props.isSaved}
                                                onChange={(e) => handleChanged(rowIndex, columnIndex, e.currentTarget.nodeValue || "")}
                                            >
                                                {column.value}

                                            </Table.Cell>
                                        );
                                    })}

                                </Table.Row>
                            </>
                        );
                    })}
                    <Table.Row>
                        <Table.Cell colSpan={data[0].length + 1}>
                            <Button className="w-full" color="gray" onClick={() => handleClick(data.length - 1)} >
                                <IoAddCircle size={20} />

                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                Página {currentPage} de {totalPages}
            </p>
            <div className="flex overflow-x-auto sm:justify-center">

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
            </div>
        </div >
    );
};
export default DynamicTable