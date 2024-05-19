import EstablishmentCreateContainer from "../../../../../components/Admin/Establishment/Create/EstablishmentCreateContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb"
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase"
import NumeralUseCase from "../../../../../domain/useCases/NumeralUseCase/NumeraUseCase"
import api from "../../../../../infrastructure/Api"
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi"
import NumeralApi from "../../../../../infrastructure/Api/Numeral/NumeralApi"
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService"
import NumeralService from "../../../../../infrastructure/Services/NumeralService"



const EstablishmentCreate = () => {

    const api_establishment = new EstablishmentApi(api)
    const service = new EstablishmentService(api_establishment)
    const usecase = new EstablishmentUseCase(service)


    const numeralUsecase = new NumeralUseCase(new NumeralService(new NumeralApi(api)), service)

    return (
        <>
            <Breadcrumb
                items={[
                    {
                        name: 'Instituciones',
                        path: '/admin/entities',
                    },
                    {
                        name: 'Crear',
                        path: '#',
                    }
                ]}
            />

            <EstablishmentCreateContainer
                usecase={usecase}
                numeralUsecase={numeralUsecase}
            />
        </>
    )

}

export default EstablishmentCreate