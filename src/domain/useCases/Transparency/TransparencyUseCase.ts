import TransparencyService from "../../../infrastructure/Services/TransparencyService";



class TransparencyUseCase{
    constructor(private readonly transparencyRepository: TransparencyService) {}

    async getTransparencyActive(id_establishment?: number,page?:number) {
        const transparency = await this.transparencyRepository.getTransparencyActive(id_establishment,page);
        return transparency;
    }

    async getDetailTransparency(id: number) {
        const transparency = await this.transparencyRepository.getDetailTransparency(id);
        return transparency;
    }

    async getListTransparency(){
        const transparency = await this.transparencyRepository.getListTransparency();
        return transparency;
    }
}

export default TransparencyUseCase;