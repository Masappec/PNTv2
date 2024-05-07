import TransparencyCollab from "../../domain/entities/TransparencyCollab";
import TransparencyCollabMapper from "../../domain/mappers/TransparencyCollabMapper";
import { Pagination } from "../Api";
import TransparencyCollabApi from "../Api/TransparencyCollab/TransparencyCollab";
import { TransparencyCollabCreateDto, TransparencyCollabListDto } from "../Api/TransparencyCollab/interface";

class TransparencyCollabService {
    private api: TransparencyCollabApi;
    constructor(transparencyFocus: TransparencyCollabApi) {
        this.api = transparencyFocus;
    }
    async getTransparencyCollabList(search?: string, page?: number): Promise<Pagination<TransparencyCollab>> {

        const response = await this.api.getTransparencyCollab(search, page);
        return {
            current: response.current,
            limit: response.limit,
            next: response.next,
            previous: response.previous,
            results: response.results.map((transparencyFocus: TransparencyCollabListDto) =>
                TransparencyCollabMapper.apiToDomain(transparencyFocus)),
            total: response.total,
            to: response.to,
            from: response.from,
            total_pages: response.total_pages

        }

    }

    async createTransparencyCollab(data: TransparencyCollabCreateDto): Promise<TransparencyCollab> {
        const response = await this.api.createTransparencyFocus(data);
        return TransparencyCollabMapper.apiToDomain(response.json as TransparencyCollabListDto);
    }

    async updateTransparencyFocus(data: TransparencyCollabCreateDto, id: number): Promise<TransparencyCollab> {
        const response = await this.api.updateTransparencyFocus(data, id);
        return TransparencyCollabMapper.apiToDomain(response.json as TransparencyCollabListDto);
    }

    async getTransparencyCollabPublics(month: number, year: number, establishment_id: number): Promise<TransparencyCollab[]> {
        const response = await this.api.getTransparencyCollabPublics(month, year, establishment_id);
        return response.map((transparencyFocus: TransparencyCollabListDto) => TransparencyCollabMapper.apiToDomain(transparencyFocus));
    }

    async deleteTransparencyCollab(id: number): Promise<void> {
        return await this.api.deleteTransparencyCollab(id);
    }

}
export default TransparencyCollabService