import EstablishmentEntity from "../../domain/entities/Establishment";
import EstablishmentMapper from "../../domain/mappers/EstablishmentMapper";
import { Pagination } from "../Api";
import EstablishmentApi from "../Api/Establishment/EstablishmentApi";
import { EstablishmentListDto } from "../Api/Establishment/interface";


class EstablishmentService {
    private api:EstablishmentApi;
    constructor(establishmentApi:EstablishmentApi) {
        this.api = establishmentApi;
    }
    async getEstablishments():Promise<Pagination<EstablishmentEntity>>{
        try{
            const response = await this.api.getEstablishments();
            return {
                current: response.current,
                limit: response.limit,
                next: response.next,
                previous: response.previous,
                results: response.results.map((establishment:EstablishmentListDto) => EstablishmentMapper.apiToDomain(establishment)),
                total: response.total
            }
        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al obtener los establecimientos.';
            throw new Error(e);
        }
    }
}

export default EstablishmentService;