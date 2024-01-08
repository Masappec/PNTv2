import ForgotPasswordContainer from "../../../../components/Auth/ForgotPassword/ForgotPasswordContainer"
import PasswordResetUseCase from "../../../../domain/useCases/Authentication/PasswordResetUseCase";
import api from "../../../../infrastructure/Api";
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi";
import AuthService from "../../../../infrastructure/Services/AuthService";


const ForgotPassword = ()=>{
    const authapi = new AuthApi(api);
    const authService = new AuthService(authapi);
    const usecase = new PasswordResetUseCase(authService);
    return (
        <ForgotPasswordContainer usecase={usecase} key={""}/>
    )
}

export default ForgotPassword;