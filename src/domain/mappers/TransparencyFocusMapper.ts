import { TransparencyFocusListDto } from "../../infrastructure/Api/TransparencyFocus/interface";
import TransparencyFocusEntity from "../entities/TransparencyFocus";


class TransparencyFocusMapper{
    static apiToDomain(data:TransparencyFocusListDto): TransparencyFocusEntity{
     return {
        id: data.id,
        numeral:  data.numeral,
        files: data.files ,
        slug: data.slug,
        month: data.month,
        year: data.year,
        status: data.status,
        published: data.published,
        published_at: data.published_at,
        max_date_to_publish: data.max_date_to_publish ,
        establishment: data.establishment,
     }   
    }
}

export default  TransparencyFocusMapper;