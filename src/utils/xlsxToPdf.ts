import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import ExcelJS from 'exceljs';

export const fetchAndConvertToPdfAnualReportEstablishment = async (url: string, establishment_name: string, year: string) => {
    if (!url) {
        console.error("URL no válida");
        return;
    }

    try {
        // Descargar el archivo Excel desde la URL
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al descargar el archivo: ${response.statusText}`);

        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (!data) throw new Error("No se pudo leer el archivo");

                const workbook = XLSX.read(data, { type: "binary" });
                const doc = new jsPDF("landscape");
                doc.text(`${establishment_name} - Informe Anual ${year}`, 20, 10);

                workbook.SheetNames.forEach((sheetName, index) => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (jsonData.length === 0) return; // Evita procesar hojas vacías

                    if (index > 0) {
                        doc.addPage(); // Nueva página para cada hoja extra
                    }
                    if (sheetName == 'T.A-F-C'){
                        sheetName = 'Transparencias Activa, Focalizada y Colaborativa'
                    }
                    doc.text(sheetName, 20, 20);
                   

                    if (sheetName === "Informe Anual") {
                        // Verificar que hay suficientes filas antes de acceder a ellas
                        const mainBody = jsonData.slice(1, 107);
                        const secondBody = jsonData.length > 109 ? jsonData.slice(109) : [];
                        if (mainBody.length > 0) {
                            autoTable(doc, {
                                head: [["", ""]], // Encabezado vacío
                                body: mainBody,
                                startY: 25,
                                margin: { bottom: 15 },
                            });
                        }

                        if (secondBody.length > 0) {
                            let startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 25;

                            // Si startY está muy cerca del final de la página, agregar una nueva página
                            

                            autoTable(doc, {
                                head: [[
                                    "Tema",
                                    "Base Legal",
                                    "Fecha de clasificación de la información reservada - semestral",
                                    "Periodo de vigencia de la clasificación de la reserva",
                                    "Se ha efectuado ampliación",
                                    "Descripción de la ampliación",
                                    "Fecha de la ampliación",
                                    "Periodo de vigencia de la ampliación"
                                ]],
                                body: secondBody,
                                startY: startY,
                                margin: { bottom: 15 },
                                styles: { fontSize: 8, cellWidth: 'wrap' }, // Reducir el tamaño del texto y permitir ajuste automático
                                columnStyles: {
                                    0: { cellWidth: 35 }, // Ajusta cada columna si es necesario
                                    1: { cellWidth: 35 },
                                    2: { cellWidth: 35 },
                                    3: { cellWidth: 35 },
                                    4: { cellWidth: 35 },
                                    5: { cellWidth: 35 },
                                    6: { cellWidth: 35 },
                                    7: { cellWidth: 35 }
                                },
                                
                            });
                        }
                    } else {
                        autoTable(doc, {
                            head: [jsonData[0]], // La primera fila como encabezado
                            body: jsonData.slice(1), // El resto como cuerpo
                            startY: 25,
                            margin: { bottom: 15 },
                        });
                    }
                });

                doc.save(`${establishment_name} - Informe Anual ${year}.pdf`);
            } catch (error) {
                console.error("Error al procesar el archivo:", error);
                alert("Hubo un problema al convertir el archivo a PDF.");
            }
        };

        reader.readAsBinaryString(blob);
    } catch (error) {
        console.error("Error al descargar o procesar el archivo:", error);
        alert("No se pudo descargar el archivo. Verifica la URL.");
    }
};

export const fetchAndConvertToPdfAnualReport = async (url: string, filename: string, year: number) => {
    if (!url) {
        console.error("URL no válida");
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al descargar el archivo: ${response.statusText}`);

        const excelBlob = await response.blob();
        const arrayBuffer = await excelBlob.arrayBuffer();

        // Cargar el archivo Excel con ExcelJS
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        const doc = new jsPDF("landscape");
        doc.text(`Informe Anual ${year}`, 20, 10);
        workbook.worksheets.forEach((sheet, ) => {
            const sheetName = sheet.name;
            // Leer las filas y columnas restantes
            const jsonData: any[][] = [];
            sheet.eachRow({ includeEmpty: false }, (row, ) => {
                const rowData: any[] = [];
                row.eachCell({ includeEmpty: true }, (cell, ) => {
                    rowData.push(cell.value || "");
                });
                jsonData.push(rowData);
            });

            // Agregar la hoja al PDF si tiene datos
            if (jsonData && jsonData.length > 0) {
                doc.text(sheetName, 25, 20);

                autoTable(doc, {
                    head: [jsonData[0]], // Primer fila como encabezado
                    body: jsonData.slice(1), // Las siguientes filas como datos
                    startY:30,
                    margin: { bottom: 15 },
                });
            } else {
                console.warn(`La hoja "${sheetName}" no tiene datos válidos.`);
            }
        });

        // Guardar el archivo PDF
        doc.save(`${filename}.pdf`);
    } catch (error) {
        console.error("Error al descargar o procesar el archivo:", error);
        alert("No se pudo descargar el archivo. Verifica la URL.");
    }
};


export const fetchAndConvertToCsvAnualReport = async (url: string, filename: string, year: number) => {
    if (!url) {
        console.error("URL no válida");
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al descargar el archivo: ${response.statusText}`);

        const _blob = await response.blob();
        const arrayBuffer = await _blob.arrayBuffer();

        // Cargar el archivo Excel con ExcelJS
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        // Crear un array para almacenar todas las filas CSV
        let csvContent = '';

        // Iterar sobre las hojas y agregar todas las filas en el mismo CSV
        workbook.worksheets.forEach((sheet, ) => {
            const sheetName = sheet.name;
            console.log(`Procesando hoja para CSV: ${sheetName}`);

            // Agregar el nombre de la hoja como título
            csvContent += `\n\n--- ${sheetName} ---\n`; // Agregar un salto de línea y el nombre de la hoja

            // Recorrer las filas de la hoja
            sheet.eachRow({ includeEmpty: true }, (row, ) => {
                const rowData: string[] = [];
                
                // Recorrer las celdas de cada fila
                row.eachCell({ includeEmpty: true }, (cell, ) => {
                    rowData.push(`"${cell.value || ''}"`); // Aseguramos que el valor esté entre comillas
                });

                // Unir las celdas por comas y agregar la fila al contenido CSV
                csvContent += rowData.join(';') + '\n';
            });
        });

        csvContent = '\uFEFF' + csvContent; // Agregar BOM para compatibilidad con Excel
        // Crear un enlace para descargar el archivo CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}_${year}_ReporteAnual.csv`; // Nombre del archivo CSV

        // Simular clic para descargar el archivo
        link.click();
    } catch (error) {
        console.error("Error al descargar o procesar el archivo:", error);
        alert("No se pudo descargar el archivo. Verifica la URL.");
    }
};

                                    
export const downloadExcelAndCombineToCSV = async (excelUrl: string, name: string) => {
    try {
        // Descargar el archivo Excel
        const response = await axios.get(excelUrl, { responseType: 'arraybuffer' });
        const data = new Uint8Array(response.data);

        // Leer el archivo Excel
        const workbook = XLSX.read(data, { type: 'array' });

        // Combinar el contenido de todas las hojas en un solo CSV
        let combinedCSV = '';

        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: ';' }); // Usar punto y coma como separador

            // Añadir nombre de la hoja como encabezado
            combinedCSV += `\n \n --- ${sheetName} ---\n${csv}\n`;
        });

        combinedCSV = '\uFEFF' + combinedCSV; // Agregar BOM para compatibilidad con Excel
        // Crear un blob y generar un enlace de descarga
        const blob = new Blob([combinedCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name+'.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error durante la descarga o conversión:', error);
    }
};