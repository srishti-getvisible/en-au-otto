const fs = require('fs');
const path = require('path');

function includeComponents(htmlContent, componentName) {
  const componentPath = path.join(__dirname, 'en-gb/components', `${componentName}.html`);
  
  if (fs.existsSync(componentPath)) {
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    const placeholder = `<!-- INCLUDE:${componentName} -->`;
    
    if (htmlContent.includes(placeholder)) {
      return htmlContent.replace(placeholder, componentContent);
    }
  }
  
  return htmlContent;
}

function processHTMLFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Include header and footer components
    content = includeComponents(content, 'header');
    content = includeComponents(content, 'footer');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Processed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Process all HTML files
const htmlFiles = [
  'en-gb/index.html',
  'en-gb/invoicing.html'
];

console.log('🔄 Including components in HTML files...\n');

htmlFiles.forEach(processHTMLFile);

console.log('\n✅ All files processed!');
console.log('📝 To use components, add these placeholders to your HTML:');
console.log('<!-- INCLUDE:header --> - for header component');
console.log('<!-- INCLUDE:footer --> - for footer component'); 