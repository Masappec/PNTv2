import { useEffect, useState } from "react"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useNavigate } from "react-router-dom"
import PublicEstablishmentPresenter from "./PublicEstablishmentPresenter"
import { setEstablishments as saveEstablishment } from "../../../../infrastructure/Slice/EstablishmentSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../../../infrastructure/Store"

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
    const _entities = useSelector((state: RootState) => state.establishment.establishments)

    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const abecedario = [];
    const inicio = 'A'.charCodeAt(0);
    const fin = 'Z'.charCodeAt(0);

    for (let i = inicio; i <= fin; i++) {
        abecedario.push(String.fromCharCode(i));
    }


    useEffect(() => {
        if (_entities.length > 0) {

            let list_by_letters: {
                letter: string,
                data: EstablishmentEntity[]
            }[] = []
            _entities.forEach((entity) => {

                list_by_letters = [
                    ...list_by_letters,
                    {
                        letter: entity.name[0].toUpperCase(),
                        data: [
                            ...list_by_letters.find((item) => item.letter === entity.name[0].toUpperCase())?.data || [],
                            entity
                        ]
                    }
                ]
            })


            setOriginalEntities(list_by_letters)
            setEntities(list_by_letters)
            setLoad(false)
            return;
        }
        props.usecase.getEstablishments().then((entities) => {
            setLoad(false)
            setEntities(entities.results)
            const result = entities.results.map((item) => item.data)
            const final: EstablishmentEntity[] = []
            result.map((item) => {
                item.map((_item) => {
                    final.push(_item)
                })
            })
            dispatch(saveEstablishment(final))
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