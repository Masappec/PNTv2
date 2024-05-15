import UserEditContainer from "../../../../../components/Admin/Users/Edit/UserEditContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb";
import ConfigurationUseCase from "../../../../../domain/useCases/Configuration/ConfigurationUseCase";
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";
import RoleUseCase from "../../../../../domain/useCases/Role/RoleUseCase";
import UserUseCase from "../../../../../domain/useCases/Users/UserUseCase";
import api from "../../../../../infrastructure/Api";
import ConfigurationApi from "../../../../../infrastructure/Api/Configuration/ConfigurationApi";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import RoleApi from "../../../../../infrastructure/Api/Role/RoleApi";
import UserApi from "../../../../../infrastructure/Api/User/UserApi";
import ConfigurationService from "../../../../../infrastructure/Services/ConfigurationService";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import RoleService from "../../../../../infrastructure/Services/RoleService";
import UserService from "../../../../../infrastructure/Services/UserService";



const UserEdit = () => {
    const _api = api;
    const userApi = new UserApi(_api)
    const userService = new UserService(userApi)
    const usecase = new UserUseCase(userService)

    const esta = new EstablishmentUseCase(new EstablishmentService(new EstablishmentApi(_api)))
    const roleApi = new RoleApi(_api)
    const roleService = new RoleService(roleApi)
    const roleUseCase = new RoleUseCase(roleService)

    const configApi = new ConfigurationApi(_api)
    const configService = new ConfigurationService(configApi)
    const configUseCase = new ConfigurationUseCase(configService)
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

            <UserEditContainer

                configUseCase={configUseCase}
                roleUseCase={roleUseCase}
                usecase={usecase}
                establishmentUseCase={esta}
            />

        </>
    )
}

export default UserEdit;