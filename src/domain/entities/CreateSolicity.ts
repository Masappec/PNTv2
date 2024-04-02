


class CreateSolicity {
    constructor(
        public establishment_id: number,
        public description: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public identification: string,
        public address: string,
        public phone: string,
        public type_reception: string,
        public formatSolicity: string
    ) { }
}

export default CreateSolicity;