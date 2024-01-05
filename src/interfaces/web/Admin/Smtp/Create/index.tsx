import SmtpCreateContainer from "../../../../../components/Admin/Smtp/Create/SmtpCreateContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb"


const SmtpCreate = ()=>{
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
        
        <SmtpCreateContainer/>
        </>
    
    )
}
export default SmtpCreate