import TemplateService from "../../../infrastructure/Services/TemplateService";
import { DELIMITER } from "../../../utils/constans";
import Template from "../../entities/Template";
import TemplateFileEntity from "../../entities/TemplateFileEntity";
import csvtojson from 'csvtojson';


class TemplateFileUseCase {

    constructor(
        private readonly service: TemplateService
    ) { }

    async validateFile(data: TemplateFileEntity) {
        return await this.service.validateFile(data)
    }
    normalizeString(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/:/g, "")
            .replace(/-/g, "")
            .replace(/,/g, "")
            .replace(/\./g, "")
            .replace(/ /g, "")
            .replace(/_/g, "")
            .replace(/#/g, "")
            .replace(/%/g, "")
            .replace(/&/g, "")
            .replace(/"/g, "")
            .replace(/'/g, "")
            .replace(/!/g, "")
            .replace(/¡/g, "")
            .replace(/¿/g, "")
            .replace(/-/g, "")
            .replace(/\(\)/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
            .toLowerCase().trim();
    }

    cleanCSV(csvContent: string) {
        // Split the content into lines
        const lines = csvContent.trim().split('\n');
        // Clean each line
        const cleanedLines = lines.map(line => {
            // Remove leading semicolon and space
            line = line.replace(/^;\s*/, '');

            // Remove trailing semicolons
            line = line.replace(/;+\s*$/, '');

            // Remove consecutive semicolons within the line
            line = line.replace(/;{2,}/g, ';');

            //remplazar \r
            line = line.replace(/\r/g, '');



            return line;
        });

        // Join cleaned lines into a single string with line breaks
        return cleanedLines.join('\r\n');
    }

    async validateLocalFile(data: File, template: Template, isActive = false, isTransposed = false) {
        return new Promise<{
            columns: string[],
            rows: string[][],
            verticalTemplate: boolean,
            valid: boolean

        }>((resolve, reject) => {
            this.detectDelimiter(data, async (delim, text) => {
                try {

                    let cleanedCSV = this.cleanCSV(text);
                    if (template.verticalTemplate && isTransposed) {
                        // Dividir el CSV en líneas
                        const lines = cleanedCSV.split('\n');

                        // Dividir cada línea en columnas (en base a ';' como separador)
                        const rows = lines.map(line => line.split(';'));

                        // Verificar si el CSV ya está transpuesto
                        const isTransposed = rows.every(row => row.length === rows.length);

                        if (!isTransposed) {
                            // Si no está transpuesto, realizar la transposición
                            const transposed = rows[0].map((_, colIndex) => rows.map(row => row[colIndex]));

                            // Unir la matriz transpuesta de nuevo en formato CSV
                            const cleanedCSV_ = transposed.map(row => row.join(';')).join('\n');

                            cleanedCSV = cleanedCSV_;
                        }
                    }
                    const json = await csvtojson({
                        delimiter: DELIMITER,
                        noheader: template.verticalTemplate,
                        flatKeys: true,
                        headers: template.columns.map(col => col.name)
                    }).fromString(cleanedCSV)
                    console.log(cleanedCSV, json)
                    let rows = json.map(row => Object.values(row).join(delim));
                    let columns = json.length > 0 ? Object.keys(json[0]) : [];
                    if (template.verticalTemplate) {
                        rows = json.length > 0 ? json.map(row => Object.values(row))[1] as string[] : [];
                    } else {
                        if (delim !== DELIMITER) {
                            throw new Error('El archivo no coincide con la plantilla, el delimitador debe ser: ' + DELIMITER);
                        }
                    }

                    columns = columns.filter(col => col.trim() !== '');
                    console.log(rows)
                    if (columns.length !== template.columns.length) {
                        throw new Error('El archivo no coincide con la plantilla, la cantidad de columnas no coincide');

                    }
                    columns.forEach(element => {
                        if (!template.columns.find(col => this.normalizeString(col.name) === this.normalizeString(element))) {
                            throw new Error('El archivo no coincide con la plantilla, las columnas no coinciden, Columna de nombre: "' + element + '" no encontrada en la plantilla');
                        }
                    });
                    const rows_ = rows;


                    if (rows_.filter(row => row == undefined).length > 0) {
                        throw new Error('El archivo no contiene datos, por favor verifique que el archivo no este vacio');
                    }
                    if (rows_.filter(row => row.trim() == '').length > 0) {
                        throw new Error('El archivo no contiene datos, por favor verifique que el archivo no este vacio');

                    }

                    // validar que su contenido no contenga las palabras “NO APLICA”, “NO DISPONIBLE”, “N/D”, “ND”, “NA”, “N/A”. 
                    const invalidWords = ["NO APLICA", "NO DISPONIBLE", "N/D", "ND", "NA", "N/A"];
                    if (!isActive) {
                        const invalidCells = rows_.map(row => row.split(delim)).filter(row => row.some(cell => invalidWords.includes(cell.trim().toUpperCase())));
                        if (invalidCells.length > 0) {
                            throw new Error('El archivo no cumple con la plantilla, por favor verifique que el archivo no contenga celdas con las palabras: NO APLICA, NO DISPONIBLE, N/D, ND, NA, N/A');
                        }
                    }


                    const final_rows = rows_.map(row => {
                        const row_data = row.split(delim);
                        return row_data.filter(col => col.trim() !== '');
                    });
                    resolve({
                        columns: template.columns.map(col => col.name),
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

    public detectDelimiter(file: File, callback: (delimiter: string, text: string) => void) {
        const reader = new FileReader();

        reader.onloadend = function (event: ProgressEvent<FileReader>) {

            const fileData = event.target?.result as string;
            console.log(fileData);
            const sample = fileData;

            const delimiters = [',', ';', '\t'];

            const counts = delimiters.map(delimiter => ({
                delimiter,
                count: (sample.match(new RegExp(delimiter, 'g')) || []).length
            }));

            const sortedDelimiters = counts.sort((a, b) => b.count - a.count);

            callback(sortedDelimiters[0].delimiter || ",", sample);
        };

        reader.readAsText(file, 'utf-8');
    }




}

export default TemplateFileUseCase;