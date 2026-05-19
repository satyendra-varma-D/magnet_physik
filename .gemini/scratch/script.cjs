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
    '#5DA9DD': '#2563eb', // Light Blue -> Royal Blue (Tailwind Blue-600)
    '#4A98CC': '#1d4ed8', // Hover Light Blue -> Darker Royal Blue (Tailwind Blue-700)
    '#2D6F9F': '#1e3a8a', // Deep Blue -> Blue-900
    'blue-50/50': 'blue-50/80',
    'bg-blue-50 ': 'bg-blue-100 ',
    'bg-blue-50/30': 'bg-blue-100/50',
    'shadow-blue-200': 'shadow-blue-300',
    'shadow-blue-500/20': 'shadow-blue-600/30'
};

const fontReplacements = {
    'text-[8px]': 'text-[10px]',
    'text-[9px]': 'text-[11px]',
    'text-[10px]': 'text-xs',
    'text-[11px]': 'text-sm',
    'text-xs ': 'text-sm ',
    'text-xs"': 'text-sm"',
    'text-xs\\': 'text-sm\\',
    'text-sm ': 'text-base ',
    'text-sm"': 'text-base"',
    'text-sm\\': 'text-base\\'
};

walkDir(srcDir, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        for (const [oldColor, newColor] of Object.entries(colorReplacements)) {
            content = content.split(oldColor).join(newColor);
        }
        
        for (const [oldFont, newFont] of Object.entries(fontReplacements)) {
            content = content.split(oldFont).join(newFont);
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
