
import SolicityListPresenter from "./SoicityListPresenter"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import { Solicity } from "../../../../domain/entities/Solicity"

interface Props {
    useCase: SolicityUseCase;
}


const SolicityListContainer = (props: Props) => {
    const navigate = useNavigate()

    const [solicitudes, SetSolicitudes] = useState<Solicity[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [error, SetError] = useState<string>("")

    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)


    useEffect(() => {
        props.useCase.getSolicities("", currentPage).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }, [])

    const handleAdd = () => {
        navigate('/admin/solicity/create')
    }
    const handleEdit = (item: Solicity) => {
        navigate(`/admin/solicity/response/citizen`, {
            state: {
                data: item
            }
        })
    }

    const handleOnHold = () => {
        navigate('/admin/solicity/onhold')
    }

    const handleResponse = () => {
        navigate('/admin/solicity/response')
    }

    const handleDetail = () => {
        navigate('/admin/solicity/detail')
    }



    const handleDelete = () => {
        setVisibleModal(true)

    }
    const handleCancelDelete = () => {
        setVisibleModal(false)

    }



    return (
        <SolicityListPresenter

            error={error}
            data={solicitudes}

            onAdd={handleAdd}
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={() => { }}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onHold={handleOnHold}
            onResponse={handleResponse}
            onDetail={handleDetail}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={() => { }}
            page={currentPage}
            search=""

            setPage={() => { }}
            setSeach={() => { }}
            setVisibleModal={() => { }}
            visibleModal={visibleModal}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
        />
    )

}

export default SolicityListContainer;