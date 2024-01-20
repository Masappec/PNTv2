import { EstablishmentCreateDTO, EstablishmentDetailDTO, EstablishmentListDto } from "../../infrastructure/Api/Establishment/interface";
import EstablishmentEntity from "../entities/Establishment";


class EstablishmentMapper{

    static apiToDomain(data:EstablishmentListDto):EstablishmentEntity{
        return {
            id: data.id,
            name: data.name,
            abbreviation: data.abbreviation,
            code: data.code,
            email_authority: data.email_authority,
            first_name_authority: data.first_name_authority,
            highest_authority: data.highest_authority,
            job_authority: data.job_authority,
            last_name_authority: data.last_name_authority,
            logo: data.logo,
            is_active: data.is_active,
            
        }
    }


    static apiToDomainDetail(data:EstablishmentDetailDTO):EstablishmentEntity{
        return {
            id: data.id,
            name: data.name,
            abbreviation: data.abbreviation,
            code: data.code,
            email_authority: data.email_authority,
            first_name_authority: data.first_name_authority,
            highest_authority: data.highest_authority,
            job_authority: data.job_authority,
            last_name_authority: data.last_name_authority,
            logo: data.logo,
            email_accesstoinformation: data.email_accesstoinformation || '',
            email_committe: data.email_committe || '',
            first_name_committe: data.first_name_committe,
            highest_committe: data.highest_committe,
            job_committe: data.job_committe,
            last_name_committe: data.last_name_committe,
        }
    }


    static domainToApi(data:EstablishmentEntity):EstablishmentCreateDTO{
        return {
            name: data.name,
            abbreviation: data.abbreviation,
            code: data.code,
            email_authority: data.email_authority,
            first_name_authority: data.first_name_authority,
            highest_authority: data.highest_authority,
            job_authority: data.job_authority,
            last_name_authority: data.last_name_authority,
            logo: data.logo as File,
            email_accesstoinformation: data.email_accesstoinformation || '',
            email_committe: data.email_committe || '',
            first_name_committe: data.first_name_committe || '',
            highest_committe: data.highest_committe || '',
            job_committe: data.job_committe || '',
            last_name_committe: data.last_name_committe || '',
        }
    }
}

export default EstablishmentMapper;