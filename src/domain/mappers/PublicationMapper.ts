import { PublicationResponse } from "../../infrastructure/Api/Transparency/interface";
import PublicationEntity, { TagEntity, TypeFormatEntity } from "../entities/PublicationEntity";


class PublicationMapper {

    static toDomain(raw: PublicationResponse): PublicationEntity {
        return {
            createdAt: raw.created_at ? new Date(raw.created_at) : undefined,
            updatedAt: raw.updated_at ? new Date(raw.updated_at) : undefined,
            deleted: raw.deleted,
            deletedAt: raw.deleted_at ? new Date(raw.deleted_at) : undefined,
            description: raw.description,
            establishment: raw.establishment,
            file_publication: raw.file_publication,
            id: raw.id,
            ip: raw.ip,
            is_active: raw.is_active,
            name: raw.name,
            tag:raw.tag.map((tag) => {
                return {
                    id: tag.id,
                    name: tag.name,
                } as TagEntity
            }),
            type_format: raw.type_format.map((type) => {
                return {
                    id: type.id,
                    name: type.name,
                } as TypeFormatEntity
            }),
            type_publication: raw.type_publication,
            userCreated: raw.user_created?.toString(),
            userDeleted: raw.user_deleted?.toString(),
            userUpdated: raw.user_updated?.toString(),
            email_created: raw.email_created,
        }
    }

}

export default PublicationMapper;