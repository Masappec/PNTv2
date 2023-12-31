import FormFieldsMapper from "../../domain/mappers/FormFieldsMapper";
import ConfigurationApi from "../Api/Configuration/ConfigurationApi"


class ConfigurationService {

    api: ConfigurationApi;

    constructor(api: ConfigurationApi) {
        this.api = api;
    }

    async getFormFields(role: string, formType: string) {
        const response = await this.api.getFormFields(role, formType);
        return response.map((item: any) => FormFieldsMapper.fromApiToDomain(item));

    }
}

export default ConfigurationService;