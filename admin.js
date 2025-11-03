const titleInput = document.getElementById('service-title');
const descriptionInput = document.getElementById('service-desc');
const imageInput = document.getElementById('service-imgFile');
const image_upload_form = document.getElementById('image_upload_form');

let uploadedImage = '';

const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
    if(!imageInput.files[0]) {
        alert('Please select an image file to upload.');
        return;
    }


    try {
        let imageUrl = uploadImage();
        console.log('Image URL:', imageUrl);

        const newService = {
            title: titleInput.value,
            description: descriptionInput.value,
            image: imageUrl
        };

        requestAddService(newService.title, newService.description, newService.image);

        // Clear input fields after submission
        titleInput.value = '';
        descriptionInput.value = '';
        imageInput.value = '';

        displayServices();
    } catch (error) {
        console.error('Error uploading image:', error);
    }
});

async function uploadImage() {
    const options = {
        hostname: 'localhost',
        port: 5000,
    }

    let formData = new FormData();
    const file = imageInput.files[0];
    formData.append('image', file);
    let imageUrl = '';
    await fetch(`http://${options.hostname}:${options.port}/add_img`, {
        method: 'POST',
        body: formData
    });
        
}

async function requestServices() {
    const options = {
        hostname: 'localhost',
        port: 5000,
    }

    try {
        const response = await fetch(`http://${options.hostname}:${options.port}/get-services`, {
            method: 'GET'
        });
        const data = await response.json();
        console.log('Services fetched:', data);
        return data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}


function requestAddService(title, description, image) {
    const postData = JSON.stringify({ title, description, image });
    const options = {
        hostname: 'localhost',
        port: 5000,
    }

    fetch(`http://${options.hostname}:${options.port}/add-service`, {
        method: 'POST',
        headers: {},
        body: postData
    }).then(response => response.json())
        .then(data => {
            console.log('Service added:', data);
        })
        .catch(error => {
            console.error('Error adding service:', error);
        });
};

async function displayServices() {
    let servicesList = [];
    const serviceOutput = document.getElementById('service-output');
    serviceOutput.innerHTML = '';

    servicesList = await requestServices();
    console.log('Displaying services:', servicesList);

    if(!servicesList || servicesList.length === 0) {
        const noServiceMsg = document.createElement('p');
        noServiceMsg.textContent = "No services available.";
        serviceOutput.appendChild(noServiceMsg);
        return;
    }

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