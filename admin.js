import { addService, getServices } from './services.js';

const titleInput = document.getElementById('service-title');
const descriptionInput = document.getElementById('service-desc');
const imageInput = document.getElementById('service-imgFile');

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
    const newService = {
        title: titleInput.value,
        description: descriptionInput.value,
        image: imageInput.value
    };

    addService(newService.title, newService.description, newService.image);

    // Clear input fields after submission
    titleInput.value = '';
    descriptionInput.value = '';
    imageInput.value = '';

    displayServices();
});

function displayServices() {
    const servicesList = getServices();
    const serviceOutput = document.getElementById('service-output');
    serviceOutput.innerHTML = '';
    servicesList.forEach(service => {
        const serviceLi = document.createElement('li');
        const button = document.createElement('button');
        const img = document.createElement('img');
        const titleText = document.createElement('h1');
        const descText = document.createElement('p');
        const serviceDiv = document.createElement('div');

        titleText.textContent = service.title;
        descText.textContent = service.description;
        img.src = service.image;
        img.alt = service.title;

        img.id = "admin-service-img";
        button.id = "admin-service-btn";
        serviceDiv.id = "admin-service-div";
        titleText.id = "admin-service-title";
        descText.id = "admin-service-desc";


        serviceDiv.appendChild(img);
        serviceDiv.appendChild(button);
        serviceDiv.appendChild(titleText);
        serviceDiv.appendChild(descText);
        serviceLi.appendChild(serviceDiv);
        serviceOutput.appendChild(serviceLi);
    });
}