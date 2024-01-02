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
    async getEstablishments(search?: string,page?: number):Promise<Pagination<EstablishmentEntity>>{
        try{
            const response = await this.api.getEstablishments(search,page);
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


    async Create(data:EstablishmentEntity)
    {   
        try{
            const response = await this.api.Create(EstablishmentMapper.domainToApi(data));
            return response;
        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al crear el establecimiento.';
            throw new Error(e);
        }

    }

    async detail(id:string){
        try{
            const response = await this.api.detail(id);
            return EstablishmentMapper.apiToDomainDetail(response);
        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al obtener el establecimiento.';
            throw new Error(e);
        }
    }


    async update(data:EstablishmentEntity,id:string)
    {   
        try{
            const response = await this.api.update(EstablishmentMapper.domainToApi(data),id);
            return response;
        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al actualizar el establecimiento.';
            throw new Error(e);
        }

    }

    async delete(id:string){
        try{
            const response = await this.api.delete(id);
            return response;
        }catch(error:any){
            const e:string = error.response?.data?.message || 'Error al eliminar el establecimiento.';
            throw new Error(e);
        }
    }
    
}

export default EstablishmentService;