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
    async getEstablishment(slug: string){
        return await this.service.getEstablishment(slug);
    }

    async getMonthsByTransparency(type:'A'|'F'|'C',establishment_id:number, year:number){
        return await this.service.getMonthsByTransparency(type,establishment_id,year);
    }

}

export default PublicUseCase;