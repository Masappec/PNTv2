import PedagogyAreaService from "../../../infrastructure/Services/PedagogyAreaService";
import PedagogyAreaEntity from "../../entities/PedagodyAreaEntity";


class PedagogyAreaUseCase{
    
    private service:PedagogyAreaService;

    constructor(service:PedagogyAreaService){
        this.service = service;
    }

    async getPedagogyArea(){
        try{
            return await this.service.getPedagogyArea();
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    async createPedagogyArea(data:PedagogyAreaEntity){
        try{
            return await this.service.createPedagogyArea(data);
        }catch(error:any){
            throw new Error(error.message);
        }
    }

}

export default PedagogyAreaUseCase;