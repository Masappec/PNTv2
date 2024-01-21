import EstablishmentMapper from "../../domain/mappers/EstablishmentMapper";
import PedagogyAreaMapper from "../../domain/mappers/PedagogyAreaMapper";
import { EstablishmentListDto } from "../Api/Establishment/interface";
import PublicApi from "../Api/Public/PublicApi";


class PublicService{

    private api: PublicApi;
    

    constructor(api: PublicApi) {
        this.api = api;
    }


    async getEstablishments(search?: string, page?: number) {
        
        const response = await this.api.getEstablishments(search,page);
        return {
            current: response.current,
            limit: response.limit,
            next: response.next,
            previous: response.previous,
            results: response.results.map((establishment) => EstablishmentMapper.apiToDomain(establishment as EstablishmentListDto)),
            total: response.total,
            total_pages: response.total_pages
        }
        
    }

    async getPedagogyArea(){
        const response = await this.api.getPedagogyArea();
        return PedagogyAreaMapper.fromApiToDomain(response);
    }

    async getEstablishment(id: string){
        const response = await this.api.getEstablishment(id);
        return EstablishmentMapper.apiToDomain(response as EstablishmentListDto);
    }
}

export default PublicService;