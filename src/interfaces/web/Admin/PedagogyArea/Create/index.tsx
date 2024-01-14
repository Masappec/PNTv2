import PedagogyAreaCreateContainer from "../../../../../components/Admin/PedagogyArea/Create/PedagogyAreaCreateContainer"
import PedagogyAreaUseCase from "../../../../../domain/useCases/PedagogyArea/PedagogyAreaUseCase";
import api from "../../../../../infrastructure/Api";
import PedagogyAreaApi from "../../../../../infrastructure/Api/PedagogyArea/PedagogyAreaApi";
import PedagogyAreaService from "../../../../../infrastructure/Services/PedagogyAreaService";



const PedagodyAreaCreate = () => {


    const repository = new PedagogyAreaApi(api);
    const service = new PedagogyAreaService(repository);
    const usecase = new PedagogyAreaUseCase(service);

    return (
        <PedagogyAreaCreateContainer
        usecase={usecase}
        />
    )
}

export default PedagodyAreaCreate;