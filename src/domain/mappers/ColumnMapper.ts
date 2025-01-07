import { ColumnTemplateDto } from "../../infrastructure/Api/TemplateFile/inteface";
import SessionService from "../../infrastructure/Services/SessionService";
import ColumnTemplate from "../entities/ColumTemplate";


export class ColumnMapper {

  static toDomain(column: ColumnTemplateDto): ColumnTemplate {
    const establishmentName = SessionService.getEstablishmentData()?.name||"";
    return {
      code: column.code,
      format: column.format,
      id: column.id,
      name: column.name,
      regex: column.regex,
      type: column.type,
      value: column.value.replace("{INSTITUCION}", establishmentName),
    };
  }



    static toApi(column: ColumnTemplate): ColumnTemplateDto {
        return {
            code: column.code,
            format: column.format || '',
            id: column.id,
            name: column.name,
            regex: column.regex || '',
            type: column.type,
            value:column.value
        }
    }
}