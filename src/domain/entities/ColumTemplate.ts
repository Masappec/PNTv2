
class ColumnTemplate {
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public type: string,
        public format: string | null,
        public regex: string | null,
        public value:string
    ) { }
}

export default ColumnTemplate;