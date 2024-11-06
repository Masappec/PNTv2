

export class DatePnt extends Date{
   

    // Método personalizado: Mes en el rango de 1 a 12
    getMonthOneBased() {
        let mes = this.getMonth() +1;
        
        return mes;
    }

    getMonthToUpload(){
        return this.getMonthOneBased() -1 ;
    }

    // Otro método personalizado
    getFormattedDate() {
        return `${this.getDate()}/${this.getMonthOneBased()}/${this.getFullYear()}`;
    }
}