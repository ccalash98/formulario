document.addEventListener("DOMContentLoaded", function() {
    const titularSelect = document.getElementById("titular");
    const personaNaturalDiv = document.getElementById("personaNatural");
    const personaJuridicaDiv = document.getElementById("personaJuridica");
    const serviciosDiv = document.getElementById("servicios");
    const solicitudDiv = document.getElementById("solicitud");

    titularSelect.addEventListener("change", function() {
        const titularValue = titularSelect.value;

        // Resetear "required" de todos los campos antes de mostrar/ocultar
        resetRequiredFields();

        // Mostrar u ocultar campos según la selección
        if (titularValue === "natural") {
            personaNaturalDiv.style.display = "block";            
            personaJuridicaDiv.style.display = "none";
            serviciosDiv.style.display = "block";
            solicitudDiv.style.display = "block";
            setRequiredFields(personaNaturalDiv); // Configura los campos requeridos en Persona Natural

        } else if (titularValue === "juridica") {
            personaJuridicaDiv.style.display = "block";
            personaNaturalDiv.style.display = "none";
            serviciosDiv.style.display = "block";
            solicitudDiv.style.display = "block";
            setRequiredFields(personaJuridicaDiv); // Configura los campos requeridos en Persona Jurídica

        } else {
            personaNaturalDiv.style.display = "none";
            personaJuridicaDiv.style.display = "none";
            serviciosDiv.style.display = "none";
            solicitudDiv.style.display = "none";
        }
    });

    function resetRequiredFields() {
        const requiredFields = document.querySelectorAll("[required]");
        requiredFields.forEach(field => field.required = false);
    }

    function setRequiredFields(container) {
        const fields = container.querySelectorAll("input, select");
        fields.forEach(field => {
            if (field.hasAttribute("data-required")) {
                field.required = true;
            }
        });
    }
});

// Limitar la longitud de entrada y restringir a solo números
function limitInputLength(element, maxLength) {
    if (element.value.length > maxLength) {
        element.value = element.value.slice(0, maxLength);
    }
}
function limitToNumbers(element) {
    element.value = element.value.replace(/\D/g, ''); // Reemplaza cualquier carácter que no sea un dígito
}
