import { AxiosInstance } from "axios";
import { TRANSPARENCY_PATH } from "..";
import { TemplateValidate } from "./inteface";


class TemplateFileApi {
    private api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async validateFile(data: TemplateValidate) {

        try {
            const form = new FormData();
            for (const key in data) {
                form.append(key, data[key as keyof TemplateValidate] as string | Blob);
            }
            await this.api.post(TRANSPARENCY_PATH + '/template_file/validate', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return true;
        } catch (e) {

            return false;
        }
    }
}

export default TemplateFileApi;