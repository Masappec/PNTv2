import { useState } from "react";
import { AnualReportUseCase } from "../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import AnnualReportPresenter from "./AnnualReportPresenter"
import { AnualReportEntity, IndexInformationClassifiedEntity } from "../../../domain/entities/AnualReportEntity";

interface Props {
    usecase: AnualReportUseCase;
}
const AnnualReportContainer = (props: Props) => {

    const [form, setForm] = useState<AnualReportEntity>(AnualReportEntity.buildVoid())
    const [table, setTable] = useState<IndexInformationClassifiedEntity[]>([])



    const addItemsTable = ()=>{
        const newTable = [...table, new IndexInformationClassifiedEntity("","","","",false,"","","",)]
        setTable(newTable)
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await props.usecase.createAnualReport(form);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleTextTable =(index:number, name:keyof IndexInformationClassifiedEntity, value:string)=>{
        const element_name : keyof IndexInformationClassifiedEntity= name
        const element= table[index]
        if (element){
            element[name ] = value as never 
        }

    }

    const handleBooleanTable =(index:number, name:keyof IndexInformationClassifiedEntity, value:boolean)=>{
        const element_name : keyof IndexInformationClassifiedEntity= name
        const element= table[index]
        if (element){
            element[name ] = value as never 
        }

    }

    return (
        <AnnualReportPresenter 
        OnChange={handleChange}
        onSelected={handleSubmit}
        onSubmit={handleSubmit}
        onText={handleAdd}
        Items={table}
        addItemElements={addItemsTable}
        onTextTable={handleTextTable}
        onBooleanTable={handleBooleanTable}
        />

    )
}

export default AnnualReportContainer