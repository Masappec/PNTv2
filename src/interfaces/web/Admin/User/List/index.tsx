import UserListContainer from "../../../../../components/Admin/Users/List/UserListContainer";
import Breadcrumb from "../../../../../components/Common/Breadcrumb"
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
            <Breadcrumb
                items={[
                    {
                        name: 'Usuarios',
                        path: '/admin/users',
                    },
                    {
                        name: 'Listado',
                        path: '/admin/users',
                    }
                ]}
            />
            <UserListContainer usecase={usecase}/>
        </>
    )
}

export default UserList;