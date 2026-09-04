const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const pdfPath = 'D:\\onepws\\imperrial\\Imperial Essence Website Requirements Response Updated.pdf';
const buffer = fs.readFileSync(pdfPath);
const uint8Array = new Uint8Array(buffer);

const parser = new PDFParse(uint8Array);
parser.load().then(() => {
    console.log("=== TOTAL PAGES:", parser.doc.numPages);
    for (let i = 1; i <= parser.doc.numPages; i++) {
        parser.getPageText(i).then(pt => {
            console.log(`=== PAGE ${i} ===\n`, pt.text);
        });
    }
}).catch(err => console.log(err));
