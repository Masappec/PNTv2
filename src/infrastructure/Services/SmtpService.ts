import SmtpEntity from "../../domain/entities/SmtpEntity";
import SmtpMapper from "../../domain/mappers/SmtpMapper";
import SmtpApi from "../Api/Smtp/SmtpApi";


class SmtpService{

    private smtpApi:SmtpApi;

    constructor(smtpApi:SmtpApi){
        this.smtpApi = smtpApi;
    }

    async getSmtp(){
        
        const response = await this.smtpApi.getSmtp();
        return SmtpMapper.mapToSmtpEntity(response);
        
    }

    async update(data:SmtpEntity){
        const response = await this.smtpApi.update(SmtpMapper.mapToSmtp(data));
        return SmtpMapper.mapToSmtpEntity(response);
    }
}

export default SmtpService;