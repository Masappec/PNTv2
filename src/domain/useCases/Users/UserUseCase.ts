import UserService from "../../../infrastructure/Services/UserService";
import UserEntity from "../../entities/UserEntity";



class UserUseCase {
  constructor(private readonly userRepository: UserService) {}

  async execute(){
    const users = await this.userRepository.getUserList();

    return {
      ...users,
      results: users.results.map((user) => new UserEntity(user.id, user.email, user.username, user.first_name, user.last_name))
    }
  }

  
  
}

export default UserUseCase;