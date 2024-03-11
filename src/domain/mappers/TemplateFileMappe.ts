import { TemplateValidate } from "../../infrastructure/Api/TemplateFile/inteface";
import TemplateFileEntity from "../entities/TemplateFileEntity";


class TemplateFileMapper {

    static fromApiValidateToDomain(data: TemplateValidate, is_valid: boolean): TemplateFileEntity {

        return {
            id: data.template_id,
            file: data.file,
            name: data.file.name,
            isValid: is_valid
        }

    }


    static fromDomainToApiValidate(data: TemplateFileEntity): TemplateValidate {

        return {
            template_id: data.id,
            file: data.file as File
        }

    }
}

export default TemplateFileMapper;