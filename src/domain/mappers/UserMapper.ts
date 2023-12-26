import { User, UserCreateInterface } from "../../infrastructure/Api/User/interface";
import UserEntity from "../entities/UserEntity";


class UserMapper {
    static fromApiToDomain(user: User):UserEntity {
        return {
            email: user.email,
            username: user.username,
            firstName: user.first_name,
            id: user.id || 0,
            lastName: user.last_name,
            address: user.address,
            city: user.city,
            country: user.country,
            identification: user.identification,
            phone: user.phone,
            province: user.province,
            groups: user.groups,
            type_person: user.type_person,
            
        }
    }


    

    static fromDomainToApi(user: UserEntity):UserCreateInterface {
        return {
            email: user.email,
            username: user.username,
            first_name: user.firstName,
            id: user.id,
            last_name: user.lastName,
            address: user.address,
            city: user.city,
            country: user.country,
            identification: user.identification,
            phone: user.phone,
            province: user.province,
            type_person: user.type_person,
            groups: [
                ...user.groups?.map((group) => group.id) || []
            ],
        }
    }
}

export default UserMapper;