import { useEffect, useState } from "react"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useNavigate } from "react-router-dom"
import PublicEstablishmentPresenter from "./PublicEstablishmentPresenter"


interface Props {
    usecase: PublicUseCase
}
const PublicEstablishmentContainer = (props: Props) => {
    const [entities, setEntities] = useState<EstablishmentEntity[]>([])
    const [error, setError] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        props.usecase.getEstablishments().then((entities) => {
            setEntities(entities.results)
            setCurrentPage(entities.current)
            setTotalPages(entities.total_pages || 1)
            setTotal(entities.total)
        }).catch((error) => {
            setError(error.message)
        })
    }, [])


    const onPageChange = (page: number) => {
        props.usecase.getEstablishments(page + "").then((entities) => {
            setEntities(entities.results)
            setCurrentPage(entities.current)
            setTotalPages(entities.total_pages || 1)
        }).catch((error) => {
            setError(error.message)
        })
    }

    const onItemClicked = ( slug: string) => {


        console.log("slug", slug)
        navigate(`/entidades/${slug}`)
    }


return (
    <PublicEstablishmentPresenter
        error={error}
        entities={entities}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        total={total}
        onItemClicked={onItemClicked}
        

    />
)
}

export default PublicEstablishmentContainer