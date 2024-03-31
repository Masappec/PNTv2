
import BaseEntity from "./BaseEntity";
import Template from "./Template";


class NumeralDetail extends BaseEntity {
    constructor(
        public id: number,
        public templates: Template[],
        public created_at: Date,
        public updated_at: Date,
        public deleted: boolean,
        public deleted_at: Date | null,
        public ip: string,
        public name: string,
        public description: string,
        public is_default: boolean,
        public user_created: string | null,
        public user_updated: string | null,
        public user_deleted: string | null,
        public parent: number
    ) {
        super(
            created_at,
            updated_at,
            deleted,
            deleted_at,
            ip,
            user_created,
            user_updated,
            user_deleted
        );
    }
}

export default NumeralDetail;