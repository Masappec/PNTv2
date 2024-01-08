import SmtpService from "../../../infrastructure/Services/SmtpService";
import SmtpEntity from "../../entities/SmtpEntity";


class SmtpUsecase{
    constructor(private readonly smtpRepository: SmtpService){}
    async getSmtp(){
        return await this.smtpRepository.getSmtp();
    }

    async update(data:SmtpEntity){
        return await this.smtpRepository.update(data);
    }
}

export default SmtpUsecase;