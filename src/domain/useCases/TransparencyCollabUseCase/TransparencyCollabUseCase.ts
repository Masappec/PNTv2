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
}

export default TransparencyCollabUseCase;