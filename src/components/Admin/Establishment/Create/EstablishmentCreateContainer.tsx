import { ChangeEvent, FormEvent, useState } from "react"
import EstablishmentCreatePresenter from "./EstablishmentCreatePresenter"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import { useNavigate } from "react-router-dom"



const EstablishmentCreateContainer = ({
    usecase
}:{
    usecase:EstablishmentUseCase
}) => {


    const navigation = useNavigate()

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
    })



    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        usecase.Create(data).then((res) => {
            console.log(res)
            setLoading(false)
            setSuccess("Se ha creado la Institución")
        }).catch((err) => {
            console.log(err)
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleCancel = () => {
        navigation("/admin/entities")
    }

    return (
        <EstablishmentCreatePresenter
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

        />
    )

}

export default EstablishmentCreateContainer