import AllSolicitiesMonitorContainer from "../../../../../components/Transparency/Solicity/All/AllSolicitiesContainer"
import SolicityUseCase from "../../../../../domain/useCases/SolicityUseCase/SolicityUseCase"
import api from "../../../../../infrastructure/Api"
import ReportsApi from "../../../../../infrastructure/Api/Reports"
import SolicityApi from "../../../../../infrastructure/Api/Solicity/SolicityApi"
import SolicityService from "../../../../../infrastructure/Services/SolicityService"



const AllMonitorSolicities = ()=>{
    return(
        <AllSolicitiesMonitorContainer
        reportApi={new ReportsApi(api)}
        useCase={new SolicityUseCase(new SolicityService(new SolicityApi(api)))} 
        />
    )
}
export default AllMonitorSolicities