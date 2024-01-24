import { TagRequest, TagResponse } from "../../infrastructure/Api/TagApi/interface";
import { TagEntity } from "../entities/TagEntity";


class TagMapper {

    static apiToDomain(tag: TagResponse):TagEntity{
        return new TagEntity(tag.id, tag.name, tag.is_active, tag.description);
    }

    static domainToApi(tag: TagEntity):TagRequest{
        return {
            name: tag.name,
        }
    }
}

export default TagMapper;