import { RoleListResponse } from "../../infrastructure/Api/Role/interface";
import RoleEntity from "../entities/RoleEntity";


class RoleMapper{
    static fromApiToDomain(role: RoleListResponse): RoleEntity{
        return {
            id: role.id,
            name: role.name,
        }
    }
}

export default RoleMapper;