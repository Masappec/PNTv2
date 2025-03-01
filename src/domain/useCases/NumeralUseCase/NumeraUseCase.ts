import EstablishmentService from "../../../infrastructure/Services/EstablishmentService";
import NumeralService from "../../../infrastructure/Services/NumeralService";



class NumeralUseCase {
    constructor(
        private readonly service: NumeralService,
        private readonly serviceEstablishment: EstablishmentService
    ) { }

    async getNumeralByEstablishment(id: number,year?:number,month?:number){
        return await this.service.getNumeralByEstablishment(id,year,month)
    }

    async getNumeralByUserInSession(year?:number,month?:number){
        const establisment = await this.serviceEstablishment.getByUserSession()
        return await this.service.getNumeralByEstablishment(establisment.id || 0,year,month)

    }


    async getNumeralById(id: number) {
        const numeral = await this.service.getNumeralById(id)
        return numeral
    }

    async getNumeralFocalizedOrCollab(type: string) {
        return await this.service.getFocalizedOrCollab(type)

    }

    async getNumeralsAllowed() {
        return await this.service.getNumeralsAllowed()
    }

    async updateNumeralState(id: number, establisment: number) {
        
        try {
            const response = await this.service.updateNumeralState(id, establisment || 0);
            //console.info(response);
            return response;
        } catch (error) {
            console.error("Error al actualizar el estado del numeral:", error);
            throw error;
        }
    }
}

export default NumeralUseCase;