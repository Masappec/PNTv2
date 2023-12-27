import RoleService from "../../../infrastructure/Services/RoleService";
import RoleEntity from "../../entities/RoleEntity";


class RoleUseCase {
  constructor(private roleRepository: RoleService) {}

  async execute(text?:string): Promise<RoleEntity[]> {
    const roles = await this.roleRepository.getRoleList(text);
    return roles;
  }
  async create(role:RoleEntity): Promise<RoleEntity> {
    const roles = await this.roleRepository.createRole(role);
    return roles;
  }

  async detail(id:string): Promise<RoleEntity> {
    const roles = await this.roleRepository.detailRole(id);
    return roles;
  }

  async update(id:string, role:RoleEntity): Promise<RoleEntity> {
    const roles = await this.roleRepository.updateRole(id, role);
    return roles;
  }
}

export default RoleUseCase;