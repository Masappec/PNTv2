import { SolicityDraftRequestDto, SolicityResponseDto, SolicityResult } from "../../infrastructure/Api/Solicity/interface"
import CreateSolicity from "../entities/CreateSolicity";
import { Solicity } from "../entities/Solicity"

class SolicityMappers {

    static apiToDomain(data: SolicityResponseDto): Solicity {
        console.log(data.time_line)
        return new Solicity(
            data.id,
            data.created_at + "",
            data.updated_at + "",
            data.deleted || false,
            data.deleted_at + "",
            data.ip + "",
            data.number_saip,
            data.date,
            data.city,
            data.text,
            data.is_active,
            data.status,
            data.expiry_date,
            data.have_extension,
            data.is_manual,
            data.first_name,
            data.last_name,
            data.email,
            data.race_identification,
            data.gender,
            data.address,
            data.phone,
            data.format_send,
            data.format_receipt,
            data.user_created + "",
            data.user_updated + "",
            data.user_deleted + "",
            data.establishment,
            data.time_line.map((timeline) => ({
                status: timeline.status,
                created_at: timeline.created_at
            })),
            data.estblishment_name,

        )
    }




    static domainToApi(
        data: CreateSolicity

    ): SolicityDraftRequestDto {

        return {

            number_saip: data.number_saip,
            city: data.city,
            text: data.text,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            race_identification: data.race_identification,
            gender: data.gender,
            address: data.address,
            phone: data.phone,
            format_send: data.format_send,
            format_receipt: data.format_receipt,
            establishment: data.establishment,
            date: new Date().toISOString()

        }
    }
    static domainApi(
        data: ResponseSolicity

    ): SolicityResult {
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