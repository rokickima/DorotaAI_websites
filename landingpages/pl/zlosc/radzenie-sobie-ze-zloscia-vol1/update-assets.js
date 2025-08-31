const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { execSync } = require('child_process');

// Paths
const distDir = path.join(__dirname, 'dist');
const jsDistDir = path.join(distDir, 'js');
const srcDir = path.join(__dirname, 'src');
const htmlFile = path.join(distDir, 'index.html');

// Ensure dist/js exists
if (!fs.existsSync(jsDistDir)) fs.mkdirSync(jsDistDir);

// Generate new UUID
const uid = uuidv4().split('-')[0]; // Shorter UUID

// Remove old versioned JS files in dist/js
fs.readdirSync(jsDistDir).forEach(file => {
  if (file.match(/^(main|stape)_.*\.js$/)) {
    fs.unlinkSync(path.join(jsDistDir, file));
  }
});

// Remove old versioned CSS files in dist/
fs.readdirSync(distDir).forEach(file => {
  if (file.match(/^style_.*\.css$/)) {
    fs.unlinkSync(path.join(distDir, file));
  }
});

// Build new CSS file with Tailwind
const cssOut = `style_${uid}.css`;
execSync(`npx tailwindcss -i ./src/input.css -o ./dist/${cssOut}`);

// Copy main.js if not empty
const mainSrc = path.join(srcDir, 'main.js');
const mainDest = path.join(jsDistDir, `main_${uid}.js`);
if (fs.existsSync(mainSrc) && fs.readFileSync(mainSrc, 'utf8').trim().length > 0) {
  fs.copyFileSync(mainSrc, mainDest);
}

// Copy stape.js if not empty
const stapeSrc = path.join(srcDir, 'stape.js');
const stapeDest = path.join(jsDistDir, `stape_${uid}.js`);
if (fs.existsSync(stapeSrc) && fs.readFileSync(stapeSrc, 'utf8').trim().length > 0) {
  fs.copyFileSync(stapeSrc, stapeDest);
}

// Update index.html references
let html = fs.readFileSync(htmlFile, 'utf8');

// Update CSS link
html = html.replace(/<link href="\.\/style_.*\.css"/, `<link href="./${cssOut}"`);

// Remove old JS script tags for main_*.js and stape_*.js, then add new ones before </body>
html = html.replace(/<script src="\.\/js\/main_.*\.js"><\/script>\s*/g, '');
html = html.replace(/<script src="\.\/js\/stape_.*\.js"><\/script>\s*/g, '');
let jsTags = '';
if (fs.existsSync(mainDest)) jsTags += `<script src="./js/main_${uid}.js"></script>\n`;
if (fs.existsSync(stapeDest)) jsTags += `<script src="./js/stape_${uid}.js"></script>\n`;
html = html.replace(/<\/body>/, `${jsTags}</body>`);

fs.writeFileSync(htmlFile, html);

console.log(`Updated assets:
- CSS: ${cssOut}
- JS: ${mainDest ? path.basename(mainDest) : 'none'}, ${stapeDest ? path.basename(stapeDest) : 'none'}`);