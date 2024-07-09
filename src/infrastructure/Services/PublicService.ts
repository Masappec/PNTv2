import EstablishmentMapper from "../../domain/mappers/EstablishmentMapper";
import PedagogyAreaMapper from "../../domain/mappers/PedagogyAreaMapper";
import { EstablishmentListDto } from "../Api/Establishment/interface";
import PublicApi from "../Api/Public/PublicApi";


class PublicService {

    private api: PublicApi;


    constructor(api: PublicApi) {
        this.api = api;
    }


    async getEstablishments(search?: string, page?: number) {

        const response = await this.api.getEstablishments(search, page);
        return {
            results: response.results.map((establishment) => {
                return {
                    data: establishment.data.map((data) => {
                        return EstablishmentMapper.apiToDomain(data as EstablishmentListDto)
                    }),
                    letter: establishment.letter
                }
            }),
            total: response.total,
        }

    }

    async getPedagogyArea() {
        const response = await this.api.getPedagogyArea();
        return PedagogyAreaMapper.fromApiToDomain(response);
    }

    async getEstablishment(slug: string) {
        const response = await this.api.getEstablishment(slug);
        return EstablishmentMapper.apiToDomain(response as EstablishmentListDto);
    }

    async getMonthsByTransparency(type: 'A' | 'F' | 'C', establishment_id: number, year: number) {
        return await this.api.getMonthsByTransparency(type, establishment_id, year);
    }
}

export default PublicService;