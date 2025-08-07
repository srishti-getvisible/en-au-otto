const fs = require('fs');
const path = require('path');

function formatHTML(html) {
  // Split the HTML into manageable chunks
  let formatted = html;
  
  // Add line breaks after major HTML tags
  formatted = formatted.replace(/(<\/?(?:html|head|body|div|section|nav|ul|li|a|img|script|link|meta|title|h[1-6]|p|span|style|br|hr)[^>]*>)/g, '\n$1\n');
  
  // Add line breaks after attributes in long tags
  formatted = formatted.replace(/(\s+)([a-zA-Z-]+="[^"]*")/g, '\n$1$2');
  
  // Add proper indentation
  let lines = formatted.split('\n');
  let indentLevel = 0;
  let formattedLines = [];
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    // Decrease indent for closing tags
    if (line.match(/^<\//)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    // Add current indentation
    const indent = '  '.repeat(indentLevel);
    formattedLines.push(indent + line);
    
    // Increase indent for opening tags (but not self-closing)
    if (line.match(/^<[^/][^>]*>$/) && !line.match(/\/>/)) {
      indentLevel++;
    }
  }
  
  return formattedLines.join('\n');
}

function formatFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const formatted = formatHTML(content);
    fs.writeFileSync(filePath, formatted);
    console.log(`✅ Formatted: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error formatting ${filePath}:`, error.message);
  }
}

// Format all HTML files in es-gb directory
const htmlFiles = [
  'es-gb/index.html',
  'es-gb/invoicing.html'
];

console.log('🔄 Formatting HTML files for better readability...\n');

htmlFiles.forEach(formatFile);

console.log('\n✅ All HTML files have been formatted!');
console.log('📝 The files now have proper line breaks and indentation for easier reading.'); 