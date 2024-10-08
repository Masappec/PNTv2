import React, { useEffect, useState } from "react";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import SolicityEditPresenter from "./SolicityEditPresesnter";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import { ColourOption } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import SessionService from "../../../../infrastructure/Services/SessionService";
import { Solicity } from "../../../../domain/entities/Solicity";
import { useNavigate, useParams } from "react-router-dom";
import { formart_send, format_receipt, genders, race_indentification } from "../../../../utils/options";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";
import { formatDate2 } from "../../../../utils/functions";


interface Props {
    usecase: SolicityUseCase;
    publicusecase: PublicUseCase;

}
const SolicityEditContainer = (props: Props) => {

    const [data, setData] = useState<CreateSolicity>({
        number_saip: "",
        city: "",
        text: "",
        first_name: "",
        last_name: "",
        email: "",
        race_identification: "",
        gender: "",
        address: "",
        phone: "",
        format_send: "",
        format_receipt: "",
        establishment: 0
    })
    const [loadingSave, setLoadingSave] = useState<boolean>(false)
    const [solicitySaved, setSolicitySaved] = useState<Solicity>({} as Solicity)
    const { id } = useParams()
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)


    const [entity, setEntity] = useState<EstablishmentEntity>({} as EstablishmentEntity)


    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")

    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [isSend, setIsSend] = useState<boolean>(false)
    const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false)

    const navigate = useNavigate()


    useEffect(() => {

        props.usecase.getSolicityById(parseInt(id || "0")).then((res) => {
            console.log(res)
            const data_ = {
                number_saip: res.number_saip,
                city: res.city,
                text: res.text,
                first_name: res.first_name,
                last_name: res.last_name,
                email: res.email,
                establishment: res.establishment,
                address: res.address,
                phone: res.phone,
                format_receipt: res.format_receipt,
                format_send: res.format_send,
                gender: res.gender,
                race_identification: res.race_identification
            }
            setData(data_)
            setSolicitySaved(res)

            getSelectedEntity(res.establishment)
        }).catch((e) => {
            console.log(e + "error")
            const user = SessionService.getUserData()
            setData({
                ...data,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                number_saip: props.usecase.buildSaipCode().toString()
            })
        })

    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingSend(true)
        data.establishment = entity.id || 0


        if (data.establishment === 0) {

            setIsLoadingSend(false)
            return
        }


        if (data.number_saip === "") {
            setError("El número SAIP es requerido")
            setIsLoadingSend(false)
            return
        }
        if (data.city === "") {
            setError("La ciudad es requerida")
            setIsLoadingSend(false)
            return
        }
        if (data.text === "") {
            setError("El texto es requerido")
            setIsLoadingSend(false)
            return
        }

        if (data.first_name === "") {
            setError("El nombre es requerido")
            setIsLoadingSend(false)
            return
        }
        if (data.last_name === "") {
            setError("El apellido es requerido")
            setIsLoadingSend(false)
            return
        }

        if (data.email === "") {
            setError("El correo es requerido")
            setIsLoadingSend(false)
            return
        }
        data.address = data.city
        if (data.address === "") {
            setError("La dirección es requerida")
            setIsLoadingSend(false)
            return
        }

        if (data.phone === "") {
            setError("El teléfono es requerido")
            setIsLoadingSend(false)
            return
        }

        if (data.format_send === "") {
            setError("El formato de envío es requerido")
            setIsLoadingSend(false)
            return
        }

        if (data.format_receipt === "") {
            setError("El formato de recepción es requerido")
            setIsLoadingSend(false)
            return
        }



        props.usecase.updateSolicity(data, parseInt(id || "0"), true).then((res) => {
            setSolicitySaved(res)
            setIsLoadingSend(false)
            setIsSend(true)


        }).catch((e) => {
            setIsLoadingSend(false)
            setError(e.message)
        })




    }

    const onSaveWithoutSend = () => {
        setLoadingSave(true)
        data.establishment = entity.id || 0


        if (data.establishment === 0) {

            setLoadingSave(false)
            return
        }


        if (data.number_saip === "") {
            setError("El número SAIP es requerido")
            setLoadingSave(false)
            return
        }
        if (data.city === "") {
            setError("La ciudad es requerida")
            setLoadingSave(false)
            return
        }
        if (data.text === "") {
            setError("El texto es requerido")
            setLoadingSave(false)
            return
        }

        if (data.first_name === "") {
            setError("El nombre es requerido")
            setLoadingSave(false)
            return
        }
        if (data.last_name === "") {
            setError("El apellido es requerido")
            setLoadingSave(false)
            return
        }

        if (data.email === "") {
            setError("El correo es requerido")
            setLoadingSave(false)
            return
        }
        data.address = data.city
        if (data.address === "") {
            setError("La dirección es requerida")
            setLoadingSave(false)
            return
        }

        if (data.phone === "") {
            setError("El teléfono es requerido")
            setLoadingSave(false)
            return
        }

        if (data.format_send === "") {
            setError("El formato de envío es requerido")
            setLoadingSave(false)
            return
        }

        if (data.format_receipt === "") {
            setError("El formato de recepción es requerido")
            setLoadingSave(false)
            return
        }



        props.usecase.updateSolicity(data, parseInt(id || "0"), false).then((res) => {
            setSolicitySaved(res)
            setLoadingSave(false)
            setError("")
            setSuccess("Borrador de Solicitud de Acceso a Información Pública guardada con éxito")

        }).catch((e) => {
            setLoadingSave(false)
            setError(e.message)
        })

    }

    const getSelectedEntity = (id: number) => {
        const entity = _establishments.find((item) => item.id === id)
        setEntity(entity || {} as EstablishmentEntity)

    }


    const getSelectedItem = (value: string, options: ColourOption[]) => {
        const item = options.find((item) => item.label === value)
        return item || {} as ColourOption
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setIsChanged(true)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }




    const onChangeSelectEstablishment = (e: ColourOption) => {
        const establishment = _establishments.find((item) => item.slug === e.value)
        setEntity(establishment || {} as EstablishmentEntity)
        setData({
            ...data,
            establishment: parseInt(e.value)
        })
    }


    const onChangeSelect = (e: ColourOption, name: string) => {
        setIsChanged(true)
        setData({
            ...data,
            [name]: e.value
        })

        setSolicitySaved({
            ...solicitySaved,
            [name]: e.value
        })
    }




    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {

        if (inputValue === "") {
            return callback([])
        }

        if (inputValue.length < 3) {
            return
        }
        const filter = _establishments.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        callback(filter.map((item) => {
            const data: ColourOption = {
                value: item.slug || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))




    }





    const onDelete = () => {
        props.usecase.deleteSolicity(parseInt(id || "0")).then(() => {
            navigate('/admin/solicity')
        }).catch((e) => {
            setError(e.message)
        })
    }
    const onCancel = () => {
        navigate('/admin/solicity')
    }

    return (
        <>
            {isSend ? <ScreenMessage message={`
                        Fecha y hora de envío registrada: ${formatDate2(solicitySaved.created_at)}

                        La solicitud que acabas de enviar ya fue entregada a la institución quienes también la revisarán desde el Portal Nacional de Transparencia. Según lo establecido en la LOTAIP, a partir de ahora cuentan con hasta 10 días para responderte. Sigue el proceso indicado en el portal por si necesitas enviar una Insistencia o Gestión Oficiosa en caso de no recibir respuesta.

                        Regresar a Solicitudes
                        
                        `}
                type="Solicitud enviada."
            >
                <div className="flex items-center gap-16 mt-8 justify-center ">


                    <button
                        onClick={() => navigate('/admin/solicity')}
                        className=" text-xl text-white font-medium hover:bg-primary-200 bg-primary-500 w-[300px]  py-2 rounded-lg shadow-xl">
                        Ver SAIP
                    </button>
                </div>
            </ScreenMessage> :
                <SolicityEditPresenter
                    handleSubmit={handleSubmit}
                    onCancel={onCancel}
                    onChange={handleChange}
                    key={0}
                    onDelete={onDelete}
                    loadOptions={loadOptions}
                    error={error}
                    setError={setError}
                    setSuccess={setSuccess}
                    success={success}
                    onChangeSelectEstablishment={onChangeSelectEstablishment}
                    data={data}
                    race_indentification={race_indentification}
                    genders={genders}
                    format_receipt={format_receipt}
                    format_send={formart_send}
                    entitySelected={entity}
                    onChangeSelect={onChangeSelect}
                    solicitySaved={solicitySaved}
                    getSelectedItems={getSelectedItem}
                    isChanged={isChanged}
                    isLoadingSend={isLoadingSend}
                    isSaved={solicitySaved.id ? true : false}
                    isSend={isSend}
                    loadingSave={loadingSave}
                    onSaveWithoutSend={onSaveWithoutSend}
                />}
        </>
    )

}


export default SolicityEditContainer