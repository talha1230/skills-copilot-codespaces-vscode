// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file. Use the comments.html file from the previous exercise.

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('comments.html', (err, data) => {
    if (err) {
      throw err;
    }
    res.write(data);
    res.end();
  });
}).listen(3000);
console.log('Server is listening on port 3000');