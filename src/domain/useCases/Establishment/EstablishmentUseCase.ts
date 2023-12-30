import EstablishmentService from "../../../infrastructure/Services/EstablishmentService";


class EstablishmentUseCase {
    service;
    constructor(establishmentService:EstablishmentService) {
        this.service = establishmentService;
    }


    async getEstablishments(){
        
        const response = await this.service.getEstablishments();
        return response;
        
    }
}
export default EstablishmentUseCase;