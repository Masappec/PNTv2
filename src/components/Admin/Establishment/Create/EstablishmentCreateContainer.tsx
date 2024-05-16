import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import EstablishmentCreatePresenter from "./EstablishmentCreatePresenter"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import { useNavigate } from "react-router-dom"
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface"
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase"
import NumeralDetail from "../../../../domain/entities/NumeralDetail"
import { sleep } from "../../../../utils/functions"
import { MultiValue } from "react-select"



const EstablishmentCreateContainer = ({
    usecase,
    numeralUsecase
}: {
    usecase: EstablishmentUseCase;
    numeralUsecase: NumeralUseCase
}) => {


    const navigation = useNavigate()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<OptionsSelectCreate>({
        functions: [],
        organizations: [],
        institutions: []

    })

    const [modified, setModified] = useState<boolean>(false)
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
        extra_numerals:''
    })
    const [selectedExtraNumeral, setSelectedExtraNumeral] = useState<number[]>([])
    const [numerals, setNumerals] = useState<NumeralDetail[]>([])

    useEffect(() => {
        usecase.getOptions().then((res) => {
            setOptions(res)
        }
        ).catch((err) => {
            console.log(err)
        })

    }, [])

    useEffect(() => {
        numeralUsecase.getNumeralsAllowed().then((res) => {
            setNumerals(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        data.extra_numerals = selectedExtraNumeral.join(',')
        /*abbreviation: "",
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
        extra_numerals:''*/
        if (data.abbreviation === ""  || 
        data.email_authority === "" || data.first_name_authority === "" || 
        data.highest_authority === "" || data.last_name_authority === "" || 
        data.job_authority === "" || data.name === "" || 
        data.email_accesstoinformation === "" || data.email_committe === "" || 
        data.first_name_committe === "" || data.highest_committe === "" ||
         data.job_committe === "" || data.last_name_committe === "" ||
          data.identification === "") {
            setError("Ingrese los campos requeridos")
            setLoading(false)
            return
        }
        if (data.logo === "") {
            setError("Debe seleccionar un logo")
            setLoading(false)
            return
        }
        
        usecase.Create(data).then((res) => {
            console.log(res)
            setLoading(false)
            setSuccess("Se ha creado la Institución")
            setError("")
            sleep(2000).then(() => {
                navigation("/admin/entities")
            })
        }).catch((err) => {
            console.log(err)
            setError(err.message)
            setModified(false)
            setSuccess("")
            setLoading(false)
        })


    }

    const validateFields = (name: string) => {
        if (modified) {
            console.log(data[name as keyof EstablishmentEntity], name)
            if (data[name as keyof EstablishmentEntity] == "" || data[name as keyof EstablishmentEntity] == null
                || data[name as keyof EstablishmentEntity] == undefined) {
                return 'failure'
            }
            return 'success'
        }
        return 'default'
    }
    const handleChageLogo = (e: ChangeEvent<HTMLInputElement>) => {
        setModified(true)
        const file = e.target.files;
        if (!file) return
        const image = file[0]
        setData({ ...data, logo: image })

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setModified(true)
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleCancel = () => {
        navigation("/admin/entities")
    }

    const hangelChangeExtraNumeral = (e: MultiValue<{ value: string, label: string }>) => {
        
        setSelectedExtraNumeral(e.map((item) => parseInt(item.value)))
        setData({ ...data, extra_numerals: e.map((item) => item.value).join(',') })
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
            options={options}
            numerals={numerals}
            validateFields={validateFields}
            hangelChangeExtraNumeral={hangelChangeExtraNumeral}
        />
    )

}

export default EstablishmentCreateContainer