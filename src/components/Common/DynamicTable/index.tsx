import { useEffect, useState } from "react"
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import { Row } from "../../../utils/interface";


interface Props {

    
    data: Row[][];
    isSaved: boolean;
    onSaveTable: (data: Row[][]) => void


}


const DynamicTable = (props: Props) => {
    const [hovered, setHovered] = useState<{ row: number; column: number } | null>(
        null
    );
    const [data, setData] = useState<Row[][]>(
        [
            [
                {
                    key: "1",
                    value: "Ingrese valor",
                    is_header: true
                },
                {
                    key: "2",
                    value: "Ingrese valor",
                    is_header: true
                },

            ],
            [
                {
                    key: "4",
                    value: "Ingrese valor",
                },
                {
                    key: "5",
                    value: "Ingrese valor",
                }
            ],

        ],


    )

    useEffect(() => {
        props.onSaveTable(data)
    }, [data])

    const handleMouseEnter = (row: number, column: number) => {
        setHovered({ row, column });
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };



    const handleClick = (row: number, column: number, isheader: boolean) => {
        if (isheader) {
            const copy_data = [...data]

            copy_data[row].splice(column + 1, 0, {
                key: Math.random().toString(36).substring(7),
                value: "Ingrese valor",
                is_header: true
            })

            copy_data.map((_row, index) => {
                if (index !== row) {
                    _row.splice(column + 1, 0, {
                        key: Math.random().toString(36).substring(7),
                        value: "Ingrese valor",
                    })
                }
            })

            setData(copy_data)
        } else {
            const copy_data = [...data]

            copy_data.splice(row + 1, 0,
                Array.from({ length: copy_data[row].length }, () => ({
                    key: Math.random().toString(36).substring(7),
                    value: "Ingrese valor",
                }))
            )

            setData(copy_data)
        }

    }

    const handleChanged = (row: number, column: number, value: string) => {

        console.log(row, column, value)
        const copy_data = [...data]
        copy_data[row][column].value = value
        setData(copy_data)
    }
    
    const handleRemove = (row: number, column: number, is_header:boolean) => {
        if(is_header){
            const copy_data = [...data]

            copy_data.map((_row, index) => {
                if (index !== row) {
                    _row.splice(column, 1)
                }
            })


            copy_data[row].splice(column, 1)
            setData(copy_data)

        }else{
            const copy_data = [...data]
            copy_data.splice(row, 1)
            setData(copy_data)
        }
    }

    return (

        <div className="overflow-x-auto">

            
            <table className="divide-y min-w-full divide-gray-200">
                <tbody>
                    {data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((column, columnIndex) => {
                                    const isHovered =
                                        hovered && hovered.row === rowIndex && hovered.column === columnIndex;
                                    return (
                                        <td
                                            key={columnIndex}
                                            className={`border border-gray-600 px-4 py-2 ${isHovered ? 'bg-gray-300 justify-between flex' : ''}
                                                    ${column.is_header ? 'bg-primary-300 ' : 'bg-white'}
                                                    ${column.value === "" ? 'py-4' : ''}
                        
                                                    `}
                                            onMouseEnter={() => handleMouseEnter(rowIndex, columnIndex)}
                                            onMouseLeave={handleMouseLeave}
                                            contentEditable={!props.isSaved}
                                            onChange={(e) => handleChanged(rowIndex, columnIndex, e.currentTarget.nodeValue || "")}
                                        >
                                            {column.value}
                                            {isHovered  && !props.isSaved ? (
                                                <div className="flex flex-col">
                                                    <button type="button" className=" text-primary-700 m-2" onClick={() => handleClick(rowIndex, columnIndex, column.is_header || false)}>
                                                        <IoAddCircle size={20} />
                                                    </button>
                                                    <button type="button" className=" text-red-500 m-2" onClick={() => handleRemove(rowIndex, columnIndex, column.is_header ||false)}>
                                                        <IoCloseCircle size={20} />
                                                    </button>
                                                </div>
                                            ):null}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
};
export default DynamicTable