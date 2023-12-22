import RegisterContainer from "../../../../components/Auth/Register/RegisterContainer"
import RegisterUseCase from "../../../../domain/useCases/Authentication/RegisterUseCase";
import api from "../../../../infrastructure/Api"
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi";
import AuthService from "../../../../infrastructure/Services/AuthService";


const Register = () =>{
    const _api = api;
    const authApi = new AuthApi(_api);
    const authService = new AuthService(authApi);
    const usecase = new RegisterUseCase(authService);
    return (
        <RegisterContainer usecase={usecase} />
    )
}

export default Register