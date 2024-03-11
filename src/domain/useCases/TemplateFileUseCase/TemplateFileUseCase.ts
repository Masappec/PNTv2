import TemplateService from "../../../infrastructure/Services/TemplateService";
import TemplateFileEntity from "../../entities/TemplateFileEntity";


class TemplateFileUseCase {

    constructor(
        private readonly service: TemplateService
    ) { }

    async validateFile(data: TemplateFileEntity) {
        return await this.service.validateFile(data)
    }
}

export default TemplateFileUseCase;