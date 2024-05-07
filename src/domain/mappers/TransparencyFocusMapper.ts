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
        }
    }
}

export default TransparencyFocusMapper;