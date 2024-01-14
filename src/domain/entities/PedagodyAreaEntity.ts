
import BaseEntity from "./BaseEntity";

export class FrequencyAsked extends BaseEntity {

    question: string;
    answer: string;
    isActive: boolean;

    constructor(
        question: string,
        answer: string,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
        deleted: boolean,
        deletedAt: Date,
        ip: string,
        userCreated: string,
        userUpdated: string,
        userDeleted: string,
    ) {
        super(createdAt, updatedAt, deleted, deletedAt, ip, userCreated, userUpdated, userDeleted);
        this.question = question;
        this.answer = answer;
        this.isActive = isActive;
    }
}


export class Tutorial extends BaseEntity {

    title: string;
    description: string;
    isActive: boolean;
    url: string;

    constructor(
        title: string,
        description: string,
        isActive: boolean,
        url: string,
        createdAt: Date,
        updatedAt: Date,
        deleted: boolean,
        deletedAt: Date,
        ip: string,
        userCreated: string,
        userUpdated: string,
        userDeleted: string,
    ) {
        super(createdAt, updatedAt, deleted, deletedAt, ip, userCreated, userUpdated, userDeleted);
        this.title = title;
        this.description = description;
        this.isActive = isActive;
        this.url = url;
    }
}


export class Normative extends BaseEntity {

    title: string;
    description: string;
    isActive: boolean;
    url: string;

    constructor(
        title: string,
        description: string,
        isActive: boolean,
        url: string,
        createdAt: Date,
        updatedAt: Date,
        deleted: boolean,
        deletedAt: Date,
        ip: string,
        userCreated: string,
        userUpdated: string,
        userDeleted: string,
    ) {
        super(createdAt, updatedAt, deleted, deletedAt, ip, userCreated, userUpdated, userDeleted);
        this.title = title;
        this.description = description;
        this.isActive = isActive;
        this.url = url;
    }
}



class PedagogyAreaEntity {
    faq: FrequencyAsked[];
    tutorials: Tutorial[];
    normatives: Normative[];

    constructor(
        faq: FrequencyAsked[],
        tutorials: Tutorial[],
        normatives: Normative[]
    ) {
        this.faq = faq;
        this.tutorials = tutorials;
        this.normatives = normatives;
    }
}

export default PedagogyAreaEntity;