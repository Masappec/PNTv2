import ConfigurationService from "../../../infrastructure/Services/ConfigurationService";


class ConfigurationUseCase {
    configurationRepository:ConfigurationService;
  constructor(configurationRepository:ConfigurationService) {
    this.configurationRepository = configurationRepository;
  }

  async execute(role:string, formType:string) {
    return await this.configurationRepository.getFormFields(role, formType);
  }

}

export default ConfigurationUseCase;