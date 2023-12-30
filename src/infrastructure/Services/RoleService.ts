import RoleEntity from "../../domain/entities/RoleEntity";
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

    async createRole(role: RoleEntity) {
        try {
            const response = await this.api.createRole(RoleMapper.fromDomainToApi(role));

            return RoleMapper.fromApiToDomain(response);

        } catch (error:any) {
            
            throw new Error(error?.message || 'Error al registrar el usuario.');

        }
    }


    async detailRole(id: string) {
        try {
            const response = await this.api.detailRole(id);

            return RoleMapper.fromApiToDomainDetail(response);

        } catch (error:any) {
            
            throw new Error(error?.message || 'Error al registrar el usuario.');

        }
    }

    async updateRole(id: string, role: RoleEntity) {
        try {
            const response = await this.api.updateRole(id, RoleMapper.fromDomainToApi(role));

            return RoleMapper.fromApiToDomain(response);

        } catch (error:any) {
            
            throw new Error(error?.message || 'Error al registrar el usuario.');

        }
    }

    async deleteRole(id:string) {
        try {
            const response = await this.api.deleteRole(id);
    
            return response;
    
        } catch (error:any) {
            
            throw new Error(error?.message || 'Error al registrar el usuario.');
    
        }
    }
}

export default RoleService;