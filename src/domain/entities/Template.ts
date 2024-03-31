
import ColumnTemplate from "./ColumTemplate";

class Template {
    constructor(
        public id: number,
        public columns: ColumnTemplate[],
        public createdAt: string,
        public updatedAt: string,
        public deleted: boolean,
        public deletedAt: string | null,
        public ip: string | null,
        public name: string,
        public code: string,
        public description: string,
        public isActive: boolean,
        public verticalTemplate: boolean,
        public maxInserts: number,
        public userCreated: number | null,
        public userUpdated: number | null,
        public userDeleted: number | null
    ) { }

}

export default Template;