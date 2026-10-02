import fs from 'fs';

const rawHtml = fs.readFileSync('public/assets/full-clean-portfolio.html', 'utf8');

// Extract body content between <body> and <script>
const bodyStart = rawHtml.indexOf('<nav id="navbar">');
const scriptStart = rawHtml.lastIndexOf('<script>');
const bodyHtml = rawHtml.substring(bodyStart, scriptStart);

console.log('Body HTML length:', bodyHtml.length);
fs.writeFileSync('public/assets/body-extracted.html', bodyHtml, 'utf8');
