import RoleService from "../../../infrastructure/Services/RoleService";
import RoleEntity from "../../entities/RoleEntity";


class RoleUseCase {
  constructor(private roleRepository: RoleService) {}

  async execute(text?:string): Promise<RoleEntity[]> {
    const roles = await this.roleRepository.getRoleList(text);
    return roles;
  }
  
}

export default RoleUseCase;