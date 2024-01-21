import PublicationListContainer from "../../../../../components/Transparency/Publication/List/PublicationListContainer";
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase";
import api from "../../../../../infrastructure/Api";
import TransparencyApi from "../../../../../infrastructure/Api/Transparency/TransparencyApi";
import TransparencyService from "../../../../../infrastructure/Services/TransparencyService";


    const PublicationList = () => {
       
            const _api = api;
            const transparencyApi = new TransparencyApi(_api);
            const transparencyService = new TransparencyService(transparencyApi);
            const usecase = new TransparencyUseCase(transparencyService);

    return (
        <PublicationListContainer usecase={usecase} />
    )

}

export default PublicationList