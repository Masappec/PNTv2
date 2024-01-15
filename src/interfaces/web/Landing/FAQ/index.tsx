import FAQContainer from "../../../../components/Landing/FAQ/FAQContainer";
import PedagogyAreaUseCase from "../../../../domain/useCases/PedagogyArea/PedagogyAreaUseCase";
import api from "../../../../infrastructure/Api";
import PedagogyAreaApi from "../../../../infrastructure/Api/PedagogyArea/PedagogyAreaApi";
import PedagogyAreaService from "../../../../infrastructure/Services/PedagogyAreaService";



const FAQ = () => {

    const _api = new PedagogyAreaApi(api);
    const service = new PedagogyAreaService(_api);
    const usecase = new PedagogyAreaUseCase(service);

    return (
        <FAQContainer
        usecase={usecase}
        />
    );
}


export default FAQ;