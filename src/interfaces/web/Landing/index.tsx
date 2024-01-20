import LayouClient from "../../../components/Common/Layout/Client";
import PublicUseCase from "../../../domain/useCases/Public/PublicUseCase";
import api from "../../../infrastructure/Api";
import PublicApi from "../../../infrastructure/Api/Public/PublicApi";
import PublicService from "../../../infrastructure/Services/PublicService";

const Landing = ()=>{

    const publicApi = new PublicApi(api);
    const publicService = new PublicService(publicApi);
    const usecase = new PublicUseCase(publicService);
    return (
        <LayouClient 
        usecase={usecase}
        />
    )
    
}

export default Landing;