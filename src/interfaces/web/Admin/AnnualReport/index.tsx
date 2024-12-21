import AnnualReportContainer from "../../../../components/Admin/AnnualReport/AnnualReportContainer"
import { AnualReportUseCase } from "../../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import api from "../../../../infrastructure/Api"
import { AnualReportApi } from "../../../../infrastructure/Api/AnualReport/AnualReportApi"
import { AnualReportService } from "../../../../infrastructure/Services/AnualReportService"

const AnnualReport = () =>{
    const useCase= new AnualReportUseCase( new AnualReportService( new AnualReportApi(api) ) )
    return (
     <AnnualReportContainer usecase={useCase} />

    )
}

export default AnnualReport