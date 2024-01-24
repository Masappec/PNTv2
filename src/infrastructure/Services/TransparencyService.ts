import PublicationMapper from "../../domain/mappers/PublicationMapper";
import TransparencyApi from "../Api/Transparency/TransparencyApi";



class TransparencyService{

    private readonly _service: TransparencyApi;

    constructor(service: TransparencyApi){
        this._service = service;
    }


    async getTransparencyActive(id_establishment?: number,page?:number) {

        const res = await this._service.getTransparencyActive(id_establishment,page);

        return {
            ...res,
            results: res.results.map((publication) => {
                return PublicationMapper.toDomain(publication);
            })
        }
        
        
    }

    async getDetailTransparency(slug: string) {
            
            const res = await this._service.getDetailTransparency(slug);
    
            return PublicationMapper.toDomain(res);
            
        }

        async getListTransparency(){

            const res = await this._service.getListTransparency();
           return{
            ...res,
            results: res.results.map((publication)=>{
                return PublicationMapper.toDomain(publication);         
              })

        
           }
        }
}

export default TransparencyService;