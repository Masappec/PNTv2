import { useState } from "react";
import { AnualReportUseCase } from "../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import AnnualReportPresenter from "./AnnualReportPresenter"
import { AnualReportEntity } from "../../../domain/entities/AnualReportEntity";

interface Props {
    usecase: AnualReportUseCase;
}
const AnnualReportContainer = (props: Props) => {

    const [form, setForm] = useState<AnualReportEntity>(AnualReportEntity.buildVoid())
    
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

    return (
        <AnnualReportPresenter 
        OnChange={handleChange}
        onSelected={handleSubmit}
        onSubmit={handleSubmit}
        
        />

    )
}

export default AnnualReportContainer