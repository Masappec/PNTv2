import PedagogyAreaEntity from "../../domain/entities/PedagodyAreaEntity";
import PedagogyAreaMapper from "../../domain/mappers/PedagogyAreaMapper";
import PedagogyAreaApi from "../Api/PedagogyArea/PedagogyAreaApi";


class PedagogyAreaService{

    private api:PedagogyAreaApi;

    constructor(api:PedagogyAreaApi){
        this.api = api;
    }


    async getPedagogyArea():Promise<PedagogyAreaEntity>{
        try{
            const response = await this.api.getPedagogyArea();
            return PedagogyAreaMapper.fromApiToDomain(response);
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    async createPedagogyArea(data:PedagogyAreaEntity){
        try{
            const response = await this.api.createPedagogyArea(PedagogyAreaMapper.fromDomainToApi(data));
            return PedagogyAreaMapper.fromApiToDomain(response);
        }catch(error:any){
            throw new Error(error.message);
        }
    }
}

export default PedagogyAreaService;