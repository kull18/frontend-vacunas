import jsPDF from "jspdf";
import imssLogo from "../../../../../assets/imss.png"; // Solo si es necesario

export interface RegistroVacuna {
  nombre: string;
  dosis: string;
  fecha: string;
}

export const FilePatient = (registro: RegistroVacuna) => {
  const doc = new jsPDF();

  // Bordes
  doc.setLineWidth(2);
  doc.rect(10, 10, 190, 120);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 186, 116);

  doc.addImage(imssLogo, "PNG", 15, 15, 25, 25);

  // Encabezado
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("INSTITUTO MEXICANO DEL SEGURO SOCIAL", 105, 25, { align: "center" });
  doc.text("UNIDAD DE MEDICINA FAMILIAR N° 13", 105, 32, { align: "center" });

  // Título
  doc.setFontSize(14);
  doc.text("VACUNA ANTI-VPH", 105, 45, { align: "center" });

  // ==== CAMPO NOMBRE ====
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("NOMBRE:", 20, 60); // Etiqueta

  doc.setFont("helvetica", "normal");
  doc.text(registro.nombre || "", 22, 66); // Texto dinámico

  doc.setLineWidth(0.5);
  doc.line(20, 69, 190, 69); // Línea justo debajo del texto dinámico

  // ==== CAMPO DOSIS / FECHA ====
  doc.setFont("helvetica", "bold");
  doc.text("DOSIS / FECHA:", 20, 80); // Etiqueta

  doc.setFont("helvetica", "normal");
  const dosisTexto = `${registro.dosis} - ${registro.fecha}`;
  doc.text(dosisTexto || "", 22, 86); // Texto dinámico

  doc.line(20, 89, 190, 89); // Línea debajo del texto

  // Pie de página
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("LA PROTECCIÓN COMPLETA SE LOGRA", 105, 110, { align: "center" });
  doc.text("APLICÁNDOSE LAS DOSIS INDICADAS", 105, 117, { align: "center" });

  // Descargar
  const nombreArchivo = `certificado_vacuna_vph_${registro.nombre.replace(/\s+/g, "_")}.pdf`;
  doc.save(nombreArchivo);
};
