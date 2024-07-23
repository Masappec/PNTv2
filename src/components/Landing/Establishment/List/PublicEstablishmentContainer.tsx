import { useEffect, useState } from "react"
import PublicUseCase from "../../../../domain/useCases/Public/PublicUseCase"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useNavigate, useSearchParams } from "react-router-dom"
import PublicEstablishmentPresenter from "./PublicEstablishmentPresenter"
import { setEstablishments as saveEstablishment } from "../../../../infrastructure/Slice/EstablishmentSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../../../infrastructure/Store"
import { OptionsSelectCreate } from "../../../../infrastructure/Api/Establishment/interface"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"

interface Props {
    usecase: PublicUseCase,
    usecaseEst: EstablishmentUseCase
}
const PublicEstablishmentContainer = (props: Props) => {


    //get query param tipo

    const [searchParams,] = useSearchParams();

    const params: [string, string][] = [];

    for (const entry of searchParams.entries()) {
        params.push(entry);
    }


    const [load, setLoad] = useState(true)
    const [, setEntities] = useState<{
        letter: string,
        data: EstablishmentEntity[]
    }[]>([])
    const [copyEntities, setCopyEntities] = useState<EstablishmentEntity[]>([])
    const [originalEntities, setOriginalEntities] = useState<{
        letter: string,
        data: EstablishmentEntity[]
    }[]>([])
    const [selectedLetter, setSelectedLetter] = useState<string>("A")
    const [error, setError] = useState("")
    const _entities = useSelector((state: RootState) => state.establishment.establishments)
    const [typeInstitution, setTypeInstitution] = useState<OptionsSelectCreate>({
        functions: [],
        institutions: [],
        organizations: []
    })
    const [selectedType, setSelectedType] = useState<string>("")

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
        if (params.length > 0) {
            const search = params.find(e => e[0] == 'tipo')
            const valor = search ? search[1] : ''
            const data = originalEntities.filter((entity) => entity.data.some((item) =>
                item.function_organization?.toLowerCase() === valor.toLowerCase()))
            setEntities(data)
            setCopyEntities(data.map((entity) => entity.data).flat())
        }

    }, [_entities])

    useEffect(() => {
        props.usecaseEst.getOptions().then((data) => {
            setTypeInstitution(data)
        }).catch((error) => {
            setError(error.message)
        })
    }, [])

    useEffect(() => {
        if (_entities.length > 0) {

            const list_by_letters: {
                letter: string,
                data: EstablishmentEntity[]
            }[] = []
            _entities.forEach((entity) => {
                const index = list_by_letters.findIndex((item) => item.letter === entity.name[0].toUpperCase())
                if (index >= 0) {
                    list_by_letters[index].data.push(entity)
                    return;
                } else {
                    list_by_letters.push({
                        letter: entity.name[0].toUpperCase(),
                        data: [entity]
                    })
                }

            })


            setOriginalEntities(list_by_letters)
            setEntities(list_by_letters)
            setCopyEntities(_entities)
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


    const onSelectType = (type: string) => {
        setSelectedType(type)
        if (type === "") {
            setEntities(originalEntities)
            setCopyEntities(originalEntities.map((entity) => entity.data).flat())
            return;
        }
        console.log("type", type)
        const list_filted: EstablishmentEntity[] = [];
        originalEntities.forEach(element => {
            element.data.forEach(item => {
                if (item.function_organization === type) {
                    list_filted.push(item)
                }
            })
        });

        setCopyEntities(list_filted)

    }

    return (
        <PublicEstablishmentPresenter
            error={error}
            entities={copyEntities}
            onPageChange={onPageChange}
            onSearch={onSearch}
            total={total}
            onItemClicked={onItemClicked}
            letters={abecedario}
            loading={load}
            options={typeInstitution}
            onSelectType={onSelectType}
            selectedType={selectedType}

        />
    )
}

export default PublicEstablishmentContainer