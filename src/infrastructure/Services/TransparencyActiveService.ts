import TransparencyActive from "../../domain/entities/TransparencyActive";
import TransparencyActiveMapper from "../../domain/mappers/TransparencyActiveMapper";
import TransparencyActiveApi from "../Api/TansparencyActive/TransparencyActiveApi";


class TransparencyActiveService {

    constructor(private readonly api: TransparencyActiveApi) { }

    public async createPublication(data: TransparencyActive) {
        const res = await this.api.createPublication(TransparencyActiveMapper.fromDomainToApi(data));

        return TransparencyActiveMapper.fromApiToDomain(res);
    }
}

export default TransparencyActiveService;