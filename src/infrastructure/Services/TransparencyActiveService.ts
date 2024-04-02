import TransparencyActive from "../../domain/entities/TransparencyActive";
import TransparencyActiveMapper from "../../domain/mappers/TransparencyActiveMapper";
import TransparencyActiveApi from "../Api/TansparencyActive/TransparencyActiveApi";


class TransparencyActiveService {

    constructor(private readonly api: TransparencyActiveApi) { }

    public async createPublication(data: TransparencyActive) {
        const res = await this.api.createPublication(TransparencyActiveMapper.fromDomainToApi(data));

        return TransparencyActiveMapper.fromApiToDomain(res);
    }

    public async getPublicationsPublics(month: number, year: number, establishment_id: number) {
        const res = await this.api.getPublicationsPublics(month, year, establishment_id);

        return res.map((item) => TransparencyActiveMapper.fromApiPublicToDomain(item));
    }
}

export default TransparencyActiveService;