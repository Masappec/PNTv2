import AnnualReportContainer from "../../../../components/Admin/AnnualReport/AnnualReportContainer"
import { AnualReportUseCase } from "../../../../domain/useCases/AnualReportUseCase/AnualReportUseCase"
import EstablishmentUseCase from "../../../../domain/useCases/Establishment/EstablishmentUseCase"
import NumeralUseCase from "../../../../domain/useCases/NumeralUseCase/NumeraUseCase"
import api from "../../../../infrastructure/Api"
import { AnualReportApi } from "../../../../infrastructure/Api/AnualReport/AnualReportApi"
import { Pnt1Api } from "../../../../infrastructure/Api/AnualReport/Pnt1Api"
import EstablishmentApi from "../../../../infrastructure/Api/Establishment/EstablishmentApi"
import NumeralApi from "../../../../infrastructure/Api/Numeral/NumeralApi"
import { AnualReportService } from "../../../../infrastructure/Services/AnualReportService"
import EstablishmentService from "../../../../infrastructure/Services/EstablishmentService"
import NumeralService from "../../../../infrastructure/Services/NumeralService"

const AnnualReport = () => {
    const useCase = new AnualReportUseCase(new AnualReportService(new AnualReportApi(api)))
    const establishmentApi = new EstablishmentApi(api);
    const establishmentService = new EstablishmentService(establishmentApi);
    const Establishmentusecase = new EstablishmentUseCase(establishmentService);
    const numeralUsecase = new NumeralUseCase(new NumeralService(new NumeralApi(api)),
        new EstablishmentService(establishmentApi)
    );
    return (
        <AnnualReportContainer usecase={useCase}
            establishmentUsecase={Establishmentusecase}
            api={new Pnt1Api(api)}
            numeralSessionUsecase={numeralUsecase}
        />

    )
}

export default AnnualReport