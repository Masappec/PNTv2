import AnnualReportContainer from "../../../../components/Admin/AnnualReport/AnnualReportContainer"
import { AnualReportUseCase } from "../../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import api from "../../../../infrastructure/Api"
import { AnualReportApi } from "../../../../infrastructure/Api/AnualReport/AnualReportApi"
import EstablishmentApi from "../../../../infrastructure/Api/Establishment/EstablishmentApi"
import { AnualReportService } from "../../../../infrastructure/Services/AnualReportService"
import EstablishmentService from "../../../../infrastructure/Services/EstablishmentService"

const AnnualReport = () =>{
    const useCase= new AnualReportUseCase( new AnualReportService( new AnualReportApi(api) ) )
    const establishmentApi = new EstablishmentApi(api);
    const establishmentService = new EstablishmentService(establishmentApi);
    const Establishmentusecase = new EstablishmentUseCase(establishmentService);
    return (
     <AnnualReportContainer usecase={useCase} 
            establishmentUsecase={Establishmentusecase}
     />

    )
}

export default AnnualReport