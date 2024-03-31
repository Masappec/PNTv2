import { NumeralDetailDTO } from "../../infrastructure/Api/Numeral/interface";
import NumeralDetail from "../entities/NumeralDetail";
import TemplateMapper from "./TemplateMapper";



class NumeralDetailMapper {
    static toDomain(numeralDetail: NumeralDetailDTO): NumeralDetail {
        return {
            id: numeralDetail.id,
            description: numeralDetail.description,
            name: numeralDetail.name,
            is_default: numeralDetail.is_default,
            parent: numeralDetail.parent || 0,
            created_at: new Date(numeralDetail.created_at || 0),
            updated_at: new Date(numeralDetail.updated_at || 0),
            deleted: numeralDetail.deleted || false,
            deleted_at: new Date(numeralDetail.deleted_at || 0),
            ip: numeralDetail.ip || '',
            user_created: numeralDetail.user_created || "",
            user_updated: numeralDetail.user_updated || "",
            user_deleted: numeralDetail.user_deleted || "",
            templates: numeralDetail.templates.map(template => TemplateMapper.toDomain(template)),
            createdAt: new Date(numeralDetail.created_at || 0),
            updatedAt: new Date(numeralDetail.updated_at || 0),
            deletedAt: new Date(numeralDetail.deleted_at || 0),
            userCreated: numeralDetail.user_created || "",
            userUpdated: numeralDetail.user_updated || "",
            userDeleted: numeralDetail.user_deleted || "",

        }
    }

    static toApi(numeralDetail: NumeralDetail): NumeralDetailDTO {
        return {
            id: numeralDetail.id,
            description: numeralDetail.description,
            is_default: numeralDetail.is_default,
            name: numeralDetail.name,
            parent: numeralDetail.parent,
            created_at: numeralDetail.createdAt?.toISOString(),
            updated_at: numeralDetail.updatedAt?.toISOString(),
            deleted: numeralDetail.deleted,
            deleted_at: numeralDetail.deletedAt?.toISOString(),
            templates: numeralDetail.templates.map(template => TemplateMapper.toApi(template)),
            ip: numeralDetail.ip,
            user_created: numeralDetail.userCreated?.toString(),
            user_deleted: numeralDetail.userDeleted?.toString(),
            user_updated: numeralDetail.userUpdated?.toString(),


        };
    }
}

export default NumeralDetailMapper;