import { GenerateAnualReportContainer } from "../../../../components/Admin/GenerateAnualReport/GenerateAnualReportContainer"
import { AnualReportUseCase } from "../../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import api from "../../../../infrastructure/Api"
import { AnualReportApi } from "../../../../infrastructure/Api/AnualReport/AnualReportApi"
import { AnualReportService } from "../../../../infrastructure/Services/AnualReportService"


export const GenerateAnualReport = () => {
    const useCase = new AnualReportUseCase(new AnualReportService(new AnualReportApi(api)))

    return (
        <GenerateAnualReportContainer usecase={useCase} />
    )




}