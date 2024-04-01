import { SolicityResponseDto } from "../../infrastructure/Api/Solicity/interface"
import { Solicity } from "../entities/Solicity"

class SolicityMappers{

    static apiToDomain(data: SolicityResponseDto): Solicity {
        return {
            establishment:data.establishment,
         have_extension: data.have_extension,
         expiry_date: data.expiry_date,
         id: data.id,
         is_active: data.is_active,
         is_manual: data.is_manual,
         status: data.status,
         text: data.text,

        }
    }




    static domainToApi(data: Solicity): SolicityResponseDto {
        return {
         establishment:data.establishment,
         have_extension: data.have_extension,
         expiry_date: data.expiry_date,
         id: data.id,
         is_active: data.is_active,
         is_manual: data.is_manual,
         status: data.status,
         text: data.text,

        }
    }
}
export default SolicityMappers;