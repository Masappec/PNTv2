import React, { useState } from "react";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import SolicityCreatePresenter from "./SolicityCreatePresenter";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import { ColourOption } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";


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
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)

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
            const filter = _establishments.filter((item) => {
                return item.name.toLowerCase().includes(inputValue.toLowerCase())
            })
            setSearch(false)
            callback(filter.map((item) => {
                const data: ColourOption = {
                    value: item.slug || "",
                    label: item.name,
                    color: "#00B8D9",
                }
                return data;
            }))
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