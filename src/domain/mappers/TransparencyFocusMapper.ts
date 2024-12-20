import { TransparencyFocusListDto } from "../../infrastructure/Api/TransparencyFocus/interface";
import TransparencyFocusEntity from "../entities/TransparencyFocus";
import FilePublicationMapper from "./FilePublicationMapper";


class TransparencyFocusMapper {
    static apiToDomain(data: TransparencyFocusListDto): TransparencyFocusEntity {
        return {
            id: data.id,
            numeral: data.numeral,
            files: data.files.map(f => FilePublicationMapper.fromApiToDomain(f)),
            slug: data.slug,
            month: data.month,
            year: data.year,
            status: data.status,
            published: data.published,
            published_at: data.published_at,
            max_date_to_publish: data.max_date_to_publish,
            establishment: data.establishment,
            created_at: new Date(data.created_at || 0),
            deleted: data.deleted || false,
            deleted_at: new Date(data.deleted_at || 0),
            updated_at: new Date(data.updated_at || 0),
            user_created: data.user_created || '',
            user_deleted: data.user_deleted || '',
            user_updated: data.user_updated || '',
        }
    }
}

export default TransparencyFocusMapper;