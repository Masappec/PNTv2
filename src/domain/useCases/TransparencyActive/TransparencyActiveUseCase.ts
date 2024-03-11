import TransparencyActiveService from "../../../infrastructure/Services/TransparencyActiveService";
import TransparencyActive from "../../entities/TransparencyActive";



class TransparencyActiveUseCase {
    constructor(private readonly service: TransparencyActiveService) { }


    public async publish(data: TransparencyActive) {
        return this.service.createPublication(data);
    }


}

export default TransparencyActiveUseCase;