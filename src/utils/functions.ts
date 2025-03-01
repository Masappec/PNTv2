
import slug from 'slugify';




export function isWithinDeadline(date:string) {
        const datePublished = new Date(date);
        const day = datePublished.getDate();
        const month = datePublished.getMonth();
        const year = datePublished.getFullYear();

        // Obtener el último día del mes
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

        // Si la fecha es hasta el día 15 o el siguiente día hábil si cae en fin de semana
        if (day <= 15 || isNextWorkingDay(datePublished)) {
                return false
        }

        // Si es entre el 16 y el último día del mes, se considera atrasado
        if (day >= 16 && day <= lastDayOfMonth) {
                return true
        }

        return false
}

// Función para verificar si es el siguiente día hábil
function isNextWorkingDay(date:Date) {
        const dayOfWeek = date.getDay();

        // Verificar si es fin de semana
        if (dayOfWeek === 0) {
                // Si es domingo, el siguiente día hábil es lunes
                return date.getDate() === 16;
        }
        if (dayOfWeek === 6) {
                // Si es sábado, el siguiente día hábil es lunes (17 si cae sábado el 15)
                return date.getDate() === 17;
        }

        // Si no es fin de semana, es el día hábil
        return false;
}


export function slugtext(text: string) {
        return slug(text, {
                replacement: '-',
                remove: /[*+~.()'"!:@]/g,
                lower: true
        })

}
export const formatDate2 = (dateString: string) => {
        const date = new Date(dateString);

        // Options for formatting the date
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);

        // Extract hours and minutes
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Format time as HHhMM
        const formattedTime = `${hours}h${minutes}`;

        return `${formattedDate} - ${formattedTime}`;
};
export const elapsedTime = (dateString: string) => {
        if (!dateString) return "";

        const now = new Date();
        const pastDate = new Date(dateString);

        // Calculate the difference in milliseconds
        const diffInMs = now.getTime() - pastDate.getTime();

        // Convert milliseconds to total days and remaining hours
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${diffInDays} Días / ${remainingHours} Horas transcurridas`;
};
export function url_build(name: string) {
        let name_ = name.replace(/ /g, "-")
        name_ = name_.toLowerCase()
        name_ = name_.replace(/,/g, "")
        name_ = name_.replace(/\./g, "")
        name_ = name_.replace(/ñ/g, "n")
        name_ = name_.replace(/á/g, "a")
        name_ = name_.replace(/é/g, "e")
        name_ = name_.replace(/í/g, "i")
        name_ = name_.replace(/ó/g, "o")
        name_ = name_.replace(/ú/g, "u")
        name_ = name_.replace(/Á/g, "A")
        name_ = name_.replace(/É/g, "E")
        name_ = name_.replace(/Í/g, "I")
        name_ = name_.replace(/Ó/g, "O")
        name_ = name_.replace(/Ú/g, "U")
        name_ = name_.replace(/:/g, "")
        name_ = name_.replace(/;/g, "")
        name_ = name_.replace(/¿/g, "")
        name_ = name_.replace(/\?/g, "")
        name_ = name_.replace(/¡/g, "")
        name_ = name_.replace(/!/g, "")
        name_ = name_.replace(/"/g, "")
        name_ = name_.replace(/'/g, "")
        name_ = name_.replace(/«/g, "")
        name_ = name_.replace(/»/g, "")
        name_ = name_.replace(/“/g, "")
        name_ = name_.replace(/”/g, "")
        name_ = name_.replace(/‘/g, "")
        name_ = name_.replace(/’/g, "")
        name_ = name_.replace(/`/g, "")
        name_ = name_.replace(/´/g, "")
        name_ = name_.replace(/¨/g, "")
        name_ = name_.replace(/~/g, "")
        name_ = name_.replace(/=/g, "")
        name_ = name_.replace(/\+/g, "")
        name_ = name_.replace(/-/g, "")
        name_ = name_.replace(/_/g, "")
        name_ = name_.replace(/@/g, "")
        name_ = name_.replace(/#/g, "")
        name_ = name_.replace(/\$/g, "")
        name_ = name_.replace(/%/g, "")
        name_ = name_.replace(/&/g, "")
        name_ = name_.replace(/\//g, "")

        return name_
}


export const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function utf8_to_b64(str: string) {
        return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64_to_utf8(str: string) {
        return decodeURIComponent(escape(window.atob(str)));
}


export function formatDate(dateString: string) {
        const date = new Date(dateString);

        const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
        };

        const formattedDate = new Intl.DateTimeFormat('es-ES', options as Intl.DateTimeFormatOptions).format(date);

        return formattedDate;
}

export function verificarCedula(cedula: string): boolean {
        if (cedula.length !== 10) {
                throw new Error("Error numero de cedula incompleto");
        } else {
                const multiplicador = [2, 1, 2, 1, 2, 1, 2, 1, 2];
                const cedArray = cedula.slice(0, 9).split('').map(k => parseInt(k, 10));
                const ultimoDigito = parseInt(cedula[9], 10);
                const resultado: number[] = [];

                cedArray.forEach((num, index) => {
                        const product = num * multiplicador[index];
                        if (product < 10) {
                                resultado.push(product);
                        } else {
                                resultado.push(product - 9);
                        }
                });

                const suma = resultado.reduce((acc, curr) => acc + curr, 0);
                const verificador = Math.ceil(suma / 10) * 10 - suma;

                return ultimoDigito === verificador;
        }
}

export const placeHolderImage = () => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3WmP5NTZBuAiCSHAEIZAAsMWYAgB8f//BV+zsAxhGbYA2YEsLK/ueuWOc3CXXd13EUJfltBIdNVT9uVH8q1z7OM7Xnrppa92NgIECBAgQIAAgZrAHQJWzVIhAgQIECBAgMBeQMDSCAQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9AABAgQIECBAoCwgYJVBlSNAgAABAgQICFh6gAABAgQIECBQFhCwyqDKESBAgAABAgQELD1AgAABAgQIECgLCFhlUOUIECBAgAABAgKWHiBAgAABAgQIlAUErDKocgQIECBAgAABAUsPECBAgAABAgTKAgJWGVQ5AgQIECBAgICApQcIECBAgAABAmUBAasMqhwBAgQIECBAQMDSAwQIECBAgACBsoCAVQZVjgABAgQIECAgYOkBAgQIECBAgEBZQMAqgypHgAABAgQIEBCw9ACBb0jgRz/60e7hhx/e/fjHP97deeeduzvuuGP/y1999dXu888/3/3tb3/bffjhh7u//vWvR+3Rgw8+uHvooYd2d9999+773//+2Xe/+OKL3SeffLKv+ac//emomvnwvffeu/vZz362u++++3Y/+MEPzvb3yy+/3P3jH//Y/eEPf9jXzu9cpS0uTz/99O6uu+7aH3bO1yuvvHIUQfog5y01vve97531QSxT7yJ9kCKn6oWjDs6HCRDYCwhYGoHANyDwxBNP7C9+8wC09LMJLwkut2/fXg0uP/zhD3dPPvnkPrBNYW2pZgLcX/7yl91bb721++c//7npaB999NF9uFrb3wSt7OtFAtymHfkWfugXv/jF3nzajglYCWfphfx7aDumD1LnlL3wLTwFdonA/4SAgPU/cZrs5P+qQALKz3/+893169cPhqD58SUQJWS98cYb5x52RsNS99q1a5tpMkL25ptv7v7+978f/E5CW8LgNLKy9gP/+te/9iEr+/xd3xI8M/o0t9kasDISGNucuy1b+iDBNefs0CjhKXthy376DAECywICls4gcEKBhKCElfkI02effbafAkogSQD7yU9+sp/im6acsjsZwfjggw9277777uLePfXUU/vvTXXz+T//+c9nU0v333//vmb+nU9FrgW3n/70p7vHHnvsP0auPv30093vf//7/cU+U5upm2PKtOG05Zhef/311fB2QuqTl45lAlJGi+bbloCV8/zMM8/8x8hXQlPOx8cff7yfys35jH9Gt+bnNfbvvPPOucd3ql44OagfIPAdFxCwvuMn2OH99wRywcx00BREEoJyMc1U3bgtXYATbHJvzzh6kYDz+OOPn4Wg/D0X4IS2cXvkkUd2+W+a6su9Xm+//fbiaFNGQhICci9XtkMjaeNoTD770UcfLR7bf+8M9H556fxM1bcErIx85TxMwSlTtemDhOJxG0cQMw37u9/9bh/Cxu1UvdCTU4nA1RUQsK7uuXfkJxZ49tln9yNIa2Fl2o2MXCTgTCMkCU4JQwll822suxZscsHOhXi6uOei/tprry2GsRs3bpxNf50X8KYvjgHyUBA4MfXJy2dUL1ODS/e6rQWshLPnnntud8899+z3M0H7vffe273//vvn7vfWc7z1c9MPbe2Fk4P6AQJXQEDAugIn2SF+8wIJVpkezJRatoSPhJq1+58SsB544IH9RXiaJpxfiDNylCfYprq5/ymjG4eePByDW0ZPMp03jogkBKT+FAjzu+dNUU6i8wv8luDwzZ+Jy/9i7p/LuZxGIhM8M507jQquBaxMp2Ykc/p8plNffvnlg/dVJbwmDE3fWQq7p+yFy6upQICAgKUHCJxAIFN4eQpvGvHI9N3S1OCxP51ppvko09rFfap/8+bN/Y32542gjCFsS3BLrXF/cp/WrVu3jj2sb+3nE3ASIqeHCRKUc09Upvy2BqwEpdxbNW0ZccyN62vbCy+8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"