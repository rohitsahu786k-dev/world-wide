const fs = require('fs');

const filePath = 'D:\\onepws\\imperrial\\src\\data\\siteData.ts';
let code = fs.readFileSync(filePath, 'utf-8');

// Replace contact numbers in imperrial siteData.ts
code = code.replace(/mobile:\s*"[^"]*"/, 'mobile: "+971 56 393 0666"');
code = code.replace(/whatsapp:\s*"[^"]*"/, 'whatsapp: "+971 56 393 0666"');
code = code.replace(/whatsappMain:\s*"[^"]*"/, 'whatsappMain: "+971 56 393 0666"');

fs.writeFileSync(filePath, code, 'utf-8');
console.log('Successfully updated siteData.ts in imperrial project');
