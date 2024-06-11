import { useEffect, useState } from "react"
import { Row } from "../../../../../utils/interface"
import DynamicTable from "../../../../Common/DynamicTable"


interface IDataTablePartial {
    index: number
    data: Row[][]
    onSaveTable: (data: Row[][], index: number) => void
    onCancel: () => void
    handleSave: (file: File) => void
    handleCancel: () => void
    file?: File | null
    isSaved: boolean,
    title?: string,
    limit?: number

}
const DataTablePartial = (props: IDataTablePartial) => {

    const [data, setData] = useState<Row[][]>(props.data)

    useEffect   (() => {
        setData(props.data)
        
    }, [props.data])

    const [errorCell, setErrorCell] = useState<{ row: number, column: number }[] >([])


    const validateFieldBlank = (data: Row[][]) => {
        const list: typeof errorCell = [];
        const error = data.some((row, i) => {
            return row.some((cell, j) => {
                if (cell.value === "" || cell.value === null|| cell.value === undefined
                || cell.value === "" || cell.value === null|| cell.value === undefined) {
                    list.push({ row: i, column: j })
                    return true
                }
                return false
            })
        })
        console.log("error", list)
        setErrorCell(list)
        return error
    }

    return <form><div className="grid grid-cols-1 gap-4 m-5 h-auto ">

        <div className="flex  justify-between">
            <h4 className='my-4 text-sm font-semibold text-gray-900'>{props.title}</h4>

            {
                !props.isSaved &&
                <div >
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md mx-4"
                        onClick={(e) => {
                            e.preventDefault()
                            if(validateFieldBlank(data)){
                                return
                            }
                            props.handleSave(props.file as File)
                        
                        }}
                        type="button"
                    >Guardar</button>
                </div>

            }
        </div>
        <DynamicTable
            isSaved={props.isSaved}
            data={data}
            onSaveTable={(data) => props.onSaveTable(data, props.index)}
            limitRows={props.limit}
            errors={errorCell}
        />


    </div></form>
}

export default DataTablePartial