

class ResponseSolicity {

    constructor(
        public id_solicitud: number,
        public text: string,
        public files: number[],
        public attachment: number[],
        public category: string

    ) { }
}

export default ResponseSolicity;