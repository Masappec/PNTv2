

export class DatePnt extends Date{
   

    // Método personalizado: Mes en el rango de 1 a 12
    getMonthOneBased() {
        let mes = this.getMonth() +1;
        
        return mes;
    }

    getMonthToUpload(){
        let mesApublicar = this.getMonthOneBased() -1 ;
        if(mesApublicar==0){
            return 1;
        }
        return mesApublicar;
    }

    getYear(){
        let mesApublicar = this.getMonthOneBased() - 1;
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