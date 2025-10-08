// Drag and Drop functionality
const dropzone = document.querySelector('#dragDrop');
const fileInput = document.querySelector('#file-input');


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
    }
}

function handleFiles(files) {

    for (const file of files) {
        // Initializing the FileReader API and reading the file
        const fileRender = new FileReader()
        fileRender.readAsDataURL(file);

        // Once the file has been loaded, fire the processing
        fileRender.onload = function (e) {
            const preview = document.createElement('img');

            if (isValidFileType(file)) {
                preview.src = e.target.result;
            }

            // Apply styling
            preview.classList.add('preview__image');
            const previewContainer = document.querySelector('.icon__upload');
            previewContainer.append(preview);
        };

    }

}

function isValidFileType(file) {
    const validTypesFiles = ['image/jpeg', 'image/png'];
    return validTypesFiles.includes(file.type);
}
