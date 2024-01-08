import ActivateAccountContainer from "../../../../components/Auth/ActivateAccount/ActivateAccountContainer"
import RegisterUseCase from "../../../../domain/useCases/Authentication/RegisterUseCase";
import api from "../../../../infrastructure/Api"
import AuthApi from "../../../../infrastructure/Api/Auth/AuthApi"
import AuthService from "../../../../infrastructure/Services/AuthService";



const ActivateAccount = ()=>{

    const authApi = new AuthApi(api);
    const authService = new AuthService(authApi);
    const usecase = new RegisterUseCase(authService);

    return (
        <ActivateAccountContainer 
        usecase={usecase}
        key={"activate-account"}
        />
    )
}

export default ActivateAccount