const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const colorReplacements = {
    '#2563eb': '#009EE3', // Royal Blue -> Magnet-Physik Brand Blue
    '#1d4ed8': '#007AB0', // Hover Blue -> Brand Hover Blue
    '#1e3a8a': '#005C8A', // Deep Blue -> Brand Deep Blue
};

const fontReplacements = {
    'text-base ': 'text-sm ',
    'text-base\"': 'text-sm\"',
    'text-base\\': 'text-sm\\',
    'text-lg ': 'text-base ',
    'text-lg\"': 'text-base\"',
    'text-lg\\': 'text-base\\'
};

walkDir(srcDir, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        for (const [oldColor, newColor] of Object.entries(colorReplacements)) {
            content = content.split(oldColor).join(newColor);
        }
        
        // Fonts need to be replaced carefully to not cascade. 
        // base -> sm, lg -> base. Since object iterates in order:
        // replacing base -> sm first will create more sm. 
        // Then replacing lg -> base will not affect the newly created sm. 
        for (const [oldFont, newFont] of Object.entries(fontReplacements)) {
            content = content.split(oldFont).join(newFont);
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
