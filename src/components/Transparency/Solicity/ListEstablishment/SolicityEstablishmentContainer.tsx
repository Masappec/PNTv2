import SolicityEstablishmentPresenter from "./SolicityEstablishmentPresenter"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import { Solicity } from "../../../../domain/entities/Solicity"

interface Props {
    useCase: SolicityUseCase;
}


const SolicityListEstablishmentContainer = (props: Props) => {
    const navigate = useNavigate()

    const [solicitudes, SetSolicitudes] = useState<Solicity[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [error, SetError] = useState<string>("")

    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [limitOptions,] = useState<number[]>([5, 10, 20, 40, 50])
    const [columnsSort, setColumnsSort] = useState<string[]>([])
    const [search,setSeach]= useState<string>("");
    const [status_,setStatus] = useState<string>("");
    useEffect(() => {
        props.useCase.getEstablishmentSolicity("", currentPage, limit).then(response => {
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
        navigate('/admin/solicity/create/manual')
    }
    const handleEdit = (item: Solicity) => {
        navigate(`/admin/solicity/edit/${item.id}`)
    }

    const handleOnHold = () => {
        navigate('/admin/solicity/onhold')
    }

    const handleResponse = (item: Solicity) => {
        navigate('/admin/solicity/response', { state: { data: item } })
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


    const setPage = (page: number) => {
        props.useCase.getEstablishmentSolicity(search, page, limit, columnsSort, status_).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }

    const onChangesLimit = (limit: number) => {
        setLimit(limit)

        props.useCase.getEstablishmentSolicity(search, currentPage, limit, columnsSort, status_).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }

    const onSearch = (search: string) => {
        setSeach(search)
        props.useCase.getEstablishmentSolicity(search, currentPage, limit, columnsSort, status_).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }

    const onChangesSort = (sort: string) => {
        let copySort = columnsSort
        if (columnsSort.includes(sort)) {
            setColumnsSort(columnsSort.filter(item => item !== sort))
            copySort = copySort.filter(item => item !== sort)

        } else {
            setColumnsSort([...columnsSort, sort])
            copySort = [...copySort, sort]
        }

        props.useCase.getEstablishmentSolicity(search, currentPage, limit, copySort, status_).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }

    const handleChageStatus = (e:string)=>{
        setStatus(e)
        props.useCase.getEstablishmentSolicity(search, currentPage, limit, columnsSort,e).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }

    return (
        <SolicityEstablishmentPresenter
            columnsSort={columnsSort}
            onChangeSort={onChangesSort}
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
            onSearch={onSearch}
            page={currentPage}
            search=""

            setPage={setPage}
            setSeach={onSearch}
            setVisibleModal={() => { }}
            visibleModal={visibleModal}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
            onChangesLimit={onChangesLimit}
            limits={limitOptions}
            onChangeStatus={handleChageStatus}
        />
    )

}

export default SolicityListEstablishmentContainer;