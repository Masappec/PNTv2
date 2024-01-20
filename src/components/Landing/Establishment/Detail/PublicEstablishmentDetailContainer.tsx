import { useEffect, useState } from "react";
import EstablishmentEntity from "../../../../domain/entities/Establishment";
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import PublicEstablishmentDetailPresenter from "./PublicEstablishmentDetailPresenter"
import { useLocation } from "react-router-dom";
import TransparencyUseCase from "../../../../domain/useCases/Transparency/TransparencyUseCase";
import PublicationEntity from "../../../../domain/entities/PublicationEntity";

interface Props {
    usecase: PublicUseCase;
    transparencyUseCase?: TransparencyUseCase
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

    const [publications, setPublications] = useState<PublicationEntity[]>([])
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [total_pages, setTotalPages] = useState<number>(0)
    const [current_page, setCurrentPage] = useState<number>(0)
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
            props.transparencyUseCase?.getTransparencyActive(location.state.id||"").then((response) => {
                setPublications(response.results)
                setLoading(false)
                setTotalPages(response.total_pages||1)
                setTotal(response.total)
                setFrom(response.from||0)
                setTo(response.to||0)
            }).catch((error) => {
                setError(error.message) 
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [location.state])

    
    const handlePageChange = (page: number) => {
        props.transparencyUseCase?.getTransparencyActive(location.state.id||"", page).then((response) => {
            setPublications(response.results)
            setLoading(false)
            setTotal(response.total)
            setFrom(response.from||0)
            setTo(response.to||0)
            setCurrentPage(response.current)
        }).catch((error) => {
            setError(error.message) 
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <PublicEstablishmentDetailPresenter

            entity={entity}
            error={error}
            loading={loading}
            total={total}
            publications={publications}
            current_page={current_page}
            from={from}
            onChangePage={handlePageChange}
            to={to}
            totalPages={total_pages}
            
        />
    )
}

export default PublicEstablishmentDetailContainer