import TemplateService from "../../../infrastructure/Services/TemplateService";
import { DELIMITER } from "../../../utils/constans";
import Template from "../../entities/Template";
import TemplateFileEntity from "../../entities/TemplateFileEntity";


class TemplateFileUseCase {

    constructor(
        private readonly service: TemplateService
    ) { }

    async validateFile(data: TemplateFileEntity) {
        return await this.service.validateFile(data)
    }

    async validateLocalFile(data: File, template: Template) {
        return new Promise<{
            columns: string[],
            rows: string[][],
            verticalTemplate: boolean,
            valid: boolean

        }>((resolve, reject) => {
            this.detectDelimiter(data, 1024, (delim, text) => {
                try {

                    let rows = text.split('\r\n');
                    let columns = rows[0].split(delim);

                    if (template.verticalTemplate) {
                        columns = rows.map(row => row.split(delim)[0]);
                        rows = rows.map(row => row.split(delim).slice(1).join(delim));

                    } else {
                        if (delim !== DELIMITER) {
                            throw new Error('El archivo no coincide con la plantilla, el delimitador debe ser: ' + DELIMITER);
                        }

                    }

                    columns = columns.filter(col => col.trim() !== '');


                    if (columns.length !== template.columns.length) {
                        throw new Error('El archivo no coincide con la plantilla, la cantidad de columnas no coincide');

                    }

                    columns.forEach(element => {
                        if (!template.columns.find(col => col.name.toLowerCase().trim() === element.toLowerCase().trim())) {
                            throw new Error('El archivo no coincide con la plantilla, las columnas no coinciden');
                        }
                    });
                    let rows_ = rows.slice(1);
                    rows_ = rows_.filter(row => row.trim() !== '');
                    if (!template.verticalTemplate) {
                        if (rows_.filter(row => row.trim() !== '').length === 0) {
                            throw new Error('El archivo no contiene datos, por favor verifique que el archivo no este vacio');
                        }
                        const datacell = rows_.map(row => row.split(delim));
                        if (datacell.some(row => row.some(cell => cell.trim() == ''))) {
                            throw new Error('El archivo no contiene datos, por favor verifique que el archivo no tenga celdas vacias');
                        }
                    }


                    const final_rows = rows_.map(row => {
                        const row_data = row.split(delim);
                        return row_data.filter(col => col.trim() !== '');
                    });

                    resolve({
                        columns,
                        rows: final_rows,
                        verticalTemplate: template.verticalTemplate,
                        valid: true
                    });

                } catch (error) {
                    reject(error);
                }
            });
        });

    }

    private detectDelimiter(file: File, sampleSize: number = 1024, callback: (delimiter: string, text: string) => void) {
        const reader = new FileReader();

        reader.onload = function (event: ProgressEvent<FileReader>) {
            const fileData = event.target?.result as string;
            const sample = fileData.slice(0, sampleSize);

            const delimiters = [',', ';', '\t'];

            const counts = delimiters.map(delimiter => ({
                delimiter,
                count: (sample.match(new RegExp(delimiter, 'g')) || []).length
            }));

            const sortedDelimiters = counts.sort((a, b) => b.count - a.count);

            callback(sortedDelimiters[0].delimiter || ",", sample);
        };

        reader.readAsText(file.slice(0, sampleSize), 'ISO-8859-1');
    }




}

export default TemplateFileUseCase;