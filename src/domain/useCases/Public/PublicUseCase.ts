import PublicService from "../../../infrastructure/Services/PublicService";



class PublicUseCase {
  
    private service: PublicService;

    constructor(service: PublicService) {
        this.service = service;
    }

    async getEstablishments(search?: string, page?: number) {
        return await this.service.getEstablishments(search,page);
    }

    async getPedagogyArea(){
        return await this.service.getPedagogyArea();
    }
    async getEstablishment(id: string){
        return await this.service.getEstablishment(id);
    }

}

export default PublicUseCase;