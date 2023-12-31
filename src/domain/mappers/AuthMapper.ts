import { RegisterDto } from "../../infrastructure/Api/Auth/AuthApi";
import UserEntity from "../entities/UserEntity";


class AuthMapper{
    static fromDomainToDTO(auth: UserEntity): RegisterDto{
        return {
            city: auth.city||'',
            first_name: auth.firstName,
            identification: auth.identification || '',
            last_name: auth.lastName,
            password: auth?.password || '',
            phone: auth.phone || '',
            province: auth.province || '',
            username: auth.username || '',
            accept_terms: true,
            age_range: '',
            gender:'',
            race:''
        }
    }
}

export default AuthMapper;