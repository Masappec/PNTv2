import EstablishmentCreateContainer from "../../../../../components/Admin/Establishment/Create/EstablishmentCreateContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb"
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase"
import api from "../../../../../infrastructure/Api"
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi"
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService"



const EstablishmentCreate = () => {

    const api_establishment = new EstablishmentApi(api)
    const service = new EstablishmentService(api_establishment)
    const usecase = new EstablishmentUseCase(service)

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
                        path: '/admin/entities/create',
                    }
                ]}
            />
            
        <EstablishmentCreateContainer
        usecase={usecase}
        />
        </>
    )

}

export default EstablishmentCreate