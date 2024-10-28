import TemplateService from "../../../infrastructure/Services/TemplateService";
import { DELIMITER } from "../../../utils/constans";
import Template from "../../entities/Template";
import TemplateFileEntity from "../../entities/TemplateFileEntity";
import * as dfd from "danfojs/dist/danfojs-browser/src";
class TemplateFileUseCase {
  constructor(private readonly service: TemplateService) {}

  async validateFile(data: TemplateFileEntity) {
    return await this.service.validateFile(data);
  }
  normalizeString(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/:/g, "")
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
      .toLowerCase()
      .trim();
  }

  cleanCSV(csvContent: string) {
    // Split the content into lines
    if(!csvContent){
      throw new Error("No se pudo leer el archivo, por favor verifique que el archivo no este vacio");
    }
    const lines = csvContent.trim().split("\n");
    // Clean each line
    const cleanedLines = lines.map((line) => {
      // Remove leading semicolon and space
      line = line.replace(/^;\s*/, "");

      // Remove trailing semicolons
      line = line.replace(/;+\s*$/, "");

      // Remove consecutive semicolons within the line
      line = line.replace(/;{3,}/g, "");

      //remplazar \r
      line = line.replace(/\r/g, "");

      return line;
    });
    const nonEmptyLines = cleanedLines.filter((line) => line && line.trim() !== "");

    // Join cleaned lines into a single string with line breaks
    return nonEmptyLines.join("\r\n");
  }
  uniqueHeaders = (headers: string[]) => {
    const seen = new Map();
    return headers.map((header) => {
      const count = seen.get(header) || 0;
      seen.set(header, count + 1);
      return count > 0 ? `${header}_${count}` : header;
    });
  };

  async validateFileContent(cleanedCSV: string, template: Template, isNotValidateNA:boolean) {

    const blob = new Blob([cleanedCSV], { type: "text/csv" });
    const fileURL = URL.createObjectURL(blob);

     const df = await dfd.readCSV(fileURL, {
       delimiter: DELIMITER,
       header: false
     });
     if (!df) {
       throw new Error("No se pudo leer el archivo, por favor verifique que el archivo no este vacio");
      }
      let dataframe = df;
      if(template.verticalTemplate){
        if(dataframe.columns.length !== template.columns.length){
          dataframe = dataframe.transpose();
        
        }
      }
      dataframe.$setColumnNames(dataframe.head().values[0] as string[]);
      console.log(dataframe.print());
      console.log(template.columns, dataframe.columns);
      //implementar validaciones
      if(dataframe.columns.length !== template.columns.length){
        throw new Error("El archivo no coincide con la plantilla, la cantidad de columnas no coincide");
      }

      dataframe.columns.forEach((element) => {
        if (
          !template.columns.find(
            (col) =>
              this.normalizeString(col.name) ===
              this.normalizeString(element)
          )
        ) {
          throw new Error(
            'El archivo no coincide con la plantilla, las columnas no coinciden, Columna de nombre: "' +
              element +
              '" no encontrada en la plantilla'
          );
        }
      });

      // validar que su contenido no contenga las palabras “NO APLICA”, “NO DISPONIBLE”, “N/D”, “ND”, “NA”, “N/A”.
      const rows = dataframe.values.slice(1);
      const invalidWords = [
        "NO APLICA",
        "NO DISPONIBLE",
        "N/D",
        "ND",
        "NA",
        "N/A",
      ];
      const invalidCells = rows.filter((row) => {
        const _row = row as string[];
        return _row.some((cell) =>{
          
          return cell && invalidWords.includes(cell.toString().trim().toUpperCase())

        }
        );
      });
      if(!isNotValidateNA){
        if (invalidCells.length > 0) {
          throw new Error(
            "El archivo no cumple con la plantilla, por favor verifique que el archivo no contenga celdas con las palabras: NO APLICA, NO DISPONIBLE, N/D, ND, NA, N/A"
          );
        }
      }

      if (rows.length === 0) {
        throw new Error(
          "El archivo no contiene datos, por favor verifique que el archivo no este vacio"
        );
      }

      if (rows.filter((row) => row == undefined || row === null).length > 0) {
        throw new Error(
          "El archivo contiene datos vacios, por favor verifique que el archivo no contenga celdas vacias"
        );
      }

      if (
        rows.filter((row) => {
          const _row = row as string[];
          return _row.filter((col) => col && col.toString().trim() !== "").length === 0;
        }).length > 0
      ) {
        throw new Error(
          "El archivo no contiene datos, por favor verifique que el archivo no este vacio"
        );
      }


      const rows_result = rows.map((row) => {
        const _row = row as string[];
        return _row.filter((col) => col && col.toString().trim() !== "");
      });
       return {
         columns: template.columns.map((col) => col.name),
         rows: rows_result,
         verticalTemplate: template.verticalTemplate,
         valid: true,
       };


    
  }

  async validateLocalFile(
    data: File,
    template: Template,
    isActive = false,
  ) {
    return new Promise<{
      columns: string[];
      rows: string[][];
      verticalTemplate: boolean;
      valid: boolean;
    }>((resolve, reject) => {
      this.detectDelimiter(data, async (delim, text) => {
        try {
          console.log("delimiter", delim);
          const cleanedCSV = this.cleanCSV(text);
          const result = await this.validateFileContent(cleanedCSV, template, isActive);
          resolve(result);
          
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    });
  }

  public detectDelimiter(
    file: File,
    callback: (delimiter: string, text: string) => void
  ) {
    const reader = new FileReader();

    reader.onloadend = function (event: ProgressEvent<FileReader>) {
      const fileData = event.target?.result as string;
      const sample = fileData;

      const delimiters = [",", ";", "\t"];

      const counts = delimiters.map((delimiter) => ({
        delimiter,
        count: (sample.match(new RegExp(delimiter, "g")) || []).length,
      }));

      const sortedDelimiters = counts.sort((a, b) => b.count - a.count);

      callback(sortedDelimiters[0].delimiter || DELIMITER, sample);
    };

    reader.readAsText(file, "utf-8");
  }
}

export default TemplateFileUseCase;