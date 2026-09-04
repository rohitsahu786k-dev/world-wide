const fs = require('fs');

const filePath = 'D:\\onepws\\imperrial\\src\\components\\layout\\Footer.tsx';
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(/href="https:\/\/wa\.me\/34614655587"/g, 'href="https://wa.me/971563930666"');
code = code.replace(/\+34 614 65 55 87/g, '+971 56 393 0666');
code = code.replace(/\+34 614 655 587/g, '+971 56 393 0666');

fs.writeFileSync(filePath, code, 'utf-8');
console.log('Successfully updated Footer.tsx in imperrial');
