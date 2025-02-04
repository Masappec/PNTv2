import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const fetchAndConvertToPdf = async (url: string, establishment_name:string, year:string) => {
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

                    
                    

                    doc.text(sheetName, 20, 20);

                    if(sheetName=='Informe Anual'){
                        autoTable(doc, {
                            head: [['','']],
                            body: jsonData.slice(1,107), // El resto como cuerpo
                            startY: 25,
                        });

                        autoTable(doc, {
                            head: [jsonData[108]], // La primera fila como encabezado
                            body: jsonData.slice(109), // El resto como cuerpo
                        });

                    }else{
                        autoTable(doc, {
                            head: [jsonData[0]], // La primera fila como encabezado
                            body: jsonData.slice(1), // El resto como cuerpo
                            startY: 25,
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
