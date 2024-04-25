

export class PersonEntity {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public identification: string,
        public phone: string,
        public address: string,
        public city: string,
        public country: string,
        public province: string,
        public job: string,
        public gender: string,
        public age_range: string,
        public race: string,
        public disability: boolean,
        public accept_terms: boolean,
        public user: number
    ) { }
}