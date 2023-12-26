import RoleMapper from "../../domain/mappers/RoleMapper";
import RoleApi from "../Api/Role/RoleApi";


class RoleService{
    api:RoleApi;

    constructor(api:RoleApi) {
      this.api = api;
    }


    async getRoleList(search?: string) {
        try {
            const response = await this.api.getRoleList(search);

            return response.map((role) => RoleMapper.fromApiToDomain(role));

        } catch (error:any) {
            
            throw new Error(error?.message || 'Error al registrar el usuario.');

        }
    }
}

export default RoleService;