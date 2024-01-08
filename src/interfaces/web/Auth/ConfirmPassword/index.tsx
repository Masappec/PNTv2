import ConfirmPasswordContainer from "../../../../components/Auth/ConfirmPassword/ConfirmPasswordContainer"
import PasswordResetUseCase from "../../../../domain/useCases/Authentication/PasswordResetUseCase";
import api from "../../../../infrastructure/Api";
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi";
import AuthService from "../../../../infrastructure/Services/AuthService";


const ConfirmPassword = () => {

    const authapi = new AuthApi(api);
    const authService = new AuthService(authapi);
    const usecase = new PasswordResetUseCase(authService);
    return (
        <ConfirmPasswordContainer usecase={usecase}/>
    )
}

export default ConfirmPassword;