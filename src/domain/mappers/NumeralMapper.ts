import { NumeralDTO } from "../../infrastructure/Api/Numeral/interface";
import NumeralEntity from "../entities/NumeralEntity";



class NumeralMapper {


    static fromApiToDomain(data:NumeralDTO):NumeralEntity{
        return {
            description: data.description,
            id: data.id,
            isDefault: data.is_default,
            name: data.name,
            parent:data.parent,
            templates: data.templates,
            createdAt: data.created_at? new Date(data.created_at): undefined,
            deleted: data.deleted,
            deletedAt:  data.deleted_at? new Date(data.deleted_at): undefined,
            ip: data.ip,
            updatedAt: data.updated_at? new Date(data.updated_at): undefined,
            userCreated: data.user_created?.toString(),
            userDeleted: data.user_deleted?.toString(),
            userUpdated: data.user_updated?.toString()
        }
    }

}

export default NumeralMapper;