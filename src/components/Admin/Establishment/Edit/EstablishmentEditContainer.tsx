import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import { useNavigate, useParams } from "react-router-dom"
import EstablishmentEditPresenter from "./EstablishmentEditPresenter"
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface"



const EstablishmentEditContainer = ({
    usecase
}: {
    usecase: EstablishmentUseCase
}) => {


    const navigation = useNavigate()
    const { id } = useParams()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [data, setData] = useState<EstablishmentEntity>({
        abbreviation: "",
        code: "",
        email_authority: "",
        first_name_authority: "",
        highest_authority: "",
        last_name_authority: "",
        job_authority: "",
        logo: "",
        name: "",
        email_accesstoinformation: "",
        email_committe: "",
        first_name_committe: "",
        highest_committe: "",
        job_committe: "",
        last_name_committe: "",
        identification: "",
    })
    const [options, setOptions] = useState<OptionsSelectCreate>({
        functions: [],
        organizations: [],
        institutions: []

    })

    useEffect(() => {
        usecase.getOptions().then((res) => {
            setOptions(res)
        }
        ).catch((err) => {
            console.log(err)
        })

    }, [])

    useEffect(() => {
        usecase.detail(id || "").then((res) => {
            setData(res)
        }).catch((err) => {
            setError(err.message)
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        usecase.update(data, id || "").then(() => {
            setSuccess("Establecimiento actualizado correctamente")
            setLoading(false)
        }).catch((err) => {
            setError(err.message)
            setLoading(false)
        })


    }
    const handleChageLogo = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files;
        if (!file) return
        const image = file[0]
        setData({ ...data, logo: image })

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleCancel = () => {
        navigation("/admin/entities")
    }

    return (
        <EstablishmentEditPresenter
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
            data={data}
            setData={handleChange}
            onChageLogo={handleChageLogo}
            error={error}
            loading={loading}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            options={options}

        />
    )

}

export default EstablishmentEditContainer