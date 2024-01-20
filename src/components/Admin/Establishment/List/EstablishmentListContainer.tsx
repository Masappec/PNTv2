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
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    
    const navigate = useNavigate()

    useEffect(() => {
        usecase.getEstablishments()
            .then((response) => {
                setEstablishments(response.results)
                setCurrentPage(response.current)
                setFrom(response.from || 1)
                setTo(response.to || 1)
                setTotal(response.total)
                setTotalPage(response.total_pages || 0)

            })
            .catch((error) => {
                setError(error.message)
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
                        setCurrentPage(response.current)
                        setFrom(response.from || 1)
                        setTo(response.to || 1)
                        setTotal(response.total)
                        setTotalPage(response.total_pages || 0)
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
            setFrom(response.from || 1)
            setTo(response.to || 1)
            setTotal(response.total)
            setTotalPage(response.total_pages || 0)

        }).catch((error) => {
            setError(error.message)
        })
    }
    
    const handleSearch = (search: string) => {
        usecase.getEstablishments(search).then((response) => {
            setEstablishments(response.results)
            setCurrentPage(response.current)
            setFrom(response.from || 1)
            setTo(response.to || 1)
            setTotal(response.total)
            setTotalPage(response.total_pages || 0)

        }).catch((error) => {
            setError(error.message)
        })
    }
    return (
        <EstablishmentListPresenter

            error={error}
            establishments={establishments}
            onAdd={handleAdd}
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={handleSearch}
            page={currentPage}
            search=""
            selectedEstablishment={selectedEstablishment}
            setPage={handlePage}
            setSeach={() => { }}
            setVisibleModal={setVisibleModal}
            visibleModal={visibleModal}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
        />
    )

}

export default EstablishmentListContainer