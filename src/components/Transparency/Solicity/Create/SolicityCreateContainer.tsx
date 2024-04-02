import React, { useState } from "react";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import SolicityCreatePresenter from "./SolicityCreatePresenter";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";


interface Props {
    usecase: SolicityUseCase;
}
const SolicityCreateContainer = (props: Props) => {

    const [data, setData] = useState<CreateSolicity>({
        address: "",
        description: "",
        email: "",
        establishment_id: 0,
        first_name: "",
        formatSolicity: "",
        identification: "",
        last_name: "",
        phone: "",
        type_reception: ""
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.usecase.createSolicity(data)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }





    return (
        <>
            <SolicityCreatePresenter
                handleSubmit={handleSubmit}
                onCancel={() => { }}
                onChange={handleChange}
                key={0}
            />
        </>
    )

}


export default SolicityCreateContainer