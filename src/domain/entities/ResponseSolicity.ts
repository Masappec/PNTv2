

class ResponseSolicity {

    constructor(
        public id_solicitud: number,
        public text: string,
        public files: number[],
        public attachment: number[],
        public category_id: number


    ) { }
}

export default ResponseSolicity;