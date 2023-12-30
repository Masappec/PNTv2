import { EstablishmentListDto } from "../../infrastructure/Api/Establishment/interface";
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
            
        }
    }
}

export default EstablishmentMapper;