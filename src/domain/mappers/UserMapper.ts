import { User, UserCreateInterface } from "../../infrastructure/Api/User/interface";
import UserEntity from "../entities/UserEntity";


class UserMapper {
    static fromApiToDomain(user: User):UserEntity {
        return {
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            id: user.id || 0,
            last_name: user.last_name,
            address: user.address,
            city: user.city,
            country: user.country,
            identification: user.identification,
            phone: user.phone,
            province: user.province,
            group: user.group,
            is_active: user.is_active,
            
        }
    }


    

    static fromDomainToApi(user: UserEntity):UserCreateInterface {
        return {
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            city: user.city || "",
            identification: user.identification,
            phone: user.phone || "",
            province: user.province || "",
            groups: [
                ...user.group?.map((group) => group.id) || []
            ],
            password: user.password || "",
            accept_terms: user.accept_terms || true,
            age_range: user.age_range || "",
            establishment_id: user.establishment_id||0,
            job: user.job || "",
            race: user.race || "",
            
            
        }
    }
}

export default UserMapper;