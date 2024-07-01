import { ColourOption } from "./interface"
import QRCode from 'qrcode-generator';
export const genders: ColourOption[] = [
    { value: 'Masculino', label: 'Masculino', color: "#00B8D9" },
    { value: 'Femenino', label: 'Femenino', color: "#00B8D9" },
    { value: 'LGBTIQ+', label: 'LGBTIQ+', color: "#00B8D9" },
    { value: 'Otro', label: 'Otro', color: "#00B8D9" },
]

export const race_indentification: ColourOption[] = [
    { value: 'Meztizo', label: 'Meztizo', color: '#00B8D9' },
    { value: 'Pueblo Montubio', label: 'Pueblo Montubio', color: '#00B8D9' },
    { value: 'Pueblo o Nacionalidad Indígena', label: 'Pueblo o Nacionalidad Indígena', color: '#00B8D9' },
    { value: 'Pueblo Afrodescendiente', label: 'Pueblo Afrodescendiente', color: '#00B8D9' },
]

export const formart_send: ColourOption[] = [
    { value: 'formato fisico: copia en papel', label: 'formato fisico: copia en papel', color: '#00B8D9' },
    { value: 'formato fisico: cd', label: 'formato fisico: cd', color: '#00B8D9' },
    { value: 'formato electronico: excel', label: 'formato electronico: excel', color: '#00B8D9' },
    { value: 'formato electronico: pdf', label: 'formato electronico: pdf', color: '#00B8D9' },
    { value: 'formato electronico: word', label: 'formato electronico: word', color: '#00B8D9' },
    { value: 'formato electronico: csv', label: 'formato electronico: csv', color: '#00B8D9' },

]

export const format_receipt: ColourOption[] = [
    { value: 'formulario web', label: 'formulario web', color: '#00B8D9' },
]


export const generarQR = (qrText:string) => {
    
        // Creamos un objeto QRCode
        const qr = QRCode(0, 'L');
        qr.addData(qrText);
        qr.make();

        // Obtenemos la URL del QR generado
        const qrUrl = qr.createDataURL();

        // Actualizamos el estado con la URL del QR
        return qrUrl;    
};
