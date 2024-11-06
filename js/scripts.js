document.addEventListener("DOMContentLoaded", function() {
    const titularSelect = document.getElementById("titular");
    const personaNaturalDiv = document.getElementById("personaNatural");
    const personaJuridicaDiv = document.getElementById("personaJuridica");
    const serviciosDiv = document.getElementById("servicios");
    const solicitudDiv = document.getElementById("solicitud");



    titularSelect.addEventListener("change", function() {
        const titularValue = titularSelect.value;

        // Mostrar u ocultar campos según la selección
        if (titularValue === "natural") {
            personaNaturalDiv.style.display = "block";            
            personaJuridicaDiv.style.display = "none";
            serviciosDiv.style.display = "block";
            solicitudDiv.style.display = "block";
            // Mostrar todos los elementos con animación
            personaNaturalDiv.classList.add("show");
            serviciosDiv.classList.add("show");
            solicitudDiv.classList.add("show");
        } else if (titularValue === "juridica") {
            personaJuridicaDiv.style.display = "block";
            personaNaturalDiv.style.display = "none";
            serviciosDiv.style.display = "block";
            solicitudDiv.style.display = "block";
            // Mostrar todos los elementos con animación
            personaJuridicaDiv.classList.add("show");
            serviciosDiv.classList.add("show");
            solicitudDiv.classList.add("show");
        } else {
            personaNaturalDiv.style.display = "none";
            personaJuridicaDiv.style.display = "none";
            serviciosDiv.style.display = "none";
            solicitudDiv.style.display = "none";
        }
    });
});
function limitInputLength(element, maxLength) {
    if (element.value.length > maxLength) {
        element.value = element.value.slice(0, maxLength);
    }
}
function limitToNumbers(element) {
    element.value = element.value.replace(/\D/g, ''); // Reemplaza cualquier carácter que no sea un dígito
}
