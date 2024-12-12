import autoTable from "jspdf-autotable";
import EstablishmentMapper from "../../domain/mappers/EstablishmentMapper";
import PedagogyAreaMapper from "../../domain/mappers/PedagogyAreaMapper";
import { EstablishmentListDto } from "../Api/Establishment/interface";
import PublicApi from "../Api/Public/PublicApi";
import jsPDF from "jspdf";
import EstablishmentEntity from "../../domain/entities/Establishment";
import { Transform } from "../../utils/transform";
import { DELIMITER } from "../../utils/constans";


class PublicService {

    private api: PublicApi;


    constructor(api: PublicApi) {
        this.api = api;
    }


    async getEstablishments(search?: string, page?: number) {

        const response = await this.api.getEstablishments(search, page);
        return {
            results: response.results.map((establishment) => {
                return {
                    data: establishment.data.map((data) => {
                        return EstablishmentMapper.apiToDomain(data as EstablishmentListDto)
                    }),
                    letter: establishment.letter
                }
            }),
            total: response.total,
        }

    }

    async getPedagogyArea() {
        const response = await this.api.getPedagogyArea();
        return PedagogyAreaMapper.fromApiToDomain(response);
    }

    async getEstablishment(slug: string) {
        const response = await this.api.getEstablishment(slug);
        return EstablishmentMapper.apiToDomain(response as EstablishmentListDto);
    }

    async getMonthsByTransparency(type: 'A' | 'F' | 'C', establishment_id: number, year: number) {
        return await this.api.getMonthsByTransparency(type, establishment_id, year);
    }


    async downloadPdf(establishments: EstablishmentEntity[]) {

        const doc = new jsPDF('landscape');
        const data = establishments.map((establishment) => {
            return [
                establishment.name,
                (establishment.function_organization==null?'':establishment.function_organization),
                establishment.identification
            ]
        });
        autoTable(doc, {
            head:[[
                'Nombre',
                'Tipo de Institución',
                'RUC'
            ]],
            body: data as string[][],
        });

        doc.save('instituciones.pdf');
            

    }


    async donwloadExcel(establishment_id: EstablishmentEntity[]){
        const csv = establishment_id.map((establishment) => {
            return establishment.name + DELIMITER + (establishment.function_organization==null?'':establishment.function_organization) + DELIMITER + establishment.identification + '\n';
        }).join('');

        const final = 'Nombre' + DELIMITER + 'Tipo de Institución' + DELIMITER + 'RUC' + '\n' + csv;
        Transform.fromCsvToXlxs(final, 'instituciones');
    }


    async donwloadCsv(establishment_id: EstablishmentEntity[]){
        const csv = establishment_id.map((establishment) => {
            return establishment.name + DELIMITER + (establishment.function_organization==null?'':establishment.function_organization)  + DELIMITER + establishment.identification + '\n';
        }).join('');

        
        const blob_ = '\uFEFF' + 'Nombre' + DELIMITER + 'Tipo de Institución' + DELIMITER + 'RUC' + '\n' + csv;

        const a = document.createElement('a')
        a.download =  "instituciones.csv";
        a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(blob_);
        a.click();



    }
}

export default PublicService;