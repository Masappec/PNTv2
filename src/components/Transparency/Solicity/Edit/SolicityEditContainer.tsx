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
import { toast } from 'react-toastify';
import { Solicity } from "../../../../domain/entities/Solicity";
import { useNavigate, useParams } from "react-router-dom";
import { formart_send, format_receipt, genders, race_indentification } from "../../../../utils/options";
import ScreenMessage from "../../../Common/ScreenMessage/ScreenMessage";


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
            toast("Seleccione un establecimiento", {
                type: "error",
                autoClose: 2000
            })
            setIsLoadingSend(false)
            return
        }


        if (data.number_saip === ""
            || data.city === ""
            || data.text === ""
            || data.first_name === ""
            || data.last_name === ""
            || data.email === ""
            || data.race_identification === ""
            || data.gender === ""
            || data.phone === ""
            || data.format_receipt === ""
            || data.format_send === ""
        ) {
            toast("Complete todos los campos", {
                type: "error",
                autoClose: 2000
            })
            setIsLoadingSend(false)
            return
        }


        props.usecase.updateSolicity(data, parseInt(id || "0")).then((res) => {
            setSolicitySaved(res)
            setIsLoadingSend(false)
            setIsSend(true)
            
            
        }).catch((e) => {
            setIsLoadingSend(false)
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






    const onCancel = () => {
        navigate('/admin/solicity')
    }

    return (
        <>
            {isSend ? <ScreenMessage message="Solicitud de Acceso a Información Pública ingresada con éxito"
                type="Se ha enviado la solicitud con exito"
            >
                <div className="flex items-center gap-16 mt-8 justify-center ">


                    <button
                        onClick={() => navigate('/admin/solicity')}
                        className=" text-xl text-white font-medium hover:bg-primary-200 bg-primary-500 w-[300px]  py-2 rounded-lg shadow-xl">
                        Ver SAIP
                    </button>
                </div>
            </ScreenMessage>:
            <SolicityEditPresenter
                handleSubmit={handleSubmit}
                onCancel={onCancel}
                onChange={handleChange}
                key={0}
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
            />}
        </>
    )

}


export default SolicityEditContainer