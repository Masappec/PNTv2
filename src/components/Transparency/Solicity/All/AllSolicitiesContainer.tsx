import AllSolicitiesPresenter from "./AllSolicitiesPresenter"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SolicityUseCase from "../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import { Solicity } from "../../../../domain/entities/Solicity"
import ReportsApi from "../../../../infrastructure/Api/Reports"
import EstablishmentEntity from "../../../../domain/entities/Establishment"
import { useSelector } from "react-redux"
import { RootState } from "../../../../infrastructure/Store"
import { ColourOption } from "../../../../utils/interface"

interface Props {
    useCase: SolicityUseCase;
    reportApi:ReportsApi
}


const AllSolicitiesMonitorContainer = (props: Props) => {
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
    const [search, setSeach] = useState<string>("");
    const [status_, setStatus] = useState<string>("");
    const _establishments: EstablishmentEntity[] = useSelector((state: RootState) => state.establishment.establishments)
    const [listEnt, setListEnt] = useState<EstablishmentEntity[]>([])
    const [isSearching, SetSearching] = useState<boolean>(false)
    const [entity, setEntity] = useState<EstablishmentEntity>(EstablishmentEntity.generateAllEstablishment("Todas"));
    const todas = EstablishmentEntity.generateAllEstablishment('Todas')

    useEffect(() => {
        props.useCase.getEstablishmentSolicity(search, currentPage, limit, columnsSort, status_, entity.id||undefined).then(response => {
            SetSolicitudes(response.results)
            setTotalPage(response.total_pages || 0)
            setFrom(response.from || 0)
            setTo(response.to)
            setTotal(response.total)
            setCurrentPage(response.current)
        }).catch((err) => {
            SetError(err.message)
        })
    }, [search, currentPage, limit, columnsSort, status_, entity])

    useEffect(() => {
        setListEnt(_establishments)
    }, [_establishments])
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

    const onExport = () => {
        props.reportApi.generateReportSolicities(new Date().getFullYear()).then(response => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte-solicitudes.xlsx');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        }).catch((err) => {
            SetError(err.message)
        })

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

    const handleChageStatus = (e: string) => {
        setStatus(e)
        props.useCase.getEstablishmentSolicity(search, currentPage, limit, columnsSort, e).then(response => {
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

    const loadOptions = (inputValue: string, callback: (options: ColourOption[]) => void) => {
        if (!inputValue) {
            return;
        }


        if (isSearching) {
            return;
        }

        SetSearching(true)
        const _filter = listEnt.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
        SetSearching(false)
        const filter: EstablishmentEntity[] = []

        filter.push(todas, ..._filter)

        callback(filter.map((item) => {
            const data: ColourOption = {
                value: item.identification || "",
                label: item.name,
                color: "#00B8D9",
            }
            return data;
        }))
    }

    return (
        <AllSolicitiesPresenter
            columnsSort={columnsSort}
            onChangeSort={onChangesSort}
            error={error}
            data={solicitudes}
            onExport={onExport}

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
            loadOptions={loadOptions}
            onInstitutionChange={(value) => {
                const _est = listEnt.find((item) => item.identification === value);
                if (_est) {
                    setEntity(_est)
                }else{
                    setEntity(EstablishmentEntity.generateAllEstablishment(""))
                }
            }}
        />
    )

}

export default AllSolicitiesMonitorContainer;