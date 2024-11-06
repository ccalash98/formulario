document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();  // Evita el envío tradicional del formulario

        let valid = true;
        let mensajeError = "";

        // Limpia los bordes rojos antes de realizar una nueva validación
        resetErrorBorders();

        // Valida los campos según el tipo de titular
        const titular = document.getElementById("titular").value;

        // Validación de campos comunes
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        if (!correo || !telefono) {
            valid = false;
            mensajeError += "Correo y teléfono son obligatorios.\n";
            addErrorBorder("correo");
            addErrorBorder("telefono");
        }

        // Si es Persona Natural, valida los campos adicionales
        if (titular === "natural") {
            const abonado = document.getElementById("Abonado").value;
            const dni = document.getElementById("dni").value;
            const apellidop = document.getElementById("apellidop").value;
            const apellidom = document.getElementById("apellidom").value;
            const nombres = document.getElementById("nombres").value;
            const fechaNacimiento = document.getElementById("fechaNacimiento").value;

            if (!abonado || !dni || !apellidop || !apellidom || !nombres || !fechaNacimiento) {
                valid = false;
                mensajeError += "Todos los campos de Persona Natural son obligatorios.\n";
                addErrorBorder("Abonado");
                addErrorBorder("dni");
                addErrorBorder("apellidop");
                addErrorBorder("apellidom");
                addErrorBorder("nombres");
                addErrorBorder("fechaNacimiento");
            }
        }

        // Si es Persona Jurídica, valida los campos adicionales
        if (titular === "juridica") {
            const ruc = document.getElementById("ruc").value;
            const nombreEmpresa = document.getElementById("nombreEmpresa").value;
            const correoemp = document.getElementById("correoemp").value;
            const telefonoemp = document.getElementById("telefonoemp").value;
            const apellidoprep = document.getElementById("apellidoprep").value;
            const apellidomrep = document.getElementById("apellidomrep").value;
            const nombresrep = document.getElementById("nombresrep").value;
            const dnirep = document.getElementById("dnirep").value;
            const telefono_rep = document.getElementById("telefono_rep").value;
            const cargo = document.getElementById("cargo").value;

            if (!ruc || !nombreEmpresa || !correoemp || !telefonoemp || !apellidoprep || !apellidomrep || !nombresrep || !dnirep || !telefono_rep || !cargo) {
                valid = false;
                mensajeError += "Todos los campos de Persona Jurídica son obligatorios.\n";
                addErrorBorder("ruc");
                addErrorBorder("nombreEmpresa");
                addErrorBorder("correoemp");
                addErrorBorder("telefonoemp");
                addErrorBorder("apellidoprep");
                addErrorBorder("apellidomrep");
                addErrorBorder("nombresrep");
                addErrorBorder("dnirep");
                addErrorBorder("telefono_rep");
                addErrorBorder("cargo");
            }
        }

        // Si todo está bien, llama al script de registro
        if (valid) {
            // Llamamos a la función en registro.js para enviar los datos
            enviarFormulario();  // Llama al archivo `registro.js`
        } else {
            // Muestra el mensaje de error si algún campo falta
            alert(mensajeError);
        }
    });

    // Función para agregar el borde rojo a los campos vacíos
    function addErrorBorder(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.border = "2px solid red";
        }
    }

    // Función para quitar el borde rojo al limpiar los errores
    function resetErrorBorders() {
        const fields = document.querySelectorAll("#registroForm input, #registroForm select, #registroForm textarea");
        fields.forEach(field => {
            field.style.border = "";
        });
    }
});
