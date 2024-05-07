import TemplateService from "../../../infrastructure/Services/TemplateService";
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
        return new Promise<boolean>((resolve, reject) => {
            this.detectDelimiter(data, 1024, (delim, text) => {
                try {
                    const rows = text.split('\n');

                    let columns = rows[0].split(delim);

                    if (template.verticalTemplate) {
                        columns = rows.map(row => row.split(delim)[0]);


                    }

                    columns = columns.filter(col => col.trim() !== '');


                    if (columns.length !== template.columns.length) {
                        throw new Error('El archivo no coincide con la plantilla, la cantidad de columnas no coincide');

                    }
                    columns.forEach(element => {
                        console.log(template.columns.find(col => col.name.toLowerCase().trim() === element.toLowerCase().trim()))
                        if (!template.columns.find(col => col.name.toLowerCase().trim() === element.toLowerCase().trim())) {
                            throw new Error('El archivo no coincide con la plantilla, las columnas no coinciden');
                        }
                    });
                    resolve(true);
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

        reader.readAsText(file.slice(0, sampleSize), 'UTF-8');
    }



}

export default TemplateFileUseCase;