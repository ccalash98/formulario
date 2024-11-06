document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registroForm");
    const titularSelect = document.getElementById("titular");

    function updateRequiredFields() {
        // Si el titular es "natural", deshabilita los requerimientos de "jurídica" y viceversa
        const isNatural = titularSelect.value === "natural";
        
        // Campos para Persona Natural
        document.getElementById("Abonado").required = isNatural;
        document.getElementById("dni").required = isNatural;
        document.getElementById("apellidop").required = isNatural;
        document.getElementById("apellidom").required = isNatural;
        document.getElementById("nombres").required = isNatural;
        document.getElementById("fechaNacimiento").required = isNatural;

        // Campos para Persona Jurídica
        document.getElementById("codco").required = !isNatural;
        document.getElementById("ruc").required = !isNatural;
        document.getElementById("nombreEmpresa").required = !isNatural;
        document.getElementById("correoemp").required = !isNatural;
        document.getElementById("telefonoemp").required = !isNatural;
        document.getElementById("apellidoprep").required = !isNatural;
        document.getElementById("apellidomrep").required = !isNatural;
        document.getElementById("nombresrep").required = !isNatural;
        document.getElementById("dnirep").required = !isNatural;
        document.getElementById("telefonorep").required = !isNatural;
        document.getElementById("cargo").required = !isNatural;
    }

    // Actualiza los campos requeridos al cambiar el tipo de titular
    titularSelect.addEventListener("change", updateRequiredFields);
    updateRequiredFields();  // Llama a la función al cargar la página

    form.addEventListener("submit", function(e) {
        e.preventDefault();  // Evita el envío tradicional del formulario

        const titular = titularSelect.value;

        // Recoge los valores comunes del formulario (campos que se envían siempre)
        const formData = {
            titular: titular,
            correo: document.getElementById("correo").value,
            telefono: document.getElementById("telefono").value,
            abonado: document.getElementById("Abonado") ? document.getElementById("Abonado").value : "",            
            codco: document.getElementById("codco") ? document.getElementById("codco").value : "",
            dni: document.getElementById("dni") ? document.getElementById("dni").value : "",
            apellidop: document.getElementById("apellidop") ? document.getElementById("apellidop").value : "",
            apellidom: document.getElementById("apellidom") ? document.getElementById("apellidom").value : "",
            nombres: document.getElementById("nombres") ? document.getElementById("nombres").value : "",
            fechaNacimiento: document.getElementById("fechaNacimiento") ? document.getElementById("fechaNacimiento").value : "",
            ruc: document.getElementById("ruc") ? document.getElementById("ruc").value : "",
            nombreEmpresa: document.getElementById("nombreEmpresa") ? document.getElementById("nombreEmpresa").value : "",
            correoemp: document.getElementById("correoemp") ? document.getElementById("correoemp").value : "",
            telefonoemp: document.getElementById("telefonoemp") ? document.getElementById("telefonoemp").value : "",
            apellidoprep: document.getElementById("apellidoprep") ? document.getElementById("apellidoprep").value : "",
            apellidomrep: document.getElementById("apellidomrep") ? document.getElementById("apellidomrep").value : "",
            nombresrep: document.getElementById("nombresrep") ? document.getElementById("nombresrep").value : "",
            dnirep: document.getElementById("dnirep") ? document.getElementById("dnirep").value : "",
            telefonorep: document.getElementById("telefonorep") ? document.getElementById("telefonorep").value : "",
            cargo: document.getElementById("cargo") ? document.getElementById("cargo").value : "",
            nroco: document.getElementById("nroco") ? document.getElementById("nroco").value : "",
            tarifa: document.getElementById("tarifa") ? document.getElementById("tarifa").value : "",
            plan: document.getElementById("plan") ? document.getElementById("plan").value : "",
            direccion: document.getElementById("direccion") ? document.getElementById("direccion").value : "",
            nro: document.getElementById("nro") ? document.getElementById("nro").value : "",
            tarifan: document.getElementById("tarifan") ? document.getElementById("tarifan").value : "",
            plann: document.getElementById("plann") ? document.getElementById("plann").value : "",
            operacion: document.getElementById("operacion") ? document.getElementById("operacion").value : "",
            inicioservicio: document.getElementById("inicioservicio") ? document.getElementById("inicioservicio").value : ""
        };

        // Filtra los datos según el tipo de titular
        if (titular === "natural") {
            delete formData.ruc;
            delete formData.nombreEmpresa;
            delete formData.correoemp;
            delete formData.telefonoemp;
            delete formData.apellidoprep;
            delete formData.apellidomrep;
            delete formData.nombresrep;
            delete formData.dnirep;
            delete formData.telefonorep;
            delete formData.cargo;
            delete formData.codco;
        } else if (titular === "juridica") {
            delete formData.Abonado;
            delete formData.dni;
            delete formData.apellidop;
            delete formData.apellidom;
            delete formData.nombres;
            delete formData.fechaNacimiento;
        }

        // Envía los datos al Google Apps Script usando fetch
        fetch("https://script.google.com/macros/s/AKfycbzBwVmiz---HDyAUqAdguEshkD0hDorjiy-QKVIHQnsHEbS05HJNGssNFfN0LBhi6NzxA/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            mode: 'no-cors'  // Desactiva la verificación de CORS
        })
        .then(() => {
            alert("Datos enviados correctamente.");
            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error en el envío de los datos.");
        });        
    });
});
