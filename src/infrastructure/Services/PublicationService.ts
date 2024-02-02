import PublicationEntity from "../../domain/entities/PublicationEntity";
import PublicationMapper from "../../domain/mappers/PublicationMapper";
import PublicationApi from "../Api/Publication/PublicationApi";



class PublicationService{

    constructor(private readonly publicationApi: PublicationApi){}


    async createPublication(data: PublicationEntity){
        return await this.publicationApi.createPublication(PublicationMapper.fromDomainToApi(data));
    }

    async getPublication(id:number){
        const res = await this.publicationApi.getPublication(id);

        return PublicationMapper.toDomain(res);
    }

    async updatePublication(data: PublicationEntity){
        if (!data.id) throw new Error("No se puede actualizar una publicación que no existe");
        const res = await this.publicationApi.updatePublication(data.id, PublicationMapper.fromDomainToApi(data));
        return PublicationMapper.toDomain(res);
    }

    async updateState(id:number){
        const res = await this.publicationApi.updateState(id);
        return PublicationMapper.toDomain(res);
    }



}

export default PublicationService;