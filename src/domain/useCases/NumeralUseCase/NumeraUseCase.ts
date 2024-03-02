import EstablishmentService from "../../../infrastructure/Services/EstablishmentService";
import NumeralService from "../../../infrastructure/Services/NumeralService";



class NumeralUseCase{
    constructor(
        private readonly service:NumeralService,
        private readonly serviceEstablishment: EstablishmentService
    ){}

    async getNumeralByEstablishment(id:number){
        return await this.service.getNumeralByEstablishment(id)
    }

    async getNumeralByUserInSession(){
        const establisment = await this.serviceEstablishment.getByUserSession()
        return await this.service.getNumeralByEstablishment(establisment.id ||0)

    }
}

export default NumeralUseCase;