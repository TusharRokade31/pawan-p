import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'assets', 'images');
fs.mkdirSync(outDir, { recursive: true });

let html = fs.readFileSync('index.html', 'utf8');

// Match base64 data URIs: data:image/(png|jpeg|webp|gif|svg\+xml);base64,...
const dataUriRegex = /data:image\/(png|jpeg|jpg|webp|gif|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;

let imageIndex = 0;
const mapping = {};

html = html.replace(dataUriRegex, (match, type, base64Data) => {
  imageIndex++;
  const ext = type === 'svg+xml' ? 'svg' : (type === 'jpeg' ? 'jpg' : type);
  const fileName = `img_${imageIndex}.${ext}`;
  const filePath = path.join(outDir, fileName);

  try {
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/assets/images/${fileName}`;
    mapping[imageIndex] = publicUrl;
    return publicUrl;
  } catch (err) {
    console.error(`Error saving image ${imageIndex}:`, err);
    return match;
  }
});

console.log(`Extracted ${imageIndex} images into public/assets/images/`);
fs.writeFileSync('public/assets/clean-template.html', html, 'utf8');
console.log('Saved clean HTML template (reduced from 15.4MB to clean size)');
