import PermissionApi from "../Api/Permission/PermissionApi";


class PermissionService {
    api: PermissionApi;
    
    constructor(api: PermissionApi) {
        this.api = api;
    }

    async getPermissions() {
        try {
            const response = await this.api.getPermissions();

            return response;

        } catch (error:any) {
            
            throw new Error(error?.message || 'Error al obtener la lista de permisos.');

        }
    }
}

export default PermissionService;