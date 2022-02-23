import { PDFDocument } from "pdf-lib";

/*
    This file contains helper functions used to manipulate PDFs
*/

// Concatenates all PDFs in pdfsToMerge in the order they are passed and returns a uint8 array
const merge = async (pdfsToMerge) => {
  const pdfDoc = await PDFDocument.create();

  const pdfs = await Promise.all(
    pdfsToMerge.map(async (pdf) => {
      const loadedPDF = await pdf.arrayBuffer();
      return PDFDocument.load(loadedPDF);
    })
  );

  const copiedPDFs = await Promise.all(
    pdfs.map((pdf) => pdfDoc.copyPages(pdf, pdf.getPageIndices()))
  );

  copiedPDFs.forEach((pdf) => pdf.forEach((page) => pdfDoc.addPage(page)));

  return await pdfDoc.save({ useObjectStreams: false });
};

const extractPages = async (pdf, indicesToExtract) => {
  const pdfDoc = await PDFDocument.create();

  const srcDoc = await PDFDocument.load(await pdf.arrayBuffer());
  const copiedPages = await pdfDoc.copyPages(srcDoc, indicesToExtract);

  copiedPages.forEach((page) => pdfDoc.addPage(page));

  return await pdfDoc.save({ useObjectStreams: false });
};

const PDFService = { merge, extractPages };

export default PDFService;
