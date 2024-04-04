import { SolicityRequestDto, SolicityResponseDto, SolicityResult } from "../../infrastructure/Api/Solicity/interface"
import CreateSolicity from "../entities/CreateSolicity";
import { Solicity } from "../entities/Solicity"

class SolicityMappers {

    static apiToDomain(data: SolicityResponseDto): Solicity {
        return {
            establishment: data.establishment,
            have_extension: data.have_extension,
            expiry_date: data.expiry_date,
            id: data.id,
            is_active: data.is_active,
            is_manual: data.is_manual,
            status: data.status,
            text: data.text,

        }
    }




    static domainToApi(
        data: CreateSolicity

    ): SolicityRequestDto {
        return {
            address: data.address,
            description: data.description,
            email: data.email,
            establishment_id: data.establishment_id,
            first_name: data.first_name,
            formatSolicity: data.formatSolicity,
            identification: data.identification,
            last_name: data.last_name,
            phone: data.phone,
            type_reception: data.type_reception

        }
    }
    static domainApi(    
           data: ResponseSolicity

    ): SolicityResult{
        return {
        id_solicitud: data.id_solicitud,
        text: data.text,
        files: data.files,
        attachment: data.attachment,
        category_id: data.category_id
        }
    }
}
export default SolicityMappers;