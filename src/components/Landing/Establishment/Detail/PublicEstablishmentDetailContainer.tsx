import { useEffect, useState } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import PublicEstablishmentDetailPresenter from "./PublicEstablishmentDetailPresenter"
import { useLocation } from "react-router-dom";

interface Props {
    usecase: PublicUseCase;
}
const PublicEstablishmentDetailContainer = (props: Props) => {

    const location = useLocation()

    const [entity, setEntity] = useState<EstablishmentEntity>({
        abbreviation: "",
        code: "",
        email_authority: "",
        first_name_authority: "",
        highest_authority: "",
        job_authority: "",
        last_name_authority: "",
        logo: "",
        name: "",
        email_accesstoinformation: "",
        email_committe: "",
        first_name_committe: "",
        highest_committe: "",
        id: 0,
        is_active: false,
        job_committe: "",
        last_name_committe: "",
    })

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (location.state) {
            props.usecase.getEstablishment(location.state.id||"").then((response) => {
                setEntity(response)
                setLoading(false)
            }).catch((error) => {
                setError(error.message) 
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [location.state])

    


    return (
        <PublicEstablishmentDetailPresenter

            entity={entity}
            error={error}
            loading={loading}
            
        />
    )
}

export default PublicEstablishmentDetailContainer