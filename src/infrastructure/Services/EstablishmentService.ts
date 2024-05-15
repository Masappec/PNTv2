import { AxiosError } from "axios";
import EstablishmentEntity from "../../domain/entities/Establishment";
import EstablishmentMapper from "../../domain/mappers/EstablishmentMapper";
import { Pagination } from "../Api";
import EstablishmentApi from "../Api/Establishment/EstablishmentApi";
import { EstablishmentListDto } from "../Api/Establishment/interface";


class EstablishmentService {
    private api: EstablishmentApi;
    constructor(establishmentApi: EstablishmentApi) {
        this.api = establishmentApi;
    }
    async getEstablishments(search?: string, page?: number): Promise<Pagination<EstablishmentEntity>> {
        try {
            const response = await this.api.getEstablishments(search, page);
            return {
                current: response.current,
                limit: response.limit,
                next: response.next,
                previous: response.previous,
                results: response.results.map((establishment: EstablishmentListDto) => EstablishmentMapper.apiToDomain(establishment)),
                total: response.total,
                to: response.to,
                from: response.from,
                total_pages: response.total_pages
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener los establecimientos.';
                throw new Error(e);
            } else {
                throw new Error('Error al obtener los establecimientos.');
            }

        }
    }


    async Create(data: EstablishmentEntity) {
        try {
            const response = await this.api.Create(EstablishmentMapper.domainToApi(data));
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al crear el establecimiento.';
                throw new Error(e);
            } else {
                throw new Error('Error al crear el establecimiento.');
            }
        }

    }

    async detail(id: string) {
        try {
            const response = await this.api.detail(id);
            return EstablishmentMapper.apiToDomainDetail(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al obtener el establecimiento.';
                throw new Error(e);
            } else {
                throw new Error('Error al obtener el establecimiento.');
            }
        }
    }


    async update(data: EstablishmentEntity, id: string) {
        try {
            const response = await this.api.update(EstablishmentMapper.domainToApi(data), id);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                const e: string = error.response?.data?.message || 'Error al actualizar el establecimiento.';
                throw new Error(e);
            } else {
                throw new Error('Error al actualizar el establecimiento.');
            }
        }

    }

    async delete(id: string) {

        const response = await this.api.delete(id);
        return response;

    }

    async getByUserSession() {
        const res = await this.api.getByUserSession();
        return EstablishmentMapper.apiToDomainDetail(res);
    }

    async getOptions() {
        return await this.api.getOptions();
    }
    async getEstablishmentsByUser(user_id: string) {
        
            const response = await this.api.getEstablishmentsByUser(user_id);
        return EstablishmentMapper.apiToDomainDetail(response);

    }
}

export default EstablishmentService;