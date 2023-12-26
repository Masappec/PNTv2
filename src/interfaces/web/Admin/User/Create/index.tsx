import UserCreateContainer from "../../../../../components/Admin/Users/Create/UserCreateContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb";
import RoleUseCase from "../../../../../domain/useCases/Role/RoleUseCase";
import UserUseCase from "../../../../../domain/useCases/Users/UserUseCase";
import api from "../../../../../infrastructure/Api";
import RoleApi from "../../../../../infrastructure/Api/Role/RoleApi";
import UserApi from "../../../../../infrastructure/Api/User/UserApi";
import RoleService from "../../../../../infrastructure/Services/RoleService";
import UserService from "../../../../../infrastructure/Services/UserService";


const UserCreate = () => {

    const _api = api;
    const userApi = new UserApi(_api)
    const userService = new UserService(userApi)
    const usecase = new UserUseCase(userService)

    const roleApi = new RoleApi(_api)
    const roleService = new RoleService(roleApi)
    const roleUseCase = new RoleUseCase(roleService)

    return (
        <>
            <Breadcrumb
                items={[
                    {
                        name: 'Usuarios',
                        path: '/admin/users',
                    },
                    {
                        name: 'Nuevo',
                        path: '/admin/create',
                    }
                ]}
            />
            <UserCreateContainer
                usecase={usecase}
                roleUseCase={roleUseCase}

            />

        </>
    )

}

export default UserCreate;