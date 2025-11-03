const http = require('http');
const fs = require('fs');
const services = require('./services.js');
const formidable = require('formidable');

const port = 5000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === "/get-services" && req.method === "GET") {
        services.loadServicesFromFile();
        const servicesList = services.getServices();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(servicesList));
        console.log("Served services list");
    } else if (req.url === "/add-service" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { title, description, image } = JSON.parse(body);
            services.addService(title, description, image);
            services.saveServicesToFile();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Service added successfully" }));
            console.log("Added new service");
        });
    } else if (req.url === "/add_img" && req.method === "POST") {
        const form = new formidable.IncomingForm();
        
        // Set upload directory
        form.uploadDir = __dirname + '/services/img/';
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Upload failed' }));
                return;
            }
            
            const uploadedFile = files.fileupload;
            if (uploadedFile) {
                const oldPath = uploadedFile.filepath;
                const fileName = uploadedFile.originalFilename;
                const newPath = __dirname + '/services/img/' + fileName;
                
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'File move failed' }));
                        return;
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ imageUrl: `/services/img/${fileName}` }));
                    console.log("Image uploaded:", fileName);
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No file uploaded' }));
            }
        });
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Service API");
        console.log(`Received request for ${req.url}`);
    }
});

server.listen(port, function() {
    console.log(`Server running at http://localhost:${port}/`);
});
