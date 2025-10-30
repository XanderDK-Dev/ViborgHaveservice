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
