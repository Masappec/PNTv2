import TransparencyFocusEntity from "../../domain/entities/TransparencyFocus";
import TransparencyFocusMapper from "../../domain/mappers/TransparencyFocusMapper";
import { Pagination } from "../Api";
import { TransparencyFocusCreateDto, TransparencyFocusListDto } from "../Api/TransparencyFocus/interface";
import TransparencyFocusApi from "../Api/TransparencyFocus/TransparencyFocusApi";

class TransparencyFocusService {
    private api: TransparencyFocusApi;
    constructor(transparencyFocus: TransparencyFocusApi) {
        this.api = transparencyFocus;
    }
    async getTransparencyFocusList(search?: string, page?: number): Promise<Pagination<TransparencyFocusEntity>> {

        const response = await this.api.TransparencyList(search, page);
        return {
            current: response.current,
            limit: response.limit,
            next: response.next,
            previous: response.previous,
            results: response.results.map((transparencyFocus: TransparencyFocusListDto) => TransparencyFocusMapper.apiToDomain(transparencyFocus)),
            total: response.total,
            to: response.to,
            from: response.from,
            total_pages: response.total_pages

        }

    }

    async createTransparencyFocus(data: TransparencyFocusCreateDto): Promise<TransparencyFocusEntity> {
        const response = await this.api.createTransparencyFocus(data);
        return TransparencyFocusMapper.apiToDomain(response.json as TransparencyFocusListDto);
    }

    async updateTransparencyFocus(data: TransparencyFocusCreateDto, id: number): Promise<TransparencyFocusEntity> {
        const response = await this.api.updateTransparencyFocus(data, id);
        return TransparencyFocusMapper.apiToDomain(response.json as TransparencyFocusListDto);
    }

    async getTransparencyFocusPublics(month: number, year: number, establishment_id: number): Promise<TransparencyFocusEntity[]> {
        const response = await this.api.getTransparencyFocusPublic(month, year, establishment_id);
        return response.map((transparencyFocus: TransparencyFocusListDto) => TransparencyFocusMapper.apiToDomain(transparencyFocus));
    }
    async deleteTransparencyFocus(id: number): Promise<void> {
        return await this.api.deleteTransparencyFocus(id);
    }

}
export default TransparencyFocusService