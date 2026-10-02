import fs from 'fs';

const html = fs.readFileSync('public/assets/clean-template.html', 'utf8');

// We will extract sections from clean-template.html
// Lines:
// Navbar: 915 to 930
// Hero & Reel & Marquee & Logos: 934 to 1090
// Experience: 1091 to 1183
// Clients & Tech: 1184 to 1404
// Reviews: 1405 to 1832
// Work: 1833 to 1873
// Shorts: 1874 to 1944
// Process & WeDo & FAQ & Contact: 1945 to 2034
// Page About: 2035 to 2171
// Page Work: 2172 to 2311
// Page Terms: 2312 to 2480
// Footer & Modal: 2481 to 2497

console.log('Clean template loaded. Length:', html.length);
