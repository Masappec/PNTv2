import NormativeContainer from "../../../../components/Landing/Normative/NormativeContainer"
import PedagogyAreaUseCase from "../../../../domain/useCases/PedagogyArea/PedagogyAreaUseCase";
import api from "../../../../infrastructure/Api";
import PedagogyAreaApi from "../../../../infrastructure/Api/PedagogyArea/PedagogyAreaApi";
import PedagogyAreaService from "../../../../infrastructure/Services/PedagogyAreaService";





const Normative = () => {

    const api_ = new PedagogyAreaApi(api);
    const service = new PedagogyAreaService(api_);
    const usecase = new PedagogyAreaUseCase(service);
    return (
        <NormativeContainer
        usecase={usecase}
        />
    )
}

export default Normative;