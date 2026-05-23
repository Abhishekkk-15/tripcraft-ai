import jsPDF from "jspdf";

export const downloadPDF = (text) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("TripCraft AI Itinerary", 10, 15);

  doc.setFontSize(11);
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 10, 30);

  doc.save("tripcraft-itinerary.pdf");
};