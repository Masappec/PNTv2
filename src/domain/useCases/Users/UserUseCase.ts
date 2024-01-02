import UserService from "../../../infrastructure/Services/UserService";
import UserEntity from "../../entities/UserEntity";
import UserMapper from "../../mappers/UserMapper";



class UserUseCase {
  constructor(private readonly userRepository: UserService) {}

  async execute(search?: string,page?: number){
    const users = await this.userRepository.getUserList(search,page);

    return {
      ...users,
      results: users.results.map((user) => 
        UserMapper.fromApiToDomain(user)
      )
    }
  }


  async create(user: UserEntity){
    const data = await this.userRepository.createUser(user);
    const newUser = data.json;
    if (!newUser){
      throw new Error("Error al crear usuario");
    }
    return UserMapper.fromApiToDomain(newUser);
  }
  
  
  async update(user: UserEntity){
    const data = await this.userRepository.updateUser(user);
    const newUser = data.json;
    if (!newUser){
      throw new Error("Error al actualizar usuario");
    }
    return UserMapper.fromApiToDomain(newUser);
  }

  async delete(id: number){
    const data = await this.userRepository.deleteUser(id);
    
    return data;
  }

  async get(id: number){
    const data = await this.userRepository.getUser(id);
    
    return UserMapper.fromApiToDomain(data);
  }
  
}

export default UserUseCase;