import PublicationListContainer from "../../../../../components/Transparency/Publication/List/PublicationListContainer";
import PublicationUseCase from "../../../../../domain/useCases/PublicationUseCase/PublicationUseCase";
import TransparencyUseCase from "../../../../../domain/useCases/Transparency/TransparencyUseCase";
import api from "../../../../../infrastructure/Api";
import PublicationApi from "../../../../../infrastructure/Api/Publication/PublicationApi";
import TransparencyApi from "../../../../../infrastructure/Api/Transparency/TransparencyApi";
import PublicationService from "../../../../../infrastructure/Services/PublicationService";
import TransparencyService from "../../../../../infrastructure/Services/TransparencyService";


const PublicationList = () => {

    const _api = api;
    const transparencyApi = new TransparencyApi(_api);
    const transparencyService = new TransparencyService(transparencyApi);
    const usecase = new TransparencyUseCase(transparencyService);

    const publicationApi = new PublicationApi(_api);
    const publicationService = new PublicationService(publicationApi);
    const publicationUsecase = new PublicationUseCase(publicationService);

    return (
        <PublicationListContainer 
            usecase={usecase}
            publicationUsecase={publicationUsecase}
        />
    )

}

export default PublicationList