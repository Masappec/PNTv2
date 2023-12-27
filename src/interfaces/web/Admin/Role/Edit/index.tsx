import RoleEditContainer from "../../../../../components/Admin/Roles/Edit/RoleEditContainer"
import PermissionUseCase from "../../../../../domain/useCases/PermissionUseCase/PermissionUseCase";
import RoleUseCase from "../../../../../domain/useCases/Role/RoleUseCase";
import api from "../../../../../infrastructure/Api";
import PermissionApi from "../../../../../infrastructure/Api/Permission/PermissionApi";
import RoleApi from "../../../../../infrastructure/Api/Role/RoleApi";
import PermissionService from "../../../../../infrastructure/Services/PermissionService";
import RoleService from "../../../../../infrastructure/Services/RoleService";

const RoleEdit = () => {

    const _api = api;
    const permission_api = new PermissionApi(_api);
    const permission_service = new PermissionService(permission_api);
    const permission_usecase = new PermissionUseCase(permission_service);

    const role_api = new RoleApi(_api);
    const role_service = new RoleService(role_api);
    const role_usecase = new RoleUseCase(role_service);

    return <RoleEditContainer 
        permissionUsecase={permission_usecase}
        usecase={role_usecase}
    />

}

export default RoleEdit;