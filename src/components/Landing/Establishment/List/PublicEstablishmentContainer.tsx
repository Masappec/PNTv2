import { useEffect, useState } from "react"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useNavigate } from "react-router-dom"
import PublicEstablishmentPresenter from "./PublicEstablishmentPresenter"


interface Props {
    usecase: PublicUseCase
}
const PublicEstablishmentContainer = (props: Props) => {
    const [entities, setEntities] = useState<{
        letter: string,
        data: EstablishmentEntity[]
    }[]>([])
    const [error, setError] = useState("")

    const [total, setTotal] = useState(0)

    const navigate = useNavigate()

    const abecedario = [];
    const inicio = 'A'.charCodeAt(0);
    const fin = 'Z'.charCodeAt(0);

    for (let i = inicio; i <= fin; i++) {
        abecedario.push(String.fromCharCode(i));
    }


    useEffect(() => {
        props.usecase.getEstablishments().then((entities) => {
            setEntities(entities.results)
            setTotal(entities.total)
        }).catch((error) => {
            setError(error.message)
        })
    }, [])


    const onPageChange = (page: number) => {
        props.usecase.getEstablishments("", page).then((entities) => {
            setEntities(entities.results)
        }).catch((error) => {
            setError(error.message)
        })
    }

    const onItemClicked = (slug: string) => {


        console.log("slug", slug)
        navigate(`/entidades/${slug}`)
    }


    return (
        <PublicEstablishmentPresenter
            error={error}
            entities={entities}
            onPageChange={onPageChange}

            total={total}
            onItemClicked={onItemClicked}
            letters={abecedario}


        />
    )
}

export default PublicEstablishmentContainer