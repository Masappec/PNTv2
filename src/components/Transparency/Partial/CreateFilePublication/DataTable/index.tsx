import { useState } from "react"
import { Row } from "../../../../../utils/interface"
import DynamicTable from "../../../../Common/DynamicTable"
import Input from "../../../../Common/Input"


interface IDataTablePartial {
    index: number
    data: Row[][]
    onSaveTable: (data: Row[][], index: number) => void
    onCancel: () => void
    handleSave: (file: File, name: string, description: string, index: number) => void
    handleCancel: () => void
    file?: File | null
    isSaved: boolean,
    title?: string

}
const DataTablePartial = (props: IDataTablePartial) => {

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")


    return <div className="grid grid-cols-1 gap-4 m-5 h-auto ">

        <div className="flex m-5 justify-between">
            <h1 className="text-2xl font-bold">{props.title}</h1>

            {
                !props.isSaved &&
                <div >
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md mx-4"
                        onClick={() => props.handleSave(props.file as File, title, description, props.index)}
                        type="button"
                    >Guardar</button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md mx-4"
                        onClick={props.handleCancel}
                        type="button"
                    >Cancelar</button>
                </div>

            }
        </div>
        <DynamicTable
            isSaved={props.isSaved}
            data={props.data}
            onSaveTable={(data) => props.onSaveTable(data, props.index)}
        />


    </div>
}

export default DataTablePartial