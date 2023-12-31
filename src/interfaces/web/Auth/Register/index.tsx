import RegisterContainer from "../../../../components/Auth/Register/RegisterContainer"
import RegisterUseCase from "../../../../domain/useCases/Authentication/RegisterUseCase";
import ConfigurationUseCase from "../../../../domain/useCases/Configuration/ConfigurationUseCase";
import api from "../../../../infrastructure/Api"
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi";
import ConfigurationApi from "../../../../infrastructure/Api/Configuration/ConfigurationApi";
import AuthService from "../../../../infrastructure/Services/AuthService";
import ConfigurationService from "../../../../infrastructure/Services/ConfigurationService";


const Register = () =>{
    const _api = api;
    const authApi = new AuthApi(_api);
    const authService = new AuthService(authApi);
    const usecase = new RegisterUseCase(authService);

    const configurationApi = new ConfigurationApi(_api);
    const configService = new ConfigurationService(configurationApi);
    const configUseCase = new ConfigurationUseCase(configService);
    return (
        <RegisterContainer usecase={usecase} configUseCase={configUseCase} />
    )
}

export default Register