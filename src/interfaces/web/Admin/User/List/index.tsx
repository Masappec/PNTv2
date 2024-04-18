import UserListContainer from "../../../../../components/Admin/Users/List/UserListContainer";

import UserUseCase from "../../../../../domain/useCases/Users/UserUseCase";
import api from "../../../../../infrastructure/Api";
import UserApi from "../../../../../infrastructure/Api/User/UserApi";
import UserService from "../../../../../infrastructure/Services/UserService";


const UserList = () => {
    const _api = api;
    const userApi = new UserApi(_api);
    const userService = new UserService(userApi);
    const usecase = new UserUseCase(userService);

    return (


        <>     
            <UserListContainer usecase={usecase}/>
        </>
    )
}

export default UserList;