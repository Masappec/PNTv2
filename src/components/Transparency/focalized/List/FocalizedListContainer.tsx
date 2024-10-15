import { useEffect, useState } from "react";
import TransparencyFocusEntity from "../../../../domain/entities/TransparencyFocus";
import TransparencyFocusUseCase from "../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase";
import FocalizedListPresenter from "./FocalizedListPresenter";
import { useNavigate } from "react-router-dom";
import SessionService from "../../../../infrastructure/Services/SessionService";
import TransparencyActiveUseCase from "../../../../domain/useCases/TransparencyActive/TransparencyActiveUseCase";

const FocalizedListContainer = ({ usecase, transparencyUseCase
}: {
    usecase: TransparencyFocusUseCase,
        transparencyUseCase?: TransparencyActiveUseCase;

}) => {


    const [transparencyFocus, setTransparencyFocus] = useState<TransparencyFocusEntity[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(0)
    const [selectedItem, setSelectedItem] = useState<TransparencyFocusEntity | null>(null)
    const [typeAlert, setTypeAlert] = useState<"success" | "warning" | "info" | "error">("success")
    const [hasPermApp, setHasPermApp] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        const user = SessionService.getUserData();
        if (user && user.user_permissions) {
            const hasPerm = user.user_permissions?.findIndex(x => x.codename == 'approve_numeral_tc')
            setHasPermApp(hasPerm !== -1)
        }
    }, [])
    useEffect(() => {
        usecase.getTransparencyFocusList()
            .then((response) => {
                setTransparencyFocus(response.results)
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

        navigate("/admin/focalized/create")
    }

    const handleEdit = (item: TransparencyFocusEntity) => {
        navigate(`/admin/focalized/edit/`, {
            state: {
                item

            }
        })
    }

    const handlePage = (page: number) => {
        usecase.getTransparencyFocusList("", page)
            .then((response) => {
                setTransparencyFocus(response.results)
                setCurrentPage(response.current)
                setFrom(response.from || 1)
                setTo(response.to || 1)
                setTotal(response.total)
                setTotalPage(response.total_pages || 0)

            })
            .catch((error) => {
                setError(error.message)
            })
    }
    const handleSearch = (search: string) => {
        usecase.getTransparencyFocusList(search)
            .then((response) => {
                setTransparencyFocus(response.results)
                setCurrentPage(response.current)
                setFrom(response.from || 1)
                setTo(response.to || 1)
                setTotal(response.total)
                setTotalPage(response.total_pages || 0)

            })
            .catch((error) => {
                setError(error.message)
            })
    }



    const handleDelete = (item: TransparencyFocusEntity) => {
        setVisibleModal(true)
        setSelectedItem(item)
    }

    const onConfirmDelete = () => {
        if (selectedItem) {
            usecase.deleteTransparencyFocus(selectedItem.id)
                .then(() => {
                    setVisibleModal(false)
                    setTransparencyFocus(transparencyFocus.filter((item) => item.id !== selectedItem.id))
                })
                .catch((error) => {
                    setError(error.message)
                    setTypeAlert("error")
                })
        }
    }
    const onCancelDelete = () => {
        setVisibleModal(false)
    }
    const approvePublication = (ta: TransparencyFocusEntity) => {
        transparencyUseCase?.approvePublication({
            establishment_id: ta.establishment.id || 0,
            id: ta.id,
            type: "TF"
        }).then(() => {
            usecase.getTransparencyFocusList()
                .then((response) => {
                    setTransparencyFocus(response.results)
                    setCurrentPage(response.current)
                    setFrom(response.from || 1)
                    setTo(response.to || 1)
                    setTotal(response.total)
                    setTotalPage(response.total_pages || 0)
                })
                .catch((error) => {
                    setError(error.message)
                })
        }).catch((error) => {
            setError(error.message)
        })
    }

    return (
        <FocalizedListPresenter
            error={error}
            data={transparencyFocus}
            onAdd={handleAdd}
            onCancelDelete={onCancelDelete}
            onConfirmDelete={onConfirmDelete}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={() => { }}
            onSearch={() => { }}
            page={currentPage}
            search=""
            setPage={handlePage}
            setSeach={handleSearch}
            setVisibleModal={setVisibleModal}
            visibleModal={visibleModal}
            from={from}
            to={to}
            total={total}
            totalPage={totalPage}
            selectedItem={selectedItem}
            type_alert={typeAlert}
            hasPermApp={hasPermApp}
            onApproved={approvePublication}
        />

    )
}

export default FocalizedListContainer;