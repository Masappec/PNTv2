import PublicationService from "../../../infrastructure/Services/PublicationService";
import PublicationEntity from "../../entities/PublicationEntity";



class PublicationUseCase{

    constructor(private publicationRepository: PublicationService){}

    async createPublication(data: PublicationEntity){
        return await this.publicationRepository.createPublication(data);
    }

    async getPublication(id:number){
        return await this.publicationRepository.getPublication(id);
    }
    async updatePublication(data: PublicationEntity){
        return await this.publicationRepository.updatePublication(data);
    }

    async updateState(id:number){
        return await this.publicationRepository.updateState(id);
    }
}

export default PublicationUseCase;