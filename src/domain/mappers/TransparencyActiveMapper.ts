import { TransparencyActivePublicResponse, TransparencyActivePublish, TransparencyActivePublishResponse } from "../../infrastructure/Api/TansparencyActive/interface";
import TransparencyActive from "../entities/TransparencyActive";




class TransparencyActiveMapper {

    static fromApiToDomain(apiModel: TransparencyActivePublishResponse): TransparencyActive {

        return {
            id: apiModel.id,
            files: apiModel.files,
            created_at: new Date(apiModel.created_at),
            updated_at: new Date(apiModel.updated_at),
            deleted: apiModel.deleted,
            deleted_at: new Date(apiModel.deleted_at),
            ip: apiModel.ip,
            slug: apiModel.slug,
            month: apiModel.month,
            year: apiModel.year,
            status: apiModel.status,
            published: apiModel.published,
            published_at: apiModel.published_at,
            max_date_to_publish: apiModel.max_date_to_publish,
            user_created: apiModel.user_created,
            user_updated: apiModel.user_updated,
            user_deleted: apiModel.user_deleted,
            establishment: apiModel.establishment,
            numeral: apiModel.numeral
        }
    }

    static fromDomainToApi(domainModel: TransparencyActive): TransparencyActivePublish {
        return {
            establishment_id: domainModel.establishment.id || 0,
            numeral_id: domainModel.numeral as number,
            files: domainModel.files.map(file => file.id)
        }

    }


    static fromApiPublicToDomain(apiModel: TransparencyActivePublicResponse): TransparencyActive {

        return {
            id: apiModel.id,
            files: apiModel.files,
            created_at: new Date(apiModel.created_at),
            updated_at: new Date(apiModel.updated_at),
            deleted: apiModel.deleted,
            deleted_at: new Date(apiModel.deleted_at),
            ip: apiModel.ip,
            slug: apiModel.slug,
            month: apiModel.month,
            year: apiModel.year,
            status: apiModel.status,
            published: apiModel.published,
            published_at: apiModel.published_at,
            max_date_to_publish: apiModel.max_date_to_publish,
            user_created: apiModel.user_created,
            user_updated: apiModel.user_updated,
            user_deleted: apiModel.user_deleted,
            establishment: apiModel.establishment,
            numeralPartial: apiModel.numeral,
            numeral: apiModel.numeral.id,

        }

    }

}

export default TransparencyActiveMapper;