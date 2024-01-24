import { TagEntity } from "../../domain/entities/TagEntity";
import TagMapper from "../../domain/mappers/TagMapper";
import TagApi from "../Api/TagApi/TagApi";



class TagService {

    constructor(private readonly _api:TagApi){

    }

    async getTagByName(name: string) {
        const res = await this._api.getTagByName(name);
        
        return res.map((tag) => {
            return TagMapper.apiToDomain(tag);
        })
    }


    async createNewTag(entity: TagEntity){
        return await this._api.createNewTag(TagMapper.domainToApi(entity));
    }


}

export default TagService;