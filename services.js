import fs from 'fs';
const fileName = 'services.json';

let services = [];

export function addService(title, desc, imgLocation) {
    const service = {
        title: title,
        description: desc,
        image: imgLocation
    };
    services.push(service);
}

export function getServices() {
    return services;
}

export function saveServicesToFile() {
    const location = './services';
    fs.writeFileSync(location + '/' + fileName, JSON.stringify(services, null, 2), 'utf-8');
    console.log(`Services saved to ${fileName}`);
}

export function loadServicesFromFile() {
     const location = './services';
    try {
        const data = fs.readFileSync(location + '/' + fileName, 'utf-8');
        services = JSON.parse(data);
        console.log(`Services loaded from ${fileName}`);
    } catch (error) {
        console.error(`Error loading services from ${fileName}:`, error);
        services = [];
    }
}
