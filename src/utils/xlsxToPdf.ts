import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const fetchAndConvertToPdf = async (url: string, establishment_name: string, year: string) => {
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
