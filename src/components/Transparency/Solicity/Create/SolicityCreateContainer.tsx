import React, { useEffect, useState } from "react";
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import SolicityCreatePresenter from "./SolicityCreatePresenter";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import { ColourOption } from "../../../../utils/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import SessionService from "../../../../infrastructure/Services/SessionService";
import { Solicity } from "../../../../domain/entities/Solicity";
import { formatDate2, sleep } from "../../../../utils/functions";
import { useNavigate } from "react-router-dom";
import UserEntity from "../../../../domain/entities/UserEntity";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";


interface Props {
    usecase: SolicityUseCase;
    publicusecase: PublicUseCase;

}
const SolicityCreateContainer = (props: Props) => {

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

    const [solicitySaved, setSolicitySaved] = useState<Solicity>({} as Solicity)
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)


    const [entity, setEntity] = useState<EstablishmentEntity>({} as EstablishmentEntity)

    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")

    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [isSend, setIsSend] = useState<boolean>(false)
    const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)
    const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false)

    const [userSession, setUserSession] = useState<UserEntity>({} as UserEntity)

    const navigate = useNavigate()

    useEffect(() => {


        const user = SessionService.getUserData()
        const person = SessionService.getPersonData()
        setUserSession(user)
        setData({
            ...data,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            number_saip: props.usecase.buildSaipCode().toString(),
            phone: person.phone,
            gender: person.gender,
            race_identification: person.race
        })
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoadingSend(true)
        data.format_receipt = "Portal Web"
        data.address = entity.address || "Sin dirección"
        data.address = entity.address || "Sin Ciudad"
        console.log(data)

        if (solicitySaved?.id) {
            const draft_send = props.usecase.sendDraftSolicity(data, solicitySaved.id || 0,false)

            draft_send.then((res) => {
                setSuccess("Solicitud Guardada como borrador")
                setSolicitySaved(res)
                setIsSend(true)
                setIsLoadingSend(false)

                sleep(2000).then(() => {
                    navigate('/admin/solicity')
                })
            }).catch((err) => {
                setError(err.message)
                setIsLoadingSave(false)

            })
        } else {
            data.establishment = entity.id || 0

            if (data.establishment === 0) {
                setError("Seleccione una entidad")
                setIsLoadingSend(false)
                return
            }

            data.address = entity.address || "Sin dirección"

            if (data.text == "") {
                setError("Ingrese el texto de la solicitud")
                setIsLoadingSend(false)
                return
            }
            if (data.city === "") {
                setError("Ingrese la ciudad")
                setIsLoadingSend(false)
                return
            }



            if (data.format_send === "") {
                setError("Seleccione el formato de envio")
                setIsLoadingSend(false)
                return
            }
            console.log(data)
            const send = props.usecase.sendSolicityWithouDraft(data)

            send.then((res) => {
                setSolicitySaved(res)
                setIsSend(true)
                setIsLoadingSend(false)


            }).catch((err) => {
                setError(err.message)
                setIsSend(false)
                setIsLoadingSend(false)

            })
        }

    }

    /*const getSelectedEntity = (id: number) => {
        const entity = _establishments.find((item) => item.id === id)
        setEntity(entity || {} as EstablishmentEntity)

    }*/


    const getSelectedItem = (value: string, options: ColourOption[]) => {
        const item = options.find((item) => item.value === value)
        return item || {} as ColourOption
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (e.target.name == 'text') {
            const value = e.target.value;

            if (value.length < 3000) {
                setData({
                    ...data,
                    [e.target.name]: e.target.value
                })
            }

        } else {
            setIsChanged(true)

            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }



    }




    const onChangeSelectEstablishment = (e: ColourOption) => {
        const establishment = _establishments.find((item) => item.slug === e.value)
        setEntity(establishment || {} as EstablishmentEntity)
        setData({
            ...data,
            establishment: parseInt(e.value),
            city: establishment?.address || "",
            address: establishment?.address || ""
        })
    }


    const onChangeSelect = (e: ColourOption, name: string) => {
        setIsChanged(true)
        setData({
            ...data,
            [name]: e.value
        })
    }


    const genders: ColourOption[] = [
        { value: 'Masculino', label: 'Masculino', color: "#00B8D9" },
        { value: 'Femenino', label: 'Femenino', color: "#00B8D9" },
        { value: 'LGBTIQ+', label: 'LGBTIQ+', color: "#00B8D9" },
        { value: 'Otro', label: 'Otro', color: "#00B8D9" },
    ]

    const race_indentification: ColourOption[] = [
        { value: 'Mestiza', label: 'Mestiza', color: '#00B8D9' },
        { value: 'Pueblo Montubio', label: 'Pueblo Montubio', color: '#00B8D9' },
        { value: 'Pueblo o Nacionalidad Indígena', label: 'Pueblo o Nacionalidad Indígena', color: '#00B8D9' },
        { value: 'Pueblo Afrodescendiente', label: 'Pueblo Afrodescendiente', color: '#00B8D9' },
        { value: 'Blanca', label: 'Blanca', color: '#00B8D9' },

    ]


    const formart_send: ColourOption[] = [
        { value: 'formato fisico: copia en papel', label: 'Formato físico: copia en papel', color: '#00B8D9' },
        { value: 'formato fisico: cd', label: 'Formato físico: cd', color: '#00B8D9' },
        { value: 'formato electronico: excel', label: 'Formato digital: Archivo de hoja de cálculo (MS Excel o similar)', color: '#00B8D9' },
        { value: 'formato electronico: pdf', label: 'Formato digital. Archivo PDF', color: '#00B8D9' },
        { value: 'formato electronico: word', label: 'Formato digital: Archivo de documento (MS Word o similar)', color: '#00B8D9' },
        { value: 'formato electronico: csv', label: 'Formato digital: Archivo de datos abiertos (CSV o similar)', color: '#00B8D9' },

    ]

    const format_receipt: ColourOption[] = [
        { value: 'Portal Web', label: 'Portal Web', color: '#00B8D9' },
    ]


    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {

        if (inputValue === "") {
            return callback([])
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




    const handleSave = () => {
        setIsLoadingSave(true)
        if (entity.id === 0) {
            setError("Seleccione una entidad")
            setIsLoadingSave(false)
            return
        }
        data.establishment = entity.id || 0
        data.address = entity.address || "Sin dirección"
        data.format_receipt = 'Portal Web'
        if (data.text === "") {
            setError("Ingrese el texto de la solicitud")
            setIsLoadingSave(false)
            return
        }

        if (data.city === "") {
            setError("Ingrese la ciudad")
            setIsLoadingSave(false)
            return
        }

        if (data.format_send === "") {
            setError("Seleccione el formato de envio")
            setIsLoadingSave(false)
            return
        }


        props.usecase.createDraft(data).then((res) => {
            setError("")
            setIsChanged(false)
            setIsLoadingSave(false)
            setSolicitySaved(res)

        }).catch((err) => {
            setSuccess("")
            setIsLoadingSave(false)
            setError(err.message)
        })
    }

    const isCitizen = () => {
        return userSession?.group?.find(x => x.name === 'Ciudadano') ? true : false;
    }

    const handleCancel = () => {
        navigate('/admin/solicity')
    }

    return (
        <>
            {
                isSend ?
                    <ScreenMessage message={`
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

                    <SolicityCreatePresenter
                        handleSubmit={handleSubmit}
                        onCancel={handleCancel}
                        onChange={handleChange}
                        key={0}
                        loadOptions={loadOptions}
                        error={error}
                        setError={setError}
                        setSuccess={setSuccess}
                        success={success}
                        onChangeSelectEstablishment={onChangeSelectEstablishment}
                        handleSave={handleSave}
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
                        isLoadingSaved={isLoadingSave}
                        isLoadingSend={isLoadingSend}
                        isSaved={solicitySaved.id ? true : false}
                        isSend={isSend}
                        disabledDate={isCitizen()}
                        disabledReceipt={isCitizen()}

                    />
            }
        </>
    )

}


export default SolicityCreateContainer