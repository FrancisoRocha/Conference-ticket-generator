// Drag and Drop functionality
const dropzone = document.querySelector('#dragDrop');
const fileInput = document.querySelector('#file-input');
const placeholderIcon = './assets/images/person.svg';

// Movile and Tablets
dropzone.addEventListener('click',() => fileInput.click());
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Utility function to prevent default browser behavior
function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}

// Preventing default browser behavior when dragging a file over the container
dropzone.addEventListener('dragover', preventDefaults);
dropzone.addEventListener('dragenter', preventDefaults);
dropzone.addEventListener('dragleave', preventDefaults);

// Handling dropping files into the area
dropzone.addEventListener('drop', handleDrop);

export function handleDrop(e) {
    e.preventDefault();

    // Getting the list of dragged files
    const files = e.dataTransfer.files;

    // Checking if there are any files
    if (files.length) {
        // Assigning the files to the hidden input from the first step
        fileInput.files = files;
        console.log('Files assigned:', files);

        // Processing the files for previews (next step)
        handleFiles(files);
        renderButtons();
    }
}

function handleFiles(files) {

    const previewContainer = document.querySelector('.icon__upload');
    const iconUpload = document.querySelector('.img__upload');
    const infoUpload = document.querySelector('.info__upload');

    // Limpiar estados anteriores
    const preview = document.querySelector('.previw__image')
    if(preview) preview.remove();
    infoUpload.classList.remove('error');

    if(files.length > 1){
        infoUpload.classList.add('error');
        if(iconUpload) iconUpload.style.display = 'block';
        infoUpload.textContent = 'Only one file can be uploaded';
        return;
    }

    for (const file of files) {
        // Initializing the FileReader API and reading the file
        const fileRender = new FileReader()
        fileRender.readAsDataURL(file);

        // Once the file has been loaded, fire the processing
        fileRender.onload = function (e) {
            const preview = document.createElement('img');

            if (isValidFileType(file)) {
                preview.src = e.target.result;
                if(iconUpload) iconUpload.style.display = 'none';
            } else {
                preview.src = placeholderIcon;
            }

            // Apply styling
            preview.classList.add('preview__image');
            previewContainer.append(preview);
        };

    }

}

function isValidFileType(file) {
    const validTypesFiles = ['image/jpeg', 'image/png'];
    return validTypesFiles.includes(file.type);
}

function renderButtons(){

    const buttonsRender = document.querySelector('.buttons');
    const textDrang = document.querySelector('.text__drag');

    if (buttonsRender) return;

    //Insert HTML || BUTTONS THE CHANGE FILE AND REMOVE FILE
    const divButtons = document.createElement('div');
    divButtons.classList.add('buttons');
    textDrang.style.display = 'none';
    divButtons.innerHTML = `
        <button class="button button__primary">Remove Image</button>
        <button class="button button__change">Change Image</button>
    `;
    dropzone.appendChild(divButtons);
    removeImage();
    changeImage();
}

//Remove Image
function removeImage(){

    const remove = document.querySelector('.button__primary');

    remove.addEventListener('click', (event) => {

        event.preventDefault();
        event.stopPropagation();

        const preview = document.querySelector('.preview__image');        
        if (preview) preview.remove();

        const iconUpload = document.querySelector('.img__upload');
        if (iconUpload) iconUpload.style.display = 'block';

        // Elimina los botones
        const buttonsRender = document.querySelector('.buttons');
        if (buttonsRender) buttonsRender.remove();
        const textDrang = document.querySelector('.text__drag');
        if (textDrang) textDrang.style.display = 'block';

    })

}

//Cambiar la Imagen
function changeImage(){

    const changesImages = document.querySelector('.button__change');

    changesImages.addEventListener('click', (event) => {

        // Limpiar estados anteriores
        const preview = document.querySelector('.preview__image')
        if(preview) preview.remove();

        event.preventDefault();
        event.stopPropagation();
        fileInput.click()
    })


}


