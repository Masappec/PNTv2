import { AxiosInstance } from "axios";
import { TRANSPARENCY_PATH } from "..";
import { TransparencyCollabCreateDto, TransparencyCollabListDto } from "./interface";
import { MessageTranslation } from "../../../utils/data";


class TransparencyCollabApi {

    constructor(private readonly api: AxiosInstance) { }


    public async getTransparencyCollab(search?: string, page?: number) {
        try {
            const res = await this.api.get(TRANSPARENCY_PATH + '/transparency/colaborative/list',
                {
                    params: {
                        search: search,
                        page: page
                    }
                })

            return res.data;

        } catch (error: any) {

            const message = error?.response?.data?.message || 'Erro ao buscar transparencia colaborativa';
            throw new Error(message);

        }
    }

    async createTransparencyFocus(data: TransparencyCollabCreateDto) {

        try {
            const res = await this.api.post<MessageTranslation<TransparencyCollabListDto>>(TRANSPARENCY_PATH + "/transparency/colaborative/create", data);

            return res.data;
        } catch (error: any) {
            const e: string = error.response?.data?.message || "Error al crear publicación.";

            throw new Error(e);
        }

    }
}

export default TransparencyCollabApi;