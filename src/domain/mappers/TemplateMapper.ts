import { TemplateDetail } from "../../infrastructure/Api/TemplateFile/inteface";
import Template from "../entities/Template";
import { ColumnMapper } from "./ColumnMapper";



class TemplateMapper {

    static toDomain(raw: TemplateDetail): Template {
        return {
            id: raw.id,
            columns: raw.columns.map(column => ColumnMapper.toDomain(column)),
            createdAt: raw.created_at,
            updatedAt: raw.updated_at,
            deleted: raw.deleted,
            deletedAt: raw.deleted_at,
            ip: raw.ip,
            name: raw.name,
            code: raw.code,
            description: raw.description,
            isActive: raw.is_active,
            verticalTemplate: raw.vertical_template,
            maxInserts: raw.max_inserts,
            userCreated: raw.user_created,
            userUpdated: raw.user_updated,
            userDeleted: raw.user_deleted
        }
    }


    static toApi(template: Template): TemplateDetail {

        return {
            id: template.id,
            columns: template.columns.map(column => ColumnMapper.toApi(column)),
            created_at: template.createdAt,
            updated_at: template.updatedAt,
            deleted: template.deleted,
            deleted_at: template.deletedAt || '',
            ip: template.ip || '',
            name: template.name,
            code: template.code,
            description: template.description,
            is_active: template.isActive,
            vertical_template: template.verticalTemplate,
            max_inserts: template.maxInserts,
            user_created: template.userCreated || 0,
            user_updated: template.userUpdated || 0,
            user_deleted: template.userDeleted || 0
        }

    }

}

export default TemplateMapper;