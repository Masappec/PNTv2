import { AxiosError, AxiosInstance } from "axios";
import { NumeralDTO, NumeralDetailDTO } from "./interface";
import { TRANSPARENCY_PATH } from "..";


class NumeralApi {


    constructor(private readonly api: AxiosInstance) { }

    async getNumeralByEstablishment(id: number) {

        try {

            const response = await this.api.get<NumeralDTO[]>(TRANSPARENCY_PATH + "/numerals/", {
                params: {
                    establishtment_id: id
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {

                const message = error?.response?.data?.message || "Ocurrió un error al obtener los numerales"
                throw new Error(message);
            } else {
                throw new Error("Ocurrió un error al obtener los numerales");

            }
        }
    }


    async getNumeralById(id: number) {
        try {
            const response = await this.api.get<NumeralDetailDTO>(TRANSPARENCY_PATH + "/numerals/detail/", {
                params: {
                    numeral_id: id
                }
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error?.response?.data?.message || "Ocurrió un error al obtener el numeral"
                throw new Error(message);
            } else {
                throw new Error("Ocurrió un error al obtener el numeral");

            }
        }
    }
}

export default NumeralApi;