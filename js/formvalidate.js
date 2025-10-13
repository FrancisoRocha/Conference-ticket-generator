
const form = document.querySelector('.form__ticket');
const fileInput = document.querySelector('#file-input');
const formName = document.querySelector('#name');
const formEmail = document.querySelector('#email');
const messageError = document.createElement('DIV');
const changeMessage = document.querySelector('.info__upload')

export function validateForm() {

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        let isValid = true;
        const files = fileInput.files;
        const maxSize = 500 * 1024 // 500KB en bytes

        // Validar la zona del Drag and Drop
        if (!files || files.length === 0) {
            isValid = false;
        } else if (files[0].size > maxSize) {
            isValid = false;
        }

        const icon = isValid
            ? '<img src="./assets/images/icon-info.svg" class="icon__info">'
            : '<img src="./assets/images/infoError.svg" class="icon__info">';

        changeMessage.classList.toggle('error', !isValid);
        changeMessage.innerHTML = `
            ${icon}
            <p class='error__message'>
                ${isValid
                    ? 'Upload your photo (JPG or PNG, max size: 500KB).'
                    : (!files || files.length === 0)
                    ? 'File too large. Please upload a photo under 500KB.'
                    : 'Please upload a photo (JPG or PNG, max size: 500KB).'}
            </p>
        `;


        //GENERATE TICKET
        if(isValid){
            console.log('Ticket Generado')
        }
    })
}


    validateForm();

