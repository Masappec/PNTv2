import EstablishmentService from "../../../infrastructure/Services/EstablishmentService";
import EstablishmentEntity from "../../entities/Establishment";


class EstablishmentUseCase {
    service;
    constructor(establishmentService: EstablishmentService) {
        this.service = establishmentService;
    }


    async getEstablishments(search?: string, page?: number) {

        const response = await this.service.getEstablishments(search, page);
        return response;

    }
    async Create(data: EstablishmentEntity) {
        const response = await this.service.Create(data);
        return response;
    }

    async detail(id: string) {
        const response = await this.service.detail(id);
        return response;
    }

    async update(data: EstablishmentEntity, id: string) {
        const response = await this.service.update(data, id);
        return response;
    }

    async delete(id: string) {
        const response = await this.service.delete(id);
        return response;
    }


    async getByUserSession() {
        const res = await this.service.getByUserSession();
        return res
    }

    async getOptions() {
        const res = await this.service.getOptions();
        return res;
    }
}
export default EstablishmentUseCase;