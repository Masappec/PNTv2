import PublicationEntity from "../../domain/entities/PublicationEntity";
import PublicationMapper from "../../domain/mappers/PublicationMapper";
import PublicationApi from "../Api/Publication/PublicationApi";



class PublicationService{

    constructor(private readonly publicationApi: PublicationApi){}


    async createPublication(data: PublicationEntity){
        return await this.publicationApi.createPublication(PublicationMapper.fromDomainToApi(data));
    }
}

export default PublicationService;