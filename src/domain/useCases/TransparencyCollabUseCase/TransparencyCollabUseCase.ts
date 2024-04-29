import TransparencyCollabService from "../../../infrastructure/Services/TransparencyCollabService";

class TransparencyCollabUseCase {
    service;
    constructor(transparencyService: TransparencyCollabService) {
        this.service = transparencyService;

    }
    async getTransparencyCollabList(search?: string, page?: number) {
        const response = await this.service.getTransparencyCollabList(search, page);
        return response;

    }

    async createTransparencyCollab(
        entity_id: number,
        files: number[]
    ) {
        const response = await this.service.createTransparencyCollab({
            establishment_id: entity_id,
            files

        });
        return response;
    }

    async updateTransparencyCollab(
        entity_id: number,
        files: number[],
        id: number
    ) {
        const response = await this.service.updateTransparencyFocus({
            establishment_id: entity_id,
            files

        }, id);
        return response;
    }

    async getTransparencyCollabPublics(
        month: number,
        year: number,
        establishment_id: number
    ) {
        const response = await this.service.getTransparencyCollabPublics(month, year, establishment_id);
        return response;
    }

    async deleteTransparencyCollab(id: number) {
        return await this.service.deleteTransparencyCollab(id);
    }
}

export default TransparencyCollabUseCase;