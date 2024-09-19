import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import { useNavigate, useParams } from "react-router-dom"
import EstablishmentEditPresenter from "./EstablishmentEditPresenter"
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface"
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase"
import NumeralDetail from "../../../../domain/entities/NumeralDetail"
import { MultiValue } from "react-select"



const EstablishmentEditContainer = ({
    usecase,
    numeralUsecase
}: {
    usecase: EstablishmentUseCase;
    numeralUsecase: NumeralUseCase
}) => {


    const navigation = useNavigate()
    const { id } = useParams()

    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedExtraNumeral, setSelectedExtraNumeral] = useState<number[]>([])
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
        extra_numerals: ''
    })
    const [options, setOptions] = useState<OptionsSelectCreate>({
        functions: [],
        organizations: [],
        institutions: []

    })
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

    useEffect(() => {
        usecase.detail(id || "").then((res) => {
            const es = res
            numeralUsecase.getNumeralByEstablishment(parseInt(id || "0")).then((res) => {
                const res_ = res.filter((item) => !item.isDefault).map((item) => item.id)
                setData({ ...es, extra_numerals: res_.join(',') })
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            setError(err.message)
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        data.highest_authority = "NINGUNO"
        data.highest_committe = "NINGUNO" 
        data.extra_numerals = selectedExtraNumeral.join(',')
        console.log(data)

        if (data.name === "") {
            setError("Ingrese el nombre")
            setLoading(false)
            return
        }
        if(data.abbreviation ===""){
            setError("Ingrese la abreviatura")
            setLoading(false)
            return
        }
        if(data.email_authority ===""){
            setError("Ingrese el correo de la autoridad")
            setLoading(false)
            return
        }
        if(data.first_name_authority ===""){
            setError("Ingrese el nombre de la autoridad")
            setLoading(false)
            return
        }
        if(data.highest_authority ===""){
            setError("Ingrese el cargo de la autoridad")
            setLoading(false)
            return
        }
        if(data.last_name_authority ===""){
            setError("Ingrese el apellido de la autoridad")
            setLoading(false)
            return
        }
        if(data.job_authority ===""){
            setError("Ingrese el trabajo de la autoridad")
            setLoading(false)
            return
        }
        
        if(data.email_accesstoinformation ===""){
            setError("Ingrese el correo de acceso a la información")
            setLoading(false)
            return
        }
        if(data.email_committe ===""){
            setError("Ingrese el correo del comité")
            setLoading(false)
            return
        }
        if(data.first_name_committe ===""){
            setError("Ingrese el nombre del comité")
            setLoading(false)
            return
        }
        
        if(data.job_committe ===""){
            setError("Ingrese el trabajo del comité")
            setLoading(false)
            return
        }
        if(data.last_name_committe ===""){
            setError("Ingrese el apellido del comité")
            setLoading(false)
            return
        }

        if (data.identification === "") {
            setError("Ingrese la identificación")
            setLoading(false)
            return
        }

        if (data.name.length < 3) {
            setError("El nombre debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.abbreviation.length < 3) {
            setError("La abreviatura debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.email_authority.length < 3) {
            setError("El correo de la autoridad debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.first_name_authority.length < 3) {
            setError("El nombre de la autoridad debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.highest_authority.length < 3) {
            setError("El cargo de la autoridad debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.last_name_authority.length < 3) {
            setError("El apellido de la autoridad debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.job_authority.length < 3) {
            setError("El trabajo de la autoridad debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.email_accesstoinformation == undefined || data.email_accesstoinformation.length < 3) {
            setError("El correo de acceso a la información debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.email_committe == undefined || data.email_committe.length < 3) {
            setError("El correo del comité debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.first_name_committe == undefined || data.first_name_committe.length < 3) {
            setError("El nombre del comité debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.highest_committe.length < 3) {
            setError("El cargo del comité debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.job_committe == undefined || data.job_committe.length < 3) {
            setError("El trabajo del comité debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.last_name_committe == undefined || data.last_name_committe.length < 3) {
            setError("El apellido del comité debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }

        if (data.identification.length < 3) {
            setError("La identificación debe tener al menos 3 caracteres")
            setLoading(false)
            return
        }
        if (data.logo === "") {
            setError("Debe seleccionar un logo")
            setLoading(false)
            return
        }
        usecase.update(data, id || "").then(() => {
            setSuccess("Institución actualizada correctamente")
            setLoading(false)
        }).catch((err) => {
            setModified(false)
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


    const getSelectedExtraNumeral = (extra_numerals: string) => {
        const numerals_selected = extra_numerals.split(',')
        const selected = numerals.map((numeral) => {
            if (numerals_selected.includes(numeral.id.toString())) {
                return { value: numeral.id.toString(), label: numeral.name }
            }
            return null
        }).filter((item) => item !== null) as MultiValue<{ value: string, label: string }>
        return selected
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleCancel = () => {
        navigation("/admin/entities")
    }
    const hangelChangeExtraNumeral = (e: MultiValue<{ value: string, label: string }>) => {

        setSelectedExtraNumeral(e.map((item) => parseInt(item.value)))
        setData({ ...data, extra_numerals: e.map((item) => item.value).join(',') })
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
            hangelChangeExtraNumeral={hangelChangeExtraNumeral}
            numerals={numerals}
            getSelectedExtraNumeral={getSelectedExtraNumeral}
            validateFields={validateFields}
        />
    )

}

export default EstablishmentEditContainer