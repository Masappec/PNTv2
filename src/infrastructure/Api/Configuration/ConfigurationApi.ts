import { AxiosInstance } from "axios";
import { ADMIN_PATH } from "..";
import { FormFieldsList } from "./interface";


class ConfigurationApi {

    private api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getFormFields(role: string, formType: string) {
        try {
            const response = await this.api.get<FormFieldsList[]>(ADMIN_PATH + '/public/form-fields/' + `?role=${role}&form_type=${formType}`);
            return response.data;
        } catch (error) {
            throw new Error("Error al obtener los campos del formulario")
        }
    }
}

export default ConfigurationApi;