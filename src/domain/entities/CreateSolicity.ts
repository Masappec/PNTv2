


class CreateSolicity {
    constructor(

        public number_saip: string,
        public city: string,
        public text: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public race_identification: string,
        public gender: string,
        public address: string,
        public phone: string,
        public format_send: string,
        public format_receipt: string,
        public establishment: number,
        public date?: string,
    ) { }
}

export default CreateSolicity;