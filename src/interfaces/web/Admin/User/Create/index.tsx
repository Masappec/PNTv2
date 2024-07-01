import UserCreateContainer from "../../../../../components/Admin/Users/Create/UserCreateContainer"
import ConfigurationUseCase from "../../../../../domain/useCases/Configuration/ConfigurationUseCase";
import RoleUseCase from "../../../../../domain/useCases/Role/RoleUseCase";
import UserUseCase from "../../../../../domain/useCases/Users/UserUseCase";
import api from "../../../../../infrastructure/Api";
import ConfigurationApi from "../../../../../infrastructure/Api/Configuration/ConfigurationApi";
import RoleApi from "../../../../../infrastructure/Api/Role/RoleApi";
import UserApi from "../../../../../infrastructure/Api/User/UserApi";
import ConfigurationService from "../../../../../infrastructure/Services/ConfigurationService";
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

    const configApi = new ConfigurationApi(_api)
    const configService = new ConfigurationService(configApi)
    const configUseCase = new ConfigurationUseCase(configService)

    return (
        <>
           
            <UserCreateContainer
                usecase={usecase}
                roleUseCase={roleUseCase}
                configUseCase={configUseCase}

            />

        </>
    )

}

export default UserCreate;