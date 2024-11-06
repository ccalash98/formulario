document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();  // Evita el envío tradicional del formulario

        // Recoge los valores de los campos del formulario
        const formData = {
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            direccion: document.getElementById("direccion").value,
            documento: document.getElementById("documento").value,
            fecha_nacimiento: document.getElementById("fechaNacimiento").value,
            tipo_titular: document.getElementById("titular").value,
            nombre_empresa: document.getElementById("nombreEmpresa") ? document.getElementById("nombreEmpresa").value : ""
        };

        // Envía los datos al Google Apps Script usando fetch
        fetch("https://script.google.com/macros/s/AKfycbwPKY016bR7PxISiJK6SfKyvkSV1gOcnwQ19IrMePKaA8Au6MxQf3dALEvPoL2mcNwa1Q/exec", {  // Reemplaza con tu URL del Web App
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                alert("Registro exitoso");
                // Aquí puedes realizar alguna acción adicional, como limpiar el formulario
            } else {
                alert("Hubo un error al registrar");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error en el envío de los datos.");
        });
    });
});
