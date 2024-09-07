import PublicService from "../../../infrastructure/Services/PublicService";
import EstablishmentEntity from "../../entities/Establishment";



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


    async donwloadPdf(establishments:EstablishmentEntity[]){
        return await this.service.downloadPdf(establishments);
    }
    async donwloadExcel(establishments:EstablishmentEntity[]){
        return await this.service.donwloadExcel(establishments);
    }

    async donwloadCsv(establishments:EstablishmentEntity[]){
        return await this.service.donwloadCsv(establishments);
    }

}

export default PublicUseCase;