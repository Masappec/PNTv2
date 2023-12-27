import { RegisterDto } from "../../infrastructure/Api/Auth/AuthApi";
import UserEntity from "../entities/UserEntity";


class AuthMapper{
    static fromDomainToDTO(auth: UserEntity): RegisterDto{
        return {
            address: auth.address||'',
            city: auth.city||'',
            country: auth.country||'',
            email: auth.email,
            first_name: auth.firstName,
            identification: auth.identification || '',
            last_name: auth.lastName,
            password: auth?.password || '',
            phone: auth.phone || '',
            province: auth.province || '',
            username: auth.username || ''
        }
    }
}

export default AuthMapper;