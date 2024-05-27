import UserListContainer from "../../../../../components/Admin/Users/InSession/UserInSessionContainer";
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase";

import UserUseCase from "../../../../../domain/useCases/Users/UserUseCase";
import api from "../../../../../infrastructure/Api";
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi";
import UserApi from "../../../../../infrastructure/Api/User/UserApi";
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService";
import UserService from "../../../../../infrastructure/Services/UserService";


const UserInSessionList = () => {
    const _api = api;
    const userApi = new UserApi(_api);
    const userService = new UserService(userApi);
    const usecase = new UserUseCase(userService);


    const est = new EstablishmentUseCase(new EstablishmentService(new EstablishmentApi(_api)));
    return (


        <>
            <UserListContainer usecase={usecase}
                estUsecase={est}
            />
        </>
    )
}

export default UserInSessionList;