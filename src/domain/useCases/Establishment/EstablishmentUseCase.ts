import EstablishmentService from "../../../infrastructure/Services/EstablishmentService";
import EstablishmentEntity from "../../entities/Establishment";


class EstablishmentUseCase {
    service;
    constructor(establishmentService: EstablishmentService) {
        this.service = establishmentService;
    }


    async getEstablishments(search?: string, page?: number, function_?: string) {

        const response = await this.service.getEstablishments(search, page, function_);
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

    async getEstablishmentsByUser(user_id: string) {
        const res = await this.service.getEstablishmentsByUser(user_id);
        return res;
    }

    async getEstablishmentsByUserList(search?: string, page?: number) {
        const res = await this.service.getEstablishmentsByUserList(search, page);
        return res;
    }
}
export default EstablishmentUseCase;