import { LoginResponseDto, RegisterDto } from "../../infrastructure/Api/Auth/interface";
import UserEntity from "../entities/UserEntity";


class AuthMapper {
    static fromDomainToDTO(auth: UserEntity): RegisterDto {
        return {
            city: auth.city || '',
            first_name: auth.first_name,
            identification: auth.identification || '',
            last_name: auth.last_name || '',
            password: auth?.password || '',
            phone: auth.phone || '',
            province: auth.province || '',
            username: auth.username || '',
            accept_terms: true,
            age_range: '',
            gender: '',
            race: '',
            confirm_password: ''
        }
    }


    static fromApiToDomain(auth: LoginResponseDto): UserEntity {
        return {
            email: auth.user.email,
            first_name: auth.user.first_name,
            id: auth.user.id,
            last_name: auth.user.last_name,
            username: auth.user.username,
            accept_terms: true,
            address: '',
            age_range: '',
            city: '',
            country: '',
            establishment_id: 0,
            group: auth.user.group,
            identification: '',
            is_active: true,
            job: '',
            password: '',
            phone: '',
            province: '',
            race: '',
            user_permissions: auth.user.user_permissions,
        }
    }
}

export default AuthMapper;