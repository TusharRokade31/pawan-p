import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('index.html', 'utf8');

// Match all <style>...</style> blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let allCss = '/* Portfolio styles extracted from original index.html */\n\n';

while ((match = styleRegex.exec(html)) !== null) {
  allCss += match[1].trim() + '\n\n';
}

fs.writeFileSync('src/app/portfolio.css', allCss, 'utf8');
console.log(`Extracted styles into src/app/portfolio.css (${allCss.length} bytes)`);
