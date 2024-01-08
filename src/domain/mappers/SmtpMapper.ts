import { SmtpRequestDto, SmtpResponseDto } from "../../infrastructure/Api/Smtp/interface";
import SmtpEntity from "../entities/SmtpEntity";


class SmtpMapper {
    static mapToSmtpEntity(smtp: SmtpResponseDto[]): SmtpEntity {
        return {
            auth: {
                pass: smtp.find((smtp_) => smtp_.name === 'PASSWORD')?.value || '',
                user: smtp.find((smtp_) => smtp_.name === 'USER')?.value || '',
            },
            host: smtp.find((smtp_) => smtp_.name === 'HOST')?.value || '',
            port: Number(smtp.find((smtp_) => smtp_.name === 'PORT')?.value) || 0,
            secure: smtp.find((smtp_) => smtp_.name === 'USE_TLS')?.value === 'True' ? true : false,
        };
    }

    static mapToSmtp(smtpEntity: SmtpEntity): SmtpRequestDto[] {
        return [
            {
                name: 'HOST',
                value: smtpEntity.host,
            },
            {
                name: 'PORT',
                value: smtpEntity.port.toString(),
            },
            {
                name: 'USE_TLS',
                value: smtpEntity.secure === true ? 'True' : 'False',
            },
            {
                name: 'USERNAME',
                value: smtpEntity.auth.user,
            },
            {
                name: 'PASSWORD',
                value: smtpEntity.auth.pass,
            },
        ];
    }
}

export default SmtpMapper;