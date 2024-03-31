import { ColumnTemplateDto } from "../../infrastructure/Api/TemplateFile/inteface";
import ColumnTemplate from "../entities/ColumTemplate";


export class ColumnMapper {
    static toDomain(column: ColumnTemplateDto): ColumnTemplate {
        return {
            code: column.code,
            format: column.format,
            id: column.id,
            name: column.name,
            regex: column.regex,
            type: column.type
        }
    }



    static toApi(column: ColumnTemplate): ColumnTemplateDto {
        return {
            code: column.code,
            format: column.format || '',
            id: column.id,
            name: column.name,
            regex: column.regex || '',
            type: column.type
        }
    }
}