document.addEventListener("DOMContentLoaded", function() {
    const titularSelect = document.getElementById("titular");
    const personaNaturalDiv = document.getElementById("personaNatural");
    const personaJuridicaDiv = document.getElementById("personaJuridica");

    titularSelect.addEventListener("change", function() {
        const titularValue = titularSelect.value;

        // Mostrar u ocultar campos según la selección
        if (titularValue === "natural") {
            personaNaturalDiv.style.display = "block";
            personaJuridicaDiv.style.display = "none";
        } else if (titularValue === "juridica") {
            personaJuridicaDiv.style.display = "block";
            personaNaturalDiv.style.display = "none";
        } else {
            personaNaturalDiv.style.display = "none";
            personaJuridicaDiv.style.display = "none";
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
