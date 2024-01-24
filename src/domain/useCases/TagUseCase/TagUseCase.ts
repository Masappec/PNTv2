import TagService from "../../../infrastructure/Services/TagService";
import { TagEntity } from "../../entities/TagEntity";



class TagUseCase{

    constructor(private tagRepository: TagService){}

    async getTagByName(name: string){
        return await this.tagRepository.getTagByName(name);
    }

    async createNewTag(name: string){
        const tag = new TagEntity(0, name, true);
        return await this.tagRepository.createNewTag(tag);
    }


}

export default TagUseCase;