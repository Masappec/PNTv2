import { RoleCreateRequest, RoleDetailResponse, RoleListAvailableResponse, RoleListResponse } from "../../infrastructure/Api/Role/interface";
import RoleEntity from "../entities/RoleEntity";


class RoleMapper{
    static fromApiToDomain(role: RoleListResponse): RoleEntity{
        return {
            id: role.id,
            name: role.name,
        }
    }


    static fromDomainToApi(role: RoleEntity): RoleCreateRequest{
        return {
            name: role.name,
            permissions: role.permission?.map(permission => permission.codename) || []
        }
    }
    
    static fromApiToDomainDetail(role: RoleDetailResponse): RoleEntity{
        return {
            id: role.id,
            name: role.name,
            permission: role.permissions
            
        }
    }

    static fromApiToDomainAvailable(role: RoleListAvailableResponse): RoleEntity{
        return {
            id: role.id,
            name: role.name,
            permission_required: role.permission_required
        }
    }
}

export default RoleMapper;