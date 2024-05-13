import LoginContainer from "../../../../components/Auth/Login/LoginContainer"
import LoginUseCase from "../../../../domain/useCases/Authentication/LoginUseCase";
import api from "../../../../infrastructure/Api";
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi";
import EstablishmentApi from "../../../../infrastructure/Api/Establishment/EstablishmentApi";
import AuthService from "../../../../infrastructure/Services/AuthService";
import EstablishmentService from "../../../../infrastructure/Services/EstablishmentService";


const Login = () => {
    const _api = api;
    const authApi = new AuthApi(_api);
    const authService = new AuthService(authApi);
    const loginUseCase = new LoginUseCase(authService, new EstablishmentService(
        new EstablishmentApi(_api)
    ));
    return (
        <LoginContainer useCase={loginUseCase} />
    )
}

export default Login