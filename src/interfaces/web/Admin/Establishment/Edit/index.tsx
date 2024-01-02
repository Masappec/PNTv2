import EstablishmentEditContainer from "../../../../../components/Admin/Establishment/Edit/EstablishmentEditContainer"
import Breadcrumb from "../../../../../components/Common/Breadcrumb"
import EstablishmentUseCase from "../../../../../domain/useCases/Establishment/EstablishmentUseCase"
import api from "../../../../../infrastructure/Api"
import EstablishmentApi from "../../../../../infrastructure/Api/Establishment/EstablishmentApi"
import EstablishmentService from "../../../../../infrastructure/Services/EstablishmentService"


const EstablishmentEdit = () => {
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
            <EstablishmentEditContainer
                usecase={usecase}
            />

        </>
    )
}

export default EstablishmentEdit