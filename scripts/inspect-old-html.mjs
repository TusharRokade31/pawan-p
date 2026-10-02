import fs from 'fs';

const html = fs.readFileSync('public/pawan_tetgure_portfolio.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((l, idx) => {
  if (
    l.includes('<section') ||
    l.includes('class="page') ||
    l.includes('<footer') ||
    l.includes('<!-- ───') ||
    l.includes('<!-- ═══') ||
    l.includes('<nav')
  ) {
    console.log(`${idx + 1}: ${l.trim().substring(0, 100)}`);
  }
});
