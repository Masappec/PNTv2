import TransparencyFocusService from "../../../infrastructure/Services/TransparencyFocusService";

class TransparencyFocusUseCase {
    service;
    constructor(transparencyFocusService: TransparencyFocusService) {
        this.service = transparencyFocusService;

    }
    async getTransparencyFocusList(search?: string, page?: number) {
        const response = await this.service.getTransparencyFocusList(search, page);
        return response;

    }

    async createTransparencyFocus(
        entity_id: number,
        files: number[]
    ) {
        const response = await this.service.createTransparencyFocus({
            establishment_id: entity_id,
            files

        });
        return response;
    }
}

export default TransparencyFocusUseCase;