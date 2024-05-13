import NumeralDetailMapper from "../../domain/mappers/NumeralDetailMapper";
import NumeralMapper from "../../domain/mappers/NumeralMapper";
import NumeralApi from "../Api/Numeral/NumeralApi";


class NumeralService {

    constructor(private readonly api: NumeralApi) { }


    async getNumeralByEstablishment(establishment_id: number) {
        const res = await this.api.getNumeralByEstablishment(establishment_id)
        return res.map(r => NumeralMapper.fromApiToDomain(r))
    }

    async getNumeralById(numeral_id: number) {
        const res = await this.api.getNumeralById(numeral_id)
        return NumeralDetailMapper.toDomain(res)
    }

    async getFocalizedOrCollab(type: string) {
        const res = await this.api.getNumeralById(0, type)
        return NumeralDetailMapper.toDomain(res)
    }

    async getNumeralsAllowed() {
        const res = await this.api.getNumeralsAllowed()
        return res.map(r => NumeralDetailMapper.toDomain(r))
    }

}

export default NumeralService;