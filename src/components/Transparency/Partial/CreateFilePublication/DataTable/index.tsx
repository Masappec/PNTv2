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


    return <div className="grid grid-cols-1 gap-4 m-5 h-auto ">

        <div className="flex m-5 justify-between">
            <h1 className="text-2xl font-bold">{props.title}</h1>

            {
                !props.isSaved &&
                <div >
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md mx-4"
                        onClick={() => props.handleSave(props.file as File)}
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
        />


    </div>
}

export default DataTablePartial