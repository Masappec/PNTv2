import { useEffect, useState } from "react";
import UserListPresenter from "./UserListPresenter";
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase";
import UserEntity from "../../../../domain/entities/UserEntity";
import { useNavigate } from "react-router-dom";


const UserListContainer = ({
    usecase
}:{
    usecase: UserUseCase
}) => {

    const [users, setUsers] = useState<UserEntity[]>([])
    const [error, setError] = useState(null)
    const [seach, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState<number>(0)
    const [previousPage, setPreviousPage] = useState<number>(0)

    const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [type_alert, setTypeAlert] = useState<"success" | "warning" | "info" | "error" >("success")

    const navigate = useNavigate()

    useEffect(() => {
        usecase.execute().then((users) => {
            setUsers(users.results)
            setCurrentPage(users.current)
            setPreviousPage(users.previous||0)
            setNextPage(users.next||0)
        }).catch((error) => { 
            setError(error.message)
        })
    }, [usecase]);


    const handleAdd = () => {
            
        navigate("/admin/users/create")
       
        

    }
      const handleClick = () => {
            
        navigate("/admin/users/import")
       
        

    }


    const handleEdit = (user: UserEntity) => {
        navigate("/admin/users/"+user.id)
    }

    const handlePage = (page: number) => {
        usecase.execute("", page).then((users) => {
            setUsers(users.results)
            setCurrentPage(users.current)
            setPreviousPage(users.previous||0)
            setNextPage(users.next||0)
        }).catch((error) => {
            setError(error.message)
        })
    }


   

    const handleSearch = (text:string) => {
        setSearch(text)
        usecase.execute(text).then((users) => {
            setUsers(users.results)
        }).catch((error) => {
            setError(error.message)
        })
    }

    

    const handleDelete = (user:UserEntity) => {
        setVisibleModal(true)
        setSelectedUser(user)
    }
    
    const handleCancelDelete = () => {
        setVisibleModal(false)
        setSelectedUser(null)
    }


    const handleConfirmDelete = () => {
        usecase.delete(selectedUser?.id||0).then((status) => {
            setVisibleModal(false)
            setSelectedUser(null)
            setTypeAlert(status==202?"success":"error")
            usecase.execute().then((users) => {
                setUsers(users.results)
                setCurrentPage(users.current)
                setPreviousPage(users.previous||0)
                setNextPage(users.next||0)
            }).catch((error) => {
                setError(error.message)
            })
        }).catch((error) => {
            setError(error.message)
        })
    }
 

    return (
        <UserListPresenter 
        users={users}
            error={error}
            onAdd={handleAdd}
            add={handleClick}
            onEdit={handleEdit}
            onFilter={() => {}}
            onImport={() => {}}
            onSearch={handleSearch}
            key={users.length}
            search={seach}
            setSeach={setSearch}
            nextPage={nextPage}
            page={currentPage}
            previousPage={previousPage}
            setPage={handlePage}
            onCancelDelete={handleCancelDelete}
            onConfirmDelete={handleConfirmDelete}
            onDelete={handleDelete}
            selectedUser={selectedUser}
            setVisibleModal={setVisibleModal}
            visibleModal={visibleModal}
            type_alert={type_alert}
        />
    );
}

export default UserListContainer