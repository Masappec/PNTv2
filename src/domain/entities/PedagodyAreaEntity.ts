

class PedagogyAreaEntity {
     frequencyAsked: {
        id?: number,
        question: string,
        answer: string
    }[];
    
     tutorialVideo: {
        id?: number,
        title: string,
        url: string
        description: string
    }[];

     normative:{
        id?: number,
        title: string,
        url: string
        description: string
    }[]

     id?: number;
    

    constructor(
        frequencyAsked: {
            id?: number,
            question: string,
            answer: string
        }[],
        tutorialVideo: {
            id?: number,
            title: string,
            url: string
            description: string
        }[],
        normative:{
            id?: number,
            title: string,
            url: string
            description: string
        }[],
        id: number
    ) {
        this.frequencyAsked = frequencyAsked;
        this.tutorialVideo = tutorialVideo;
        this.normative = normative;
        this.id = id;
    }

}

export default PedagogyAreaEntity;