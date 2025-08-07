const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

const sourceDir = path.join(__dirname, 'en-gb');
const targetDir = path.join(__dirname, 'en-au');

// Common British to Australian English replacements
const replacements = [
  // URL and language tags
  { from: '/en-gb', to: '/en-au' },
  { from: 'en-gb', to: 'en-au' },
  { from: 'en_GB', to: 'en_AU' },
  { from: 'en-GB', to: 'en-AU' },
  
  // Currency and number formats (if any)
  // { from: '£', to: 'A$' }, // Uncomment if needed
  
  // Date formats (if any specific formats are used)
  // { from: 'DD/MM/YYYY', to: 'DD/MM/YYYY' }, // Same format but might need attention for display
  
  // Common British to Australian English spellings
  { from: 'organisation', to: 'organisation' }, // Both spellings are acceptable in AU
  { from: 'organisations', to: 'organisations' },
  { from: 'realise', to: 'realise' }, // Both spellings are acceptable in AU
  { from: 'recognise', to: 'recognise' }, // Both spellings are acceptable in AU
  // Add more as needed
];

async function copyDirectory(source, target) {
  try {
    await mkdir(target, { recursive: true });
    const entries = await readdir(source, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const targetPath = path.join(target, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(sourcePath, targetPath);
      } else {
        await copyFile(sourcePath, targetPath);
      }
    }
  } catch (error) {
    console.error(`Error copying directory ${source} to ${target}:`, error);
  }
}

async function processFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf8');
    let updated = false;

    for (const { from, to } of replacements) {
      const regex = new RegExp(from, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, to);
        updated = true;
      }
    }

    if (updated) {
      await writeFile(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

async function processDirectory(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (
        entry.name.endsWith('.html') || 
        entry.name.endsWith('.js') || 
        entry.name.endsWith('.css') ||
        entry.name.endsWith('.json')
      ) {
        await processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

async function main() {
  try {
    console.log('Starting conversion from en-GB to en-AU...');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      console.log(`Creating directory: ${targetDir}`);
      await mkdir(targetDir, { recursive: true });
    }
    
    // Copy all files from en-gb to en-au
    console.log('Copying files...');
    await copyDirectory(sourceDir, targetDir);
    
    // Process all files in the new en-au directory
    console.log('Updating content...');
    await processDirectory(targetDir);
    
    console.log('Conversion completed successfully!');
  } catch (error) {
    console.error('An error occurred during conversion:', error);
    process.exit(1);
  }
}

main();
