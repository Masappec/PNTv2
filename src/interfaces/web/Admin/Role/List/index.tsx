import RoleListContainer from "../../../../../components/Admin/Roles/List/RoleListContainer"
import RoleUseCase from "../../../../../domain/useCases/Role/RoleUseCase";
import api from "../../../../../infrastructure/Api"
import RoleApi from "../../../../../infrastructure/Api/Role/RoleApi";
import RoleService from "../../../../../infrastructure/Services/RoleService";


const RoleList = () => {

    const _api = api;

    const roleApi = new RoleApi (_api);
    const roleService = new RoleService(roleApi);
    const usecase = new RoleUseCase(roleService);
    return (
        <>
          
            <RoleListContainer 
                usecase={usecase}
            />
        </>
    )
}

export default RoleList;