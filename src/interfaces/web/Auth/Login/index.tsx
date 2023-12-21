import LoginContainer from "../../../../components/Auth/Login/LoginContainer"
import LoginUseCase from "../../../../domain/useCases/Authentication/LoginUseCase";
import api from "../../../../infrastructure/Api";
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi";
import AuthService from "../../../../infrastructure/Services/AuthService";


const Login = () => {
    const _api = api;
    const authApi = new AuthApi(_api);
    const authService = new AuthService(authApi);
    const loginUseCase = new LoginUseCase(authService);
    return (
        <LoginContainer useCase={loginUseCase} />
    )
}

export default Login