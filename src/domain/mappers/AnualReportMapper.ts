import { AnualReportCreateDto } from "../../infrastructure/Api/AnualReport/interface";
import { AnualReportEntity } from "../entities/AnualReportEntity";


export class AnualReportMapper{

    static toDomain(data: AnualReportCreateDto): AnualReportEntity{
        return AnualReportEntity.build(data);
    }
    
    static toDto(data: AnualReportEntity): AnualReportCreateDto{
        return {
            ...data,
            information_classified: data.information_classified
        } as unknown as AnualReportCreateDto;
    }

}