const scriptURL = "https://script.google.com/macros/s/AKfycbyjIoWHIX3bfKjwU5lyK12WazwEqlbYVlOXYVprPwMdFefhsRMSY9pRkyrBgNXbsKIB/exec";
const form = document.forms["submit-to-google-sheet"];
const parentSuccessMessage = document.querySelector('.parentSuccessMessage');
const submissionMessage = document.getElementById('submissionMessage'); 

form.addEventListener("submit", function(e) {
    // Tel input validation
    if (!validateTelInputs()){
        e.preventDefault();
        return;  
    }
    
    // Emergency contact validation
    if (!validateEmergencyContacts()){
        e.preventDefault();
        return;  
    }

    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            console.log("Success!", response);
            form.style.display = 'none';                      
            parentSuccessMessage.style.display = 'flex';     
            submissionMessage.style.display = 'flex';        
        })
        .catch((error) => console.error("Error!", error.message));
});


function validateInput(inputElement) {
   
    inputElement.addEventListener('input', function() {
        const value = parseInt(this.value, 10); 
        if (isNaN(value)) { 
            this.value = '';
            inputElement.focus(); // Add this line
        } else if (value > 100) { 
            this.value = '100';
            inputElement.focus(); // Add this line
        }
    });

    inputElement.addEventListener('keyup', function() {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3); 
            inputElement.focus(); // Add this line
        }
    });
}


const edadEncargadoInput = document.getElementById('edadEncargado');
const edadSubencargadoInput = document.getElementById('edadSubencargado');

validateInput(edadEncargadoInput);
validateInput(edadSubencargadoInput);


document.addEventListener('DOMContentLoaded', function() {

    function limitInputToNumbersAndLength(inputElement, maxLength) {
        inputElement.addEventListener('input', function() {
           
            this.value = this.value.replace(/[^0-9]/g, '');
    
            if (this.value.length > maxLength) {
                this.value = this.value.slice(0, maxLength);
                inputElement.focus(); 
            }
        });
    }

    const idsToRestrict = ['dpiEncargado', 'dpiSubencargado'];
    idsToRestrict.forEach(id => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            limitInputToNumbersAndLength(inputElement, 13); 
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    
    const telInputs = document.querySelectorAll('input[type="tel"]');
  
   
    telInputs.forEach(input => {
      input.addEventListener('input', formatTelInput);
    });
  
    function formatTelInput(e) {
      const value = e.target.value.replace(/\D/g, '').substring(0, 8); 
  
      
      if (value.length > 4) {
        e.target.value = value.substring(0, 4) + '-' + value.substring(4);
      } else {
        e.target.value = value;
      }
    }
  });
  

  function validateTelInputs() {
    const telInputs = document.querySelectorAll('input[type="tel"]');
    for (let input of telInputs) {
        // Exclude the mentioned IDs
        if (input.id !== "contactoEmergencia1Telefono" && input.id !== "contactoEmergencia2Telefono") {
            const value = input.value;
            if (value.length !== 9) {
                alert('Teléfono inválido, por favor confirmar. Se esperan 8 digitos. Ej. 5555-5555');
                input.focus();
                return false;  
            }
        }
    }
    return true;
}

  
function validateEmergencyContacts() {
    
    const name1 = document.getElementById('contactoEmergencia1Nombre');
    const relation1 = document.getElementById('contactoEmergencia1Parentesco');
    const tel1 = document.getElementById('contactoEmergencia1Telefono');

    if ((name1.value && (!relation1.value || !tel1.value)) || (relation1.value && (!name1.value || !tel1.value)) || (tel1.value && (!name1.value || !relation1.value))) {
        alert('Por favor complete toda la información del Contacto de Emergencia 1.');
        if(!name1.value) { name1.focus(); } 
        else if(!relation1.value) { relation1.focus(); } 
        else if(!tel1.value) { tel1.focus(); } 
        return false;
    }

    const name2 = document.getElementById('contactoEmergencia2Nombre');
    const relation2 = document.getElementById('contactoEmergenciaParentesco2');
    const tel2 = document.getElementById('contactoEmergencia2Telefono');

    if ((name2.value && (!relation2.value || !tel2.value)) || (relation2.value && (!name2.value || !tel2.value)) || (tel2.value && (!name2.value || !relation2.value))) {
        alert('Por favor complete toda la información del Contacto de Emergencia 2.');
        if(!name2.value) { name2.focus(); } 
        else if(!relation2.value) { relation2.focus(); } 
        else if(!tel2.value) { tel2.focus(); } 
        return false;
    }

    return true;  
}


