//eslint omit
import jsPDF from "jspdf";
import csvtojson from 'csvtojson';
import * as XLSX from 'xlsx';
import autoTable, { Styles } from "jspdf-autotable";
import { DELIMITER } from "./constans";


export class Transform {




    static fromCsvToPdfLandScape = (csv: string, name: string, establishment: string) => {
            
       
        const rows = csv.split('\n')
        let csvContent    = rows.map(row => row.split(DELIMITER).map(cell => cell.trim()));

        if (csvContent[0].length>5){
            csvContent = csv.split('\n').map(row => row.split(DELIMITER).map(cell => cell.trim()).slice(0,5));
        }

        const doc = new jsPDF('landscape');

        // Extraer encabezados del CSV
        const headers = csvContent[0].length > 5 ? csvContent[0].slice(0,5) : csvContent[0];

        // Convertir el contenido del CSV a un array de arrays
        const data = csvContent.slice(1);

        // Agregar un título con margen de 10
        autoTable(doc, {
            head: [[establishment]],
            startY: 10,
            margin: { horizontal: 10 },
            styles: {
                overflow: 'linebreak',
                fontSize: 12,
                cellPadding: 2
            }, // Reduce el tamaño de la fuente del título si es necesario
            headStyles: { fillColor: [26, 114, 144] }, // Personaliza los estilos del encabezado
        });

        // Agregar un subtítulo con margen de 20
        autoTable(doc, {
            head: [[name]],
            startY:  doc.previousAutoTable?.finalY||0 + 10,
            margin: { horizontal: 10 },
            styles: {
                overflow: 'linebreak',
                fontSize: 10,
                cellPadding: 2
            },
            headStyles: { fillColor: [26, 114, 144] }, // Personaliza los estilos del encabezado
        });

        // Generar la tabla con los datos del CSV
        autoTable(doc, {
            head: [headers],
            body: data,
            startY: doc.previousAutoTable?.finalY||0 + 10,
            margin: { horizontal: 10 },
            styles: {
                fontSize: 8,  // Reducir el tamaño de la fuente para las filas
                cellPadding: 1, // Reducir el relleno de las celdas
                overflow: 'linebreak',
                halign: 'center', // Centrar el contenido de las celdas
                valign: 'middle', // Alinear verticalmente el contenido de las celdas
                columnWidth: 'wrap' // Ajustar el ancho de las columnas
            } as Partial<Styles>,
            headStyles: {
                fillColor: [26, 114, 144],
                halign: 'center' // Centrar el texto del encabezado
            }, // Personalizar los estilos del encabezado
            pageBreak: 'auto',  // Permitir el salto de página automático
            columnStyles: {
                0: { columnWidth: 'auto' },
                1: { columnWidth: 'auto' },
                2: { columnWidth: 'auto' },
                3: { columnWidth: 'auto' },
                4: { columnWidth: 'auto' },
                5: { columnWidth: 'auto' },
                6: { columnWidth: 'auto' },
                7: { columnWidth: 'auto' },
                8: { columnWidth: 'auto' },
                9: { columnWidth: 'auto' },
                10: { columnWidth: 'auto' }
            } as {
                [key: number]:  Partial<Styles>
            }
        });
        // Guardar el PDF
        doc.save(`${name}.pdf`);
    }

    static fromCsvToPdf = (csv: string, name: string, establishment: string) => {

        //limpiar el csv
        csv = csv.replace(/"/g, '');
        csv = csv.replace(/;/g, ',');
        csv = csv.replace(/,/g, ';');

        const csvContent = csv.split('\n').map(row => row.split(DELIMITER));

        const doc = new jsPDF('landscape');

        // Extraer encabezados del CSV
        const headers = csvContent[0];

        // Convertir el contenido del CSV a un array de arrays
        const data = csvContent.slice(1);

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