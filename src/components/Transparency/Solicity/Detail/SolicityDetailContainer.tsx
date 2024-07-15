import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase";
import FilePublicationUseCase from "../../../../domain/useCases/FilePublicationUseCase/FilePublicationUseCase";
import AttachmentUseCase from "../../../../domain/useCases/AttachmentUseCase/AttachmentUseCase";
import {  Solicity, TimeLinePresenter } from "../../../../domain/entities/Solicity";
import CreateSolicity from "../../../../domain/entities/CreateSolicity";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infrastructure/Store";
import SessionService from "../../../../infrastructure/Services/SessionService";
import UserEntity from "../../../../domain/entities/UserEntity";
import SolicityDetailPresenter from "./SolicityDetailPresenter";


interface Props {
    usecase: SolicityUseCase;
    publicusecase: PublicUseCase;
    fileUseCase: FilePublicationUseCase;
    attachmentUsecase: AttachmentUseCase;
    children?: React.ReactNode;
}

const SolicityDetailContainer = (props: Props) => {




    const location = useLocation()

    const state = location.state as { data: Solicity }
    const [solicityToResponse, setSolicityToResponse] = useState<Solicity>({} as Solicity)
    const [_data, setData] = useState<CreateSolicity>({
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
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)


    const [error, setError] = useState<string>("")

    const [entity, setEntity] = useState<EstablishmentEntity>({} as EstablishmentEntity)
    const [, setUserSession] = useState<UserEntity>({} as UserEntity)


    const [timeline, setTimeline] = useState<TimeLinePresenter[]>([])

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (state) {

            const _user = SessionService.getUserData()
            setUserSession(_user)

            const is_Est = _user.user_permissions?.find(x => x.codename === 'view_solicityresponse')
            if (is_Est) {
                props.usecase.getSolicityBiIdEstablishment(parseInt(state?.data?.id + "" || "0")).then((res) => {
                    setSolicityToResponse(res)
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
                    getSelectedEntity(res.establishment)
                    setData(data_)
                    setTimeline(Solicity.ordernReponse(res))


                }).catch((e) => {
                    setError(e.message)
                })

            } else {
                props.usecase.getSolicityById(parseInt(state?.data?.id + "" || "0")).then((res) => {
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
                    setTimeline(Solicity.ordernReponse(res))

                    setData(data_)
                    setSolicityToResponse(res)
                    getSelectedEntity(res.establishment)
                }).catch((e) => {
                    setError(e.message)
                })
            }
        }

    }, [state])


    const getSelectedEntity = (id: number) => {
        const entity = _establishments.find((item) => item.id === id)
        setEntity(entity || {} as EstablishmentEntity)

    }









    const donwloadPdf = () => {

        props.usecase.generatePdf(solicityToResponse)

    }
    const onDownloadFromUrl = (url: string, name: string) => {
        props.fileUseCase.downloadFileFromUrl(url).then((file) => {
            if (file instanceof Blob) {
                const a = document.createElement("a");
                const url = URL.createObjectURL(file);
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();

                a.remove();
            } else if (typeof file === "string") {
                window.open(file, "_blank")
            }
        }).catch(() => {
            const a = document.createElement("a");
            a.href = url;
            a.download = name;
            a.target = "_blank"
            document.body.appendChild(a);
            a.click();
            a.remove();

        })
    }

    return (
        <>
            <SolicityDetailPresenter
                error={error}
                solicitySaved={solicityToResponse}
                entitySelected={entity}
                key={0}
                data={_data}
                isLoadingSend={false}
                onChange={() => { }}
                children={props.children}
                timeline={solicityToResponse.timeline}
                onDownloadPdf={donwloadPdf}
                timeline_response={timeline}
                onDownloadFromUrl={onDownloadFromUrl}


            />
        </>
    )

}



export default SolicityDetailContainer