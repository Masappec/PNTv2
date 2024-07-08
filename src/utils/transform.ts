import jsPDF from "jspdf";
import csvtojson from 'csvtojson';
import * as XLSX from 'xlsx';
import autoTable from "jspdf-autotable";
import { DELIMITER } from "./constans";


export class Transform {
    static fromCsvToPdf = (csv: string, name: string,establishment:string) => {
       
        csvtojson({
            delimiter:DELIMITER
        })
            .fromString(csv)
            .then((json) => {
                console.log(json);
                const doc = new jsPDF();

                // Extract headers from the JSON data
                const headers = Object.keys(json[0]);

                // Convert JSON data to an array of arrays
                const data = json.map(row => headers.map(header => row[header]));

                //aregar un titulo
                //margen de 10
                autoTable(doc, {
                    head: [[establishment]],
                    startY: 10,
                    margin: { horizontal: 10 ,vertical: 20},
                    styles: { overflow: 'linebreak' },
                    headStyles: { fillColor: [26, 114, 144] }, // Optional: Customize header styles
                });

                autoTable(doc, {
                    head: [[name]],
                    startY: 20,
                    margin: { horizontal: 10 ,vertical: 20},
                    styles: { overflow: 'linebreak' },
                    headStyles: { fillColor: [26, 114, 144] }, // Optional: Customize header styles
                });



                // Generate the table
                autoTable(doc,{
                    head: [headers],
                    body: data,
                    startY: 30,
                    margin: { horizontal: 10 ,vertical: 20},
                    styles: { overflow: 'linebreak' },
                    headStyles: { fillColor: [26, 114, 144] }, // Optional: Customize header styles
                });

                doc.save(`${name}.pdf`);
            });


    }

    static fromCsvToXlxs = (csv: string, name: string) => {
       
        csvtojson({
            delimiter:DELIMITER
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