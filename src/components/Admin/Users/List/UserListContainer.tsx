import { useEffect, useState } from "react";
import UserListPresenter from "./UserListPresenter";
import UserUseCase from "../../../../domain/useCases/Users/UserUseCase";
import UserEntity from "../../../../domain/entities/UserEntity";


const UserListContainer = ({
    usecase
}:{
    usecase: UserUseCase
}) => {

    const [users, setUsers] = useState<UserEntity[]>([])
    const [error, setError] = useState(null)


    useEffect(() => {
        usecase.execute().then((users) => {
            setUsers(users.results)
        }).catch((error) => {
            setError(error)
        })
    }, [usecase]);

    return (
        <UserListPresenter 
        users={users}
            
        />
    );
}

export default UserListContainer