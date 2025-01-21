//eslint omit
import jsPDF from "jspdf";
import csvtojson from 'csvtojson';
import * as XLSX from 'xlsx';
import autoTable, { RowInput } from "jspdf-autotable";
import { DELIMITER } from "./constans";
import * as dfd from "danfojs/dist/danfojs-browser/src";


export class Transform {




    static fromCsvToPdfLandScape = async(csv: string, name: string, establishment: string) => {
        
            const blob = new Blob([csv], { type: "text/csv" });
            const fileURL = URL.createObjectURL(blob);

            const dataframe = await dfd.readCSV(fileURL, {
                delimiter: DELIMITER,
                header: false
            });


            // Extraer encabezados y datos
            const headers = dataframe.head().values[0] as string[];
            const data = dataframe.values.slice(1) as string[][];

            // Crear un documento PDF en modo apaisado (landscape)
            const doc = new jsPDF("landscape");

            // Agregar un título con margen de 10
            autoTable(doc, {
                head: [[establishment]],
                startY: 10,
                margin: { horizontal: 10 },
                styles: {
                    overflow: "linebreak",
                    fontSize: 12,
                    cellPadding: 2
                },
                headStyles: { fillColor: [26, 114, 144] }
            });

            // Agregar un subtítulo con margen de 20
            autoTable(doc, {
                head: [[name]],
                startY: doc.previousAutoTable?.finalY || 0 + 10,
                margin: { horizontal: 10 },
                styles: {
                    overflow: "linebreak",
                    fontSize: 10,
                    cellPadding: 2
                },
                headStyles: { fillColor: [26, 114, 144] }
            });

            // Generar la tabla con los datos del CSV
            autoTable(doc, {
                head: [headers],
                body: data,
                startY: doc.previousAutoTable?.finalY ? doc.previousAutoTable.finalY + 10 : 20,
                margin: { horizontal: 10 },
                styles: {
                    fontSize: 7, // Reducir fuente
                    cellPadding: 0.7, // Reducir relleno
                    overflow: "linebreak",
                    halign: "center",
                    valign: "middle"
                },
                headStyles: {
                    fillColor: [26, 114, 144],
                    halign: "center"
                },
                pageBreak: "auto",
                columnStyles: Array(headers.length)
                    .fill(0)
                    .reduce((acc, _, index) => {
                        acc[index] = { columnWidth: "wrap" }; // Ajustar columnas
                        return acc;
                    }, {})
            });            

            // Guardar el PDF
            doc.save(`${name}.pdf`);
        };

    static fromCsvToPdf = async(csv: string, name: string, establishment: string) => {

       

        const blob = new Blob([csv], { type: "text/csv" });
        const fileURL = URL.createObjectURL(blob);

        const dataframe = await dfd.readCSV(fileURL, {
            delimiter: DELIMITER,
            header: false
        });
        const doc = new jsPDF('landscape');

        // Extraer encabezados del CSV
        const headers = dataframe.head().values[0] as string[]

        // Convertir el contenido del CSV a un array de arrays
        const data = dataframe.values.slice(1) as RowInput[]

        // Agregar un título con margen de 10
        autoTable(doc, {
            head: [[establishment]],
            startY: 10,
            margin: { horizontal: 10 },
            styles: { overflow: 'linebreak', fontSize: 12 }, // Reduce el tamaño de la fuente del título si es necesario
            headStyles: { fillColor: [26, 114, 144] }, // Personaliza los estilos del encabezado
        });

        // Agregar un subtítulo con margen de 20
        autoTable(doc, {
            head: [[name]],
            startY: (doc.previousAutoTable?.finalY||0) + 10,
            margin: { horizontal: 10 },
            styles: { overflow: 'linebreak', fontSize: 10 },
            headStyles: { fillColor: [26, 114, 144] }, // Personaliza los estilos del encabezado
        });

        // Generar la tabla con los datos del CSV
        autoTable(doc, {
            head: [headers],
            body: data,
            startY: (doc.previousAutoTable?.finalY||0) + 10,
            margin: { horizontal: 10 },
            styles: {
                fontSize: 8,  // Reduce el tamaño de la fuente para las filas
                overflow: 'linebreak'
            },
            headStyles: { fillColor: [26, 114, 144] }, // Personaliza los estilos del encabezado
            pageBreak: 'auto'  // Permite el salto de página automático
        });

        // Guardar el PDF
        doc.save(`${name}.pdf`);


    }

    static fromCsvToXlxs = (csv: string, name: string) => {

        csvtojson({
            delimiter: DELIMITER
        })
            .fromString(csv)
            .then((json) => {
                const worksheet = XLSX.utils.json_to_sheet(json);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, `${name}.xlsx`);
            });
    }
}