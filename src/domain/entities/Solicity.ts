

export class Solicity {


    id: number;
    text?: string;
    establishment: number = 0;
    is_active: boolean;
    status: string
    expiry_date: string | null
    have_extension: boolean;
    is_manual: boolean;

    constructor(id: number, text?: string, establishment: number = 0, status: string, expiry_date: string, have_extension: boolean, is_manual: boolean, is_active: boolean) {
        this.id = id
        this.text = text
        this.establishment = establishment
        this.is_active = is_active
        this.status = status
        this.expiry_date = expiry_date
        this.have_extension = have_extension
        this.is_manual = is_manual
    }
}