import LayouClient from "../../../components/Common/Layout/Client";
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import TransparencyUseCase from "../../../domain/useCases/Transparency/TransparencyUseCase";
import api from "../../../infrastructure/Api";
import PublicApi from "../../../infrastructure/Api/Public/PublicApi";
import TransparencyApi from "../../../infrastructure/Api/Transparency/TransparencyApi";
import PublicService from "../../../infrastructure/Services/PublicService";
import TransparencyService from "../../../infrastructure/Services/TransparencyService";

const Landing = ()=>{

    const publicApi = new PublicApi(api);
    const publicService = new PublicService(publicApi);
    const usecase = new PublicUseCase(publicService);

    const transparencyApi = new TransparencyApi(api);
    const transparencyService = new TransparencyService(transparencyApi);
    const usecaseTransparency = new TransparencyUseCase(transparencyService);
    return (
        <LayouClient 
        usecase={usecase}
        transparencyUseCase={usecaseTransparency}
        />
    )
    
}

export default Landing;