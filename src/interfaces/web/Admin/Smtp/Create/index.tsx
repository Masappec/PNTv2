import SmtpCreateContainer from "../../../../../components/Admin/Smtp/Create/SmtpCreateContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb"
import SmtpUsecase from "../../../../../domain/useCases/Smtp/SmtpUseCase"
import api from "../../../../../infrastructure/Api"
import SmtpApi from "../../../../../infrastructure/Api/Smtp/SmtpApi"
import SmtpService from "../../../../../infrastructure/Services/SmtpService"


const SmtpCreate = ()=>{

    const smtpApi = new SmtpApi(api);
    const smtpService = new SmtpService(smtpApi);
    const smtpUseCase = new SmtpUsecase(smtpService);
    return(
        <>
        <Breadcrumb
        items={[
            {
                name: 'Configuración SMTP',
                path: '/admin/smtp',
            }
        ]}
        />
        
        <SmtpCreateContainer
        usecase={smtpUseCase}
        />
        </>
    
    )
}
export default SmtpCreate