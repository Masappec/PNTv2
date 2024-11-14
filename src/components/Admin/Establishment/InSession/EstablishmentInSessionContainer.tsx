import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import { useNavigate } from "react-router-dom"
import EstablishmentEditPresenter from "../Edit/EstablishmentEditPresenter"
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface"
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase"
import NumeralDetail from "../../../../domain/entities/NumeralDetail"
import { MultiValue } from "react-select"



const EstablishmentInSessionContainer = ({
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
        usecase.getByUserSession().then((res) => {
            const es = res
            numeralUsecase.getNumeralByEstablishment(es.id || 0).then((res) => {
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
        data.extra_numerals = selectedExtraNumeral.join(',')
        if (data.abbreviation === "" ||
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
        usecase.update(data, data.id + "" || "").then(() => {
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
        navigation("/admin")
    }
    const hangelChangeExtraNumeral = (e: MultiValue<{ value: string, label: string }>) => {

        setSelectedExtraNumeral(e.map((item) => parseInt(item.value)))
        setData({ ...data, extra_numerals: e.map((item) => item.value).join(',') })
    }

    const handleRemoveNumeral = async (numeralId: string) => {
        try {
            // Convetir el numeralID en numero
            const numeralIdAsNumber = parseInt(numeralId, 10);
            if (isNaN(numeralIdAsNumber)) {
                throw new Error(`El numeralId "${numeralId}" no es un numerao valido.`)
            }
            // Llamada al backend para actualizar el estado 
            await numeralUsecase.updateNumeralState(numeralIdAsNumber, {
                isDefault: true,
            });
            // Actualiza el estado local eliminando el numeral del arreglo
            setData((prevData) => {
                const updateNumerals = (prevData.extra_numerals || "")
                    .split(",")
                    .filter((id) => id !== numeralId)
                    .join(",");
                console.log("updateNumerals", updateNumerals);
                return { ...prevData, extra_numerals: updateNumerals};
            });
        } catch (error) {
            console.error("Error al eliminar el numeral:", error)
        }
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
            handleRemoveNumeral={handleRemoveNumeral}
            numerals={numerals}
            getSelectedExtraNumeral={getSelectedExtraNumeral}
            validateFields={validateFields}
        />
    )

}

export default EstablishmentInSessionContainer