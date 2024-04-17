import { TransparencyCollabListDto } from "../../infrastructure/Api/TransparencyCollab/interface";
import TransparencyCollab from "../entities/TransparencyCollab";


class TransparencyCollabMapper {
    static apiToDomain(data: TransparencyCollabListDto): TransparencyCollab {
        return {
            id: data.id,
            numeral: data.numeral,
            files: data.files,
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

export default TransparencyCollabMapper;