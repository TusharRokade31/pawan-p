import fs from 'fs';

const html = fs.readFileSync('public/assets/clean-template.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines in clean template:', lines.length);

lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('class="page') || l.includes('<nav id=')) {
    console.log(`${i + 1}: ${l.trim().substring(0, 80)}`);
  }
});
