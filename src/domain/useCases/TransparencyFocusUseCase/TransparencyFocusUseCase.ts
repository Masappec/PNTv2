import TransparencyFocusService from "../../../infrastructure/Services/TransparencyFocusService";

 class TransparencyFocusUseCase{
    service;
    constructor(transparencyFocusService :  TransparencyFocusService){
        this.service = transparencyFocusService;

 }
async getTransparencyFocusList(search?:string, page?:number) {
    const response= await this.service.getTransparencyFocusList(search,page);
    return response;

}
 }

export default  TransparencyFocusUseCase;