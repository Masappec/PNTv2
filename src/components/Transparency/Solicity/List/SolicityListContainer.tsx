
import SolicityListPresenter from "./SoicityListPresenter"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import { Solicity } from "../../../../domain/entities/Solicity"
import { StatusSolicity } from "../../../../utils/enums"

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
    const [limitOptions,] = useState<number[]>([5, 10, 20, 40, 50])
    const [columnsSort, setColumnsSort] = useState<string[]>([])
    const [limit, setLimit] = useState<number>(5)
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [search, setSearch] = useState<string>("")
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


    useEffect(() => {
       
        const date_start = new Date(startDate)
        const date_end = new Date(endDate)
        if (date_start > date_end) {
            SetError("La fecha de inicio no puede ser mayor a la fecha de fin")
            return
        }
        props.useCase.getSolicities(search,currentPage,limit,columnsSort,startDate,endDate).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }, [startDate,endDate])

    const handleAdd = () => {
        navigate('/admin/solicity/create')
    }
    const handleEdit = (item: Solicity) => {
        console.log(item)
        if (item.status === StatusSolicity.DRAFT.key) {
            navigate(`/admin/solicity/edit/${item.id}`)
        } else {
            navigate(`/admin/solicity/response/citizen`, {
                state: {
                    data: item
                }
            })
        }

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

    const setPage = (page: number) => {
        props.useCase.getSolicities(search, page).then(response => {
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
        setSearch(search)
        props.useCase.getSolicities(search, currentPage).then(response => {
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

    const onChangeLimit = (limit: number) => {
        setLimit(limit)
        props.useCase.getSolicities(search, currentPage, limit).then(response => {
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
        console.log(columnsSort)
        if (columnsSort.includes(sort)) {
            setColumnsSort(columnsSort.filter(item => item !== sort))
            copySort = copySort.filter(item => item !== sort)

        } else {
            setColumnsSort([...columnsSort, sort])
            copySort = [...copySort, sort]
        }

        props.useCase.getSolicities(search, currentPage, limit, copySort).then(response => {
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
        <SolicityListPresenter
            columnsSort={columnsSort}
            onChangesSort={onChangesSort}
            error={error}
            data={solicitudes}
            limits={limitOptions}
            onChangesLimit={onChangeLimit}
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
            setSeach={() => { }}
            setVisibleModal={() => { }}
            visibleModal={visibleModal}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
            onChangeEnd={setEndDate}
            onChangeStart={setStartDate}
            setError={SetError}
        />
    )

}

export default SolicityListContainer;