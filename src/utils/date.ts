

export class DatePnt extends Date{
   

    // Método personalizado: Mes en el rango de 1 a 12
    getMonthOneBased() {
        const mes = this.getMonth() +1;
        
        return mes;
    }

    getMonthToUpload(){
        const mesApublicar = this.getMonthOneBased() -1 ;
        
        if(mesApublicar==0){
            return 12;
        }
        return mesApublicar;
    }

    getYearToUpload(){
        const mesApublicar = this.getMonthOneBased() - 1;
        if (mesApublicar == 0) {
            return super.getFullYear()-1;
        }
        return super.getFullYear()
    }

    // Otro método personalizado
    getFormattedDate() {
        return `${this.getDate()}/${this.getMonthOneBased()}/${this.getFullYear()}`;
    }
}