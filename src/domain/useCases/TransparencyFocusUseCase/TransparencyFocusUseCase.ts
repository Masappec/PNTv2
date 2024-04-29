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

    async updateTransparencyFocus(
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

    async getTransparencyFocusPublics(
        month: number,
        year: number,
        establishment_id: number
    ) {
        const response = await this.service.getTransparencyFocusPublics(month, year, establishment_id);
        return response;
    }


    async deleteTransparencyFocus(id: number) {
        return await this.service.deleteTransparencyFocus(id);
    }
}

export default TransparencyFocusUseCase;