
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SolicityListEstablishmentPresenter from "./SolicityEstablishmentPresenter"


const SolicityListEstablishmentContainer = () => {
    const navigate = useNavigate()

    const [solicitudes, SetSolicitudes] = useState<[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [error, SetError] = useState<string>("")

    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)


    useEffect(() => {
        SetSolicitudes([])
        setTotalPage(0)
        setCurrentPage(1)
        setFrom(0)
        setTo(0)
        setTotal(0)
        SetError("")
    }, [])

    const handleAdd = () => {
        navigate('/admin/solicity/create')
    }
    const handleEdit = () => {
        navigate(`/admin/solicity/edit`)
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
        <SolicityListEstablishmentPresenter

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

export default SolicityListEstablishmentContainer;