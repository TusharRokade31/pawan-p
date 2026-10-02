import fs from 'fs';

// Read clean template or pawan_tetgure_portfolio.html
let html = fs.readFileSync('public/pawan_tetgure_portfolio.html', 'utf8');

// Replace base64 images with extracted assets
const dataUriRegex = /data:image\/(png|jpeg|jpg|webp|gif|svg\+xml);base64,[A-Za-z0-9+/=]+/g;
let imgCount = 0;
html = html.replace(dataUriRegex, () => {
  imgCount++;
  return `/assets/images/img_${imgCount}.png`;
});

console.log('Replaced base64 images in pawan_tetgure_portfolio.html. Length:', html.length);
fs.writeFileSync('public/assets/full-clean-portfolio.html', html, 'utf8');
