import { FormFieldsList } from "../../infrastructure/Api/Configuration/interface";
import FormFieldsEntity from "../entities/FormFieldsEntity";



class FormFieldsMapper {
    static fromApiToDomain(apiModel: FormFieldsList): FormFieldsEntity {

        return apiModel;
    }

}

export default FormFieldsMapper;