const fs = require('fs');

const filePath = 'D:\\onepws\\imperrial\\src\\data\\site.ts';
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(/phone:\s*"[^"]*"/, 'phone: "+971 4 552 1257"');
code = code.replace(/phoneHref:\s*"[^"]*"/, 'phoneHref: "tel:+97145521257"');

fs.writeFileSync(filePath, code, 'utf-8');
console.log('Successfully updated site.ts in imperrial project');
