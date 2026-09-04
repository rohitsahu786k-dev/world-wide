const fs = require('fs');

const filePath = 'D:\\onepws\\imperrial\\src\\app\\layout.tsx';
let code = fs.readFileSync(filePath, 'utf-8');

code = code.replace(/icons:\s*\{[^}]*\}/s, `icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  }`);

fs.writeFileSync(filePath, code, 'utf-8');
console.log('Successfully updated layout.tsx icons in imperrial');
