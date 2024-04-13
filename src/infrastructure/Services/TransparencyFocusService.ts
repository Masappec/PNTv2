import TransparencyFocusEntity from "../../domain/entities/TransparencyFocus";
import TransparencyFocusMapper from "../../domain/mappers/TransparencyFocusMapper";
import { Pagination } from "../Api";
import { TransparencyFocusListDto } from "../Api/TransparencyFocus/interface";
import TransparencyFocusApi from "../Api/TransparencyFocus/TransparencyFocusApi";

class TransparencyFocusService{
    private api : TransparencyFocusApi;
    constructor( transparencyFocus: TransparencyFocusApi ) {
        this.api = transparencyFocus;
    }
    async getTransparencyFocusList(search? : string, page?: number) : Promise<Pagination<TransparencyFocusEntity>>{
   
        const response= await this.api.TransparencyList(search,page);
        return{
            current: response.current,
            limit: response.limit,
            next: response.next,
            previous: response.previous,
            results: response.results.map((transparencyFocus:TransparencyFocusListDto) => TransparencyFocusMapper.apiToDomain(transparencyFocus)),
            total: response.total,
            to: response.to,
            from: response.from,
            total_pages: response.total_pages 
        
     } 

    }
    
}
export default TransparencyFocusService