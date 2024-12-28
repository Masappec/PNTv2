import { ColumnTemplateDto } from "../../infrastructure/Api/TemplateFile/inteface";
import SessionService from "../../infrastructure/Services/SessionService";
import ColumnTemplate from "../entities/ColumTemplate";



export class ColumnMapper {
  static establishmentName: string = SessionService.getEstablishmentData()?.name||"";
  static toDomain(column: ColumnTemplateDto): ColumnTemplate {
    return {
      code: column.code,
      format: column.format,
      id: column.id,
      name: column.name,
      regex: column.regex,
      type: column.type,
      value: column.value.replace("{INSTITUCION}", ColumnMapper.establishmentName),
    };
  }

  static toApi(column: ColumnTemplate): ColumnTemplateDto {
    return {
      code: column.code,
      format: column.format || "",
      id: column.id,
      name: column.name,
      regex: column.regex || "",
      type: column.type,
      value: column.value,
    };
  }
}