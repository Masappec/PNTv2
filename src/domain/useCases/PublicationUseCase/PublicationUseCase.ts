import PublicationService from "../../../infrastructure/Services/PublicationService";
import PublicationEntity from "../../entities/PublicationEntity";



class PublicationUseCase{

    constructor(private publicationRepository: PublicationService){}

    async createPublication(data: PublicationEntity){
        return await this.publicationRepository.createPublication(data);
    }
}

export default PublicationUseCase;