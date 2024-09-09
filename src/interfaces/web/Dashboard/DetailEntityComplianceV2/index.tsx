import DetailEntityContainer from '../../../../components/Dashboards/DetailEntityComplianceV2/DetailEntityContainer'
import NumeralApi from '../../../../infrastructure/Api/Numeral/NumeralApi';
import api from '../../../../infrastructure/Api';
import NumeralService from '../../../../infrastructure/Services/NumeralService';
import NumeralUseCase from '../../../../domain/useCases/NumeralUseCase/NumeraUseCase';
import EstablishmentService from '../../../../infrastructure/Services/EstablishmentService';
import EstablishmentApi from '../../../../infrastructure/Api/Establishment/EstablishmentApi';
import TransparencyFocusUseCase from '../../../../domain/useCases/TransparencyFocusUseCase/TransparencyFocusUseCase';
import TransparencyFocusService from '../../../../infrastructure/Services/TransparencyFocusService';
import TransparencyFocusApi from '../../../../infrastructure/Api/TransparencyFocus/TransparencyFocusApi';
import TransparencyCollabUseCase from '../../../../domain/useCases/TransparencyCollabUseCase/TransparencyCollabUseCase';
import TransparencyCollabService from '../../../../infrastructure/Services/TransparencyCollabService';
import TransparencyCollabApi from '../../../../infrastructure/Api/TransparencyCollab/TransparencyCollab';

const DetailEntity = () => {

  const numeralApi = new NumeralApi(api);
  const numeralService = new NumeralService(numeralApi);
  const numeralUseCase = new NumeralUseCase(numeralService, new EstablishmentService(new EstablishmentApi(api)))

  const tfocalized = new TransparencyFocusUseCase(
    new TransparencyFocusService(
      new TransparencyFocusApi(api)
    )
  )
  const tcollab = new TransparencyCollabUseCase(
    new TransparencyCollabService(
      new TransparencyCollabApi(api)
    )
  )
  return (
    <DetailEntityContainer
      usecase={numeralUseCase}
      tcusecase={tcollab}
      tfusecase={tfocalized}
    />

  )

}

export default DetailEntity