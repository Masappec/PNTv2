import { useEffect, useState } from "react"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useNavigate } from "react-router-dom"
import PublicEstablishmentPresenter from "./PublicEstablishmentPresenter"


interface Props {
    usecase: PublicUseCase
}
const PublicEstablishmentContainer = (props: Props) => {

    const [load, setLoad] = useState(true)
    const [entities, setEntities] = useState<{
        letter: string,
        data: EstablishmentEntity[]
    }[]>([])
    const [originalEntities, setOriginalEntities] = useState<{
        letter: string,
        data: EstablishmentEntity[]
    }[]>([])
    const [selectedLetter, setSelectedLetter] = useState<string>("A")
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
            setLoad(false)
            setEntities(entities.results)
            setOriginalEntities(entities.results)
            setTotal(entities.total)
        }).catch((error) => {
            setLoad(false)
            setError(error.message)
        })
    }, [])


    const onPageChange = (page: string) => {
        if (page === selectedLetter) {
            setEntities(originalEntities)
            setSelectedLetter("")
            return;
        }
        setSelectedLetter(page)
        const data = originalEntities.filter((entity) => entity.letter.toUpperCase() === page)
        setEntities(data)
    }

    const onItemClicked = (slug: string) => {


        console.log("slug", slug)
        navigate(`/entidades/${slug}`)
    }

    const onSearch = (search: string) => {
        const data = originalEntities.filter((entity) => entity.data.some((item) => item.name.toLowerCase().includes(search.toLowerCase())))
        setEntities(data)
    }


    return (
        <PublicEstablishmentPresenter
            error={error}
            entities={entities}
            onPageChange={onPageChange}
            onSearch={onSearch}
            total={total}
            onItemClicked={onItemClicked}
            letters={abecedario}
            loading={load}


        />
    )
}

export default PublicEstablishmentContainer