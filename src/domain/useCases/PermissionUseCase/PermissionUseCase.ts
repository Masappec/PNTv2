import PermissionService from "../../../infrastructure/Services/PermissionService";


class PermissionUseCase{
    constructor(private permissionRepository: PermissionService) {

    }

    async execute(){
        const permissions = await this.permissionRepository.getPermissions();
        return permissions;
    }
}

export default PermissionUseCase;