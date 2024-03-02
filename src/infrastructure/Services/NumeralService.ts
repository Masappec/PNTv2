import NumeralMapper from "../../domain/mappers/NumeralMapper";
import NumeralApi from "../Api/Numeral/NumeralApi";


class NumeralService{

    constructor(private readonly api: NumeralApi){}


    async getNumeralByEstablishment(establishment_id:number){
        const res =  await this.api.getNumeralByEstablishment(establishment_id)
        return res.map(r => NumeralMapper.fromApiToDomain(r))
    }

}

export default NumeralService;