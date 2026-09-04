const fs = require('fs');

const pdfPath = 'D:\\onepws\\imperrial\\Imperial Essence Website Requirements Response Updated.pdf';
const buf = fs.readFileSync(pdfPath);
const content = buf.toString('latin1');

// Extract readable text chunks between parenthesis in PDF streams
const matches = content.match(/\(([^()]{2,})\)/g) || [];
const textBlocks = matches
  .map(m => m.slice(1, -1))
  .filter(t => t.trim().length > 0 && !/^[\d\s\.\,\-\/\:\;\#\%\=\+\*\!\?]+$/.test(t));

console.log('--- ALL EXTRACTED TEXT FROM PDF ---');
console.log([...new Set(textBlocks)].join('\n'));
