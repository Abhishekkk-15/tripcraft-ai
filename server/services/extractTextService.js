const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractTextFromFile = async (filePath, mimeType) => {
  if (mimeType === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (mimeType.startsWith("image/")) {
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text;
  }

  throw new Error("Unsupported file type");
};

module.exports = extractTextFromFile;