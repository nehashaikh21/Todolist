var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;
document.getElementById('date').innerHTML = today;


//--------------------------------Adding and deleting Tasks-------------------------------------

function uid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//console.log(uid());

const defaultTask = document.getElementById('new-task-input');
const addButton = document.getElementById('button-addon2');
const list = document.getElementById('task-container');

//console.log(defaultTask.value);

function addTask (arr) {
    if(defaultTask.value === '') {
        alert('Fill in the Task!');
    } else {
        let newTask = defaultTask;
        //console.log(newTask.value)
        document.querySelector('#task-container').innerHTML +=
        `
        <div class="row border rounded p-3 d-flex align-items-center">
            <div class="col-10">
                <div class="input-group mb-3 p-3">
                    <div class="input-group-text">
                        <input class="form-check-input checkbox" id=${uid()} mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                    </div>
                    <input type="text" class="form-control input" value=${newTask.value} readonly aria-label="Text input with checkbox">
                </div>
            </div>
            <div class="col-1">
                <!--<button class="btn btn-outline-secondary mb-3 save-Button" id=${uid()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                    <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                </button>-->
                <button class="btn btn-outline-secondary mb-3 edit-Button" id=${uid()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
            </div>
            <div class="col-1">
                <button class="btn btn-outline-secondary mb-3 delete-Button" id=${uid()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </div>
        <div>
        `;
        //-----------------------Delete Button Functionality-------------------------

        const deleteButtons = document.querySelectorAll('.delete-Button');

        const deleteFunction = (id) => (e) => {
            const buttonToDelete = document.getElementById(id);
            buttonToDelete.parentElement.parentElement.remove();
        }

        deleteButtons.forEach(button => {
            const deleteFunctionId = deleteFunction(button.getAttribute('id'));
            button.addEventListener('click', deleteFunctionId);
        });

        //-----------------------Edit Button Functionality-------------------------

        const editButtons = document.querySelectorAll('.edit-Button');

        const editFunction = (id) => (e) => {
            const editButton = document.getElementById(id);
            let input = editButton.parentElement.parentElement.querySelector('.input');
            if(input.hasAttribute('readonly')) {
                input.removeAttribute('readonly');
                //console.log(editButton);
                editButton.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                    <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>`;
                //input.style.borderColor = 'red';
            } else {
                input.setAttribute('readonly', '');
                input.setAttribute('value', input.value);
                editButton.innerHTML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>`;
            }
        }

        editButtons.forEach(button => {
            const editFunctionId = editFunction(button.getAttribute('id'));
            button.addEventListener('click', editFunctionId);
            
        });

        //-----------------------Save Button Functionality------------------------------------

        /*const saveButtons = document.querySelectorAll('.save-Button');

        const saveFunction = (id) => (e) => {
            const buttonToSave = document.getElementById(id);
            let editedInput = buttonToSave.parentElement.parentElement.querySelector('.input');
            if(editedInput.value != ''){
                editedInput.setAttribute('readonly', ''); 
                editedInput.setAttribute('value', editedInput.value);
            }  
        }
        
        saveButtons.forEach(button => {
            const saveFunctionId = saveFunction(button.getAttribute('id'));
            button.addEventListener('click', saveFunctionId);
            
        });*/

        //-----------------------Finished Button Functionality-------------------------

        const finishButtons = document.querySelectorAll('.checkbox');

        const finishFunction = (id) => (e) => {
            const checkbox = document.getElementById(id);
            const inputField = checkbox.parentElement.parentElement.querySelector('.input');
            if(checkbox.checked == true) {
                inputField.style.textDecoration = 'line-through';
            } else {
                inputField.style.textDecoration = 'none';
            }
        }

        finishButtons.forEach(button => {
            const finishFunctionId = finishFunction(button.getAttribute('id'));
            button.addEventListener('click', finishFunctionId);
        });
    } 
}

addButton.addEventListener("click", addTask);