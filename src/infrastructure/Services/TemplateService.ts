import TemplateFileEntity from "../../domain/entities/TemplateFileEntity";
import TemplateFileMapper from "../../domain/mappers/TemplateFileMappe";
import TemplateFileApi from "../Api/TemplateFile/TemplateFileApi";


class TemplateService {

    private api: TemplateFileApi;
    constructor(api: TemplateFileApi) {
        this.api = api;
    }

    async validateFile(data: TemplateFileEntity) {

        const isValid = await this.api.validateFile(TemplateFileMapper.fromDomainToApiValidate(data));
        return TemplateFileMapper.fromApiValidateToDomain(TemplateFileMapper.fromDomainToApiValidate(data), isValid);
    }
}

export default TemplateService;