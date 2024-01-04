import { useEffect, useState } from "react"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import EstablishmentListPresenter from "./EstablishmentListPresenter"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useNavigate } from "react-router-dom"



const EstablishmentListContainer = ({
    usecase
}: {
    usecase: EstablishmentUseCase
}) => {


    const [establishments, setEstablishments] = useState<EstablishmentEntity[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [selectedEstablishment, setSelectedEstablishment] = useState<EstablishmentEntity | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState<number>(0)
    const [previousPage, setPreviousPage] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        usecase.getEstablishments()
            .then((response) => {
                setEstablishments(response.results)
                setCurrentPage(response.current)
                setPreviousPage(response.previous || 0)
                setNextPage(response.next || 0)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [])



    const handleAdd = () => {
        navigate('/admin/entities/create')
    }


    const handleEdit = (entity: EstablishmentEntity) => {
        navigate(`/admin/entities/${entity.id}`)
    }

    const handleDelete = (entity: EstablishmentEntity) => {
        setVisibleModal(true)
        setSelectedEstablishment(entity)
    }
    const handleCancelDelete = () => {
        setVisibleModal(false)
        setSelectedEstablishment(null)
    }

    const handleConfirmDelete = () => {
        if (selectedEstablishment) {
            usecase.delete(selectedEstablishment.id + "")
                .then(() => {
                    setVisibleModal(false)
                    setSelectedEstablishment(null)
                    usecase.getEstablishments().then((response) => {
                        setEstablishments(response.results)
                    }).catch((error) => {
                        setError(error.message)
                    })
                })
                .catch((error) => {
                    setError(error.message)
                })
        }
    }

    const handlePage = (page: number) => {
        usecase.getEstablishments("", page).then((response) => {
            setEstablishments(response.results)
            setCurrentPage(response.current)
            setPreviousPage(response.previous || 0)
            setNextPage(response.next || 0)
        }).catch((error) => {
            setError(error.message)
        })
    }
    return (
        <EstablishmentListPresenter

            error={error}
            establishments={establishments}
            nextPage={nextPage}
            onAdd={handleAdd}
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={() => { }}
            page={currentPage}
            previousPage={previousPage}
            search=""
            selectedEstablishment={selectedEstablishment}
            setPage={handlePage}
            setSeach={() => { }}
            setVisibleModal={setVisibleModal}
            visibleModal={visibleModal}
        />
    )

}

export default EstablishmentListContainer