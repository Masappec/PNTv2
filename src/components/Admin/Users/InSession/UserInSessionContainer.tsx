import { useEffect, useState } from "react";
import UserListPresenter from "../List/UserListPresenter";
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase";
import UserEntity from "../../../../domain/entities/UserEntity";
import { useNavigate } from "react-router-dom";
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase";


const UserListContainer = ({
    usecase,
    estUsecase,
}: {
    usecase: UserUseCase,
    estUsecase: EstablishmentUseCase
}) => {

    const [users, setUsers] = useState<UserEntity[]>([])
    const [error, setError] = useState(null)
    const [seach, setSearch] = useState("")

    const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [type_alert, setTypeAlert] = useState<"success" | "warning" | "info" | "error">("success")


    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        estUsecase.getEstablishmentsByUserList().then((users) => {
            setUsers(users.results)
            setCurrentPage(users.current)
            setFrom(users.from || 1)
            setTo(users.to || 1)
            setTotal(users.total)
            setTotalPage(users.total_pages || 0)
        }).catch((error) => {
            setError(error.message)
        })
    }, [usecase]);


    const handleAdd = () => {

        navigate("/admin/est/users/create")



    }


    const handleEdit = (user: UserEntity) => {
        navigate("/admin/est/users/" + user.id)
    }

    const handlePage = (page: number) => {
        estUsecase.getEstablishmentsByUserList("", page).then((users) => {
            setUsers(users.results)
            setTotalPage(users.total_pages || 0)
            setCurrentPage(users.current)
            setFrom(users.from || 1)
        }).catch((error) => {
            setError(error.message)
        })
    }




    const handleSearch = (text: string) => {
        setSearch(text)
        estUsecase.getEstablishmentsByUserList(text).then((users) => {
            setUsers(users.results)
            setTotalPage(users.total_pages || 0)
            setCurrentPage(users.current)
            setFrom(users.from || 1)
            setTo(users.to || 1)
            setTotal(users.total)
        }).catch((error) => {
            setError(error.message)
        })
    }



    const handleDelete = (user: UserEntity) => {
        setVisibleModal(true)
        setSelectedUser(user)
    }

    const handleCancelDelete = () => {
        setVisibleModal(false)
        setSelectedUser(null)
    }


    const handleConfirmDelete = () => {
        usecase.delete(selectedUser?.id || 0).then((status) => {
            setVisibleModal(false)
            setSelectedUser(null)
            setTypeAlert(status == 202 ? "success" : "error")
            estUsecase.getEstablishmentsByUserList().then((users) => {
                setUsers(users.results)
                setTotalPage(users.total_pages || 0)
            }).catch((error) => {
                setError(error.message)
            })
        }).catch((error) => {
            setError(error.message)
        })
    }

    const handleImport = () => {

        navigate('/admin/users/import')
    }

    const handleLimit = (limit: string) => {
        usecase.execute(seach, currentPage, limit).then((users) => {
            setUsers(users.results)
            setTotalPage(users.total_pages || 0)
            setCurrentPage(users.current)
            setFrom(users.from || 1)
            setTo(users.to || 1)
            setTotal(users.total)
        }).catch((error) => {
            setError(error.message)
        })
    }
    return (
        <UserListPresenter
            users={users}
            error={error}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onFilter={() => { }}
            onImport={handleImport}
            onSearch={handleSearch}
            key={users.length}
            search={seach}
            setSeach={setSearch}
            page={currentPage}
            setPage={handlePage}
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
            onDelete={handleDelete}
            selectedUser={selectedUser}
            setVisibleModal={setVisibleModal}
            visibleModal={visibleModal}
            type_alert={type_alert}
            totalPage={totalPage}
            from={from}
            to={to}
            total={total}
            onChangeLimit={handleLimit}
        />
    );
}

export default UserListContainer