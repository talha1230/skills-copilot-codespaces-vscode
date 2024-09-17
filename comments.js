//Create web server
//Load comments from file
//Add new comments
//Save comments to file
//Send response to client
//Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const commentsPath = path.join(__dirname, 'comments.json');
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/comments' && req.method === 'GET') {
        fs.readFile(commentsPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (parsedUrl.pathname === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            fs.readFile(commentsPath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                const comments = JSON.parse(data);
                const newComment = JSON.parse(body);
                comments.push(newComment);
                fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                        return;
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newComment));
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
//Load comments from file
//Add new comments
//Save comments to file
//Send response to client
//Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url =