const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  let filePath = decodeURIComponent(url.parse(req.url).pathname);
  
  // Remove trailing slash
  if (filePath.endsWith('/') && filePath !== '/') {
    filePath = filePath.slice(0, -1);
  }
  
  // Handle root path
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // If the path doesn't end with .html, try to serve the .html file
  if (!filePath.endsWith('.html') && !filePath.includes('.')) {
    // Check if the file exists with .html extension
    const htmlPath = filePath + '.html';
    const fullPath = path.join(__dirname, htmlPath);
    
    if (fs.existsSync(fullPath)) {
      filePath = htmlPath;
    }
  }
  
  // If it's a directory, try to serve index.html
  if (!filePath.includes('.')) {
    const indexPath = filePath + '/index.html';
    const fullIndexPath = path.join(__dirname, indexPath);
    
    if (fs.existsSync(fullIndexPath)) {
      filePath = indexPath;
    }
  }
  
  const fullPath = path.join(__dirname, filePath);
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - File Not Found</h1>');
    return;
  }
  
  // Get file extension for content type
  const ext = path.extname(fullPath);
  let contentType = 'text/html';
  
  switch (ext) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    case '.webp':
      contentType = 'image/webp';
      break;
    case '.woff2':
      contentType = 'font/woff2';
      break;
  }
  
  // Read and serve the file
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('You can now access:');
  console.log(`- http://localhost:${PORT}/en-gb/`);
  console.log(`- http://localhost:${PORT}/en-gb/invoicing`);
  console.log(`- http://localhost:${PORT}/en-gb/bookkeeping`);
}); 