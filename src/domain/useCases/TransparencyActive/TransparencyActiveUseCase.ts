import TransparencyActiveService from "../../../infrastructure/Services/TransparencyActiveService";
import TransparencyActive from "../../entities/TransparencyActive";



class TransparencyActiveUseCase {
    constructor(private readonly service: TransparencyActiveService) { }


    public async publish(data: TransparencyActive) {
        return this.service.createPublication(data);
    }


    public async getPublicationsPublics(month: number, year: number, establishment_id: number) {
        return this.service.getPublicationsPublics(month, year, establishment_id);
    }

}

export default TransparencyActiveUseCase;