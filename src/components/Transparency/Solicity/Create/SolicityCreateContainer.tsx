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
import { toast } from 'react-toastify';
import { Solicity } from "../../../../domain/entities/Solicity";
import { sleep } from "../../../../utils/functions";
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

        /*props.usecase.getLastDraftSolicity().then((res) => {
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
            console.log(e + "error")
            
        })*/
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
        data.format_receipt = "formulario web"
        data.address = entity.address || "Sin dirección"
        data.address = entity.address || "Sin Ciudad"
        if (solicitySaved?.id) {
            const draft_send = props.usecase.sendDraftSolicity(data, solicitySaved.id || 0)

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
        { value: 'formato fisico: copia en papel', label: 'formato fisico: copia en papel', color: '#00B8D9' },
        { value: 'formato fisico: cd', label: 'formato fisico: cd', color: '#00B8D9' },
        { value: 'formato electronico: excel', label: 'formato electronico: excel', color: '#00B8D9' },
        { value: 'formato electronico: pdf', label: 'formato electronico: pdf', color: '#00B8D9' },
        { value: 'formato electronico: word', label: 'formato electronico: word', color: '#00B8D9' },
        { value: 'formato electronico: csv', label: 'formato electronico: csv', color: '#00B8D9' },

    ]

    const format_receipt: ColourOption[] = [
        { value: 'formulario web', label: 'formulario web', color: '#00B8D9' },
    ]


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




    const handleSave = () => {
        setIsLoadingSave(true)
        if (entity.id === 0) {
            setError("Seleccione una entidad")
            setIsLoadingSave(false)
            return
        }
        data.establishment = entity.id || 0
        data.address = entity.address || "Sin dirección"
        console.log(data)
        if (data.text === "" || data.city === ""
            || data.first_name === "" || data.last_name === ""
            || data.email === "" || data.race_identification === ""
            || data.gender === ""
            || data.phone === "" || data.format_send === ""
            || data.format_receipt === "") {
            setError("Complete todos los campos")
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
            toast(err.message, {
                type: "error",
                autoClose: 2000
            })
        })
    }

    const isCitizen = () => {
        console.log(userSession?.group?.find(x => x.name === 'Ciudadano'))
        return userSession?.group?.find(x => x.name === 'Ciudadano') ? true : false;
    }

    return (
        <>
            {
                isSend ?
                    <ScreenMessage message="Solicitud de Acceso a Información Pública ingresada con éxito"
                        type="Se ha enviado la solicitud con exito"
                    >
                        <div className="flex items-center gap-16 mt-8 ">


                            <button
                                onClick={() => navigate('/admin/solicity')}
                                className=" text-xl text-white font-medium hover:bg-primary-200 bg-primary-500 w-[300px]  py-2 rounded-lg shadow-xl">
                                Ver SAIP
                            </button>
                        </div>
                    </ScreenMessage> :

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