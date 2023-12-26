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

    const navigate = useNavigate()

    useEffect(() => {
        usecase.execute().then((users) => {
            setUsers(users.results)
            setCurrentPage(users.current)
            setPreviousPage(users.previous||0)
            setNextPage(users.next||0)
        }).catch((error) => { 
            setError(error)
        })
    }, [usecase]);


    const handleAdd = () => {
            
        navigate("/admin/users/create")
    }


    const handleEdit = (user: UserEntity) => {
            navigate("/admin/users/edit/"+user.id)
    }

    const handlePage = (page: number) => {
        usecase.execute("", page).then((users) => {
            setUsers(users.results)
            setCurrentPage(users.current)
            setPreviousPage(users.previous||0)
            setNextPage(users.next||0)
        }).catch((error) => {
            setError(error)
        })
    }


   

    const handleSearch = (text:string) => {
        setSearch(text)
        usecase.execute(text).then((users) => {
            setUsers(users.results)
        }).catch((error) => {
            setError(error)
        })
    }
 

    return (
        <UserListPresenter 
        users={users}
            error={error}
            onAdd={handleAdd}
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
        />
    );
}

export default UserListContainer