import TransparencyActive from "../../domain/entities/TransparencyActive";
import TransparencyActiveMapper from "../../domain/mappers/TransparencyActiveMapper";
import TransparencyActiveApi from "../Api/TansparencyActive/TransparencyActiveApi";
import { TransparencyActivePublishResponse, TransparencyActiveTypeResponse } from "../Api/TansparencyActive/interface";


class TransparencyActiveService {

    constructor(private readonly api: TransparencyActiveApi) { }

    public async createPublication(data: TransparencyActive) {
        const res = await this.api.createPublication(TransparencyActiveMapper.fromDomainToApi(data));

        return TransparencyActiveMapper.fromApiToDomain(res.json as TransparencyActivePublishResponse)
    }

    public async getPublicationsPublics(month: number, year: number, establishment_id: number) {
        const res = await this.api.getPublicationsPublics(month, year, establishment_id);

        return res.map((item) => TransparencyActiveMapper.fromApiPublicToDomain(item));
    }

    public async updatePublication(data: TransparencyActive) {
        const res = await this.api.updatePublication(TransparencyActiveMapper.fromDomainToApi(data));

        return TransparencyActiveMapper.fromApiToDomain(res.json as TransparencyActivePublishResponse)
    }
    public async approvePublication(data: TransparencyActiveTypeResponse) {
        const res = await this.api.approvePublication(data);

        return res
    }

    public async getPublicationsAll(month: number, year: number, establishment_id: number) {
        const res = await this.api.getPublicationsAll(month, year, establishment_id);
        return res.map((item) => TransparencyActiveMapper.fromApiPublicToDomain(item));
    }
}

export default TransparencyActiveService;