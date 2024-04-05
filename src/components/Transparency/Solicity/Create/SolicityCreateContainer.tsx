import React, { useState } from "react";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import SolicityCreatePresenter from "./SolicityCreatePresenter";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import { ColourOption } from "../../../../utils/interface";


interface Props {
    usecase: SolicityUseCase;
    publicusecase: PublicUseCase;

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
    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [search, setSearch] = useState<boolean>(false)
    const [inputSearch, setInputSearch] = useState<string>("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.usecase.createSolicity(data).then(() => {
            setSuccess("Solicitud creada correctamente")
        }).catch((err) => {
            setError(err.message)
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSelectEstablishment = (e: ColourOption) => {
        setData({
            ...data,
            establishment_id: parseInt(e.value)
        })
    }


    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {

        if (inputValue === "") {
            setSearch(false)
            setInputSearch("")
            return callback([])
        }

        if (inputValue.length < 3) {
            setSearch(false)
            setInputSearch("")
            return
        }
        setInputSearch(inputValue)
        if (!search && !inputSearch.startsWith(inputValue)) {
            props.publicusecase.getEstablishments(inputValue).then((res) => {

                const result = res.results.map((item) => item.data)
                const final: ColourOption[] = []
                result.map((item) => {
                    item.map((_item) => {
                        final.push({
                            value: _item.id?.toString() || "",
                            label: _item.name,
                            color: "#00B8D9"
                        })
                    })
                })

                callback(final)
            }).catch((err) => {
                console.log(err)
            })
        }



    }


    return (
        <>
            <SolicityCreatePresenter
                handleSubmit={handleSubmit}
                onCancel={() => { }}
                onChange={handleChange}
                key={0}
                loadOptions={loadOptions}
                error={error}
                setError={setError}
                setSuccess={setSuccess}
                success={success}
                onChangeSelectEstablishment={onChangeSelectEstablishment}
            />
        </>
    )

}


export default SolicityCreateContainer