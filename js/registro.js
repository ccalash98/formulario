document.addEventListener("DOMContentLoaded", function () {
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

    // Cargar la librería de autenticación de Google
    function authenticate() {
      return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/spreadsheets" })
        .then(function () {
          console.log("Signed in!");
        }, function (error) {
          console.error("Sign-in error", error);
        });
    }

    // Cargar la librería de API de Google Sheets
    function loadClient() {
      gapi.client.setApiKey('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');  // Pon tu API Key aquí
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
        .then(function () {
          console.log("GAPI client loaded for API");
        }, function (error) {
          console.error("Error loading GAPI client", error);
        });
    }
    // Cargar la librería de autenticación de Google
    function authenticate() {
        return new Promise((resolve, reject) => {
        gapi.load('auth2', function () {
            gapi.auth2.init({
            client_id: '',  // Usa tu propio Client ID de la consola de desarrolladores
            }).then(function () {
            const authInstance = gapi.auth2.getAuthInstance();
            authInstance.signIn({ scope: "https://www.googleapis.com/auth/spreadsheets" })
                .then(function () {
                console.log("Signed in!");
                resolve();  // Resuelve la promesa cuando la autenticación sea exitosa
                }, function (error) {
                console.error("Sign-in error", error);
                reject(error);  // Rechaza la promesa si hay un error
                });
            }, function (error) {
            console.error("Error initializing auth2", error);
            reject(error);
            });
        });
        });
    }
  

    // Evento de envío del formulario
    form.addEventListener("submit", function (e) {
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
      }

      // Autenticación y carga de cliente de la API de Google
      authenticate().then(function () {
        loadClient().then(function () {
          sendDataToSheet(formData);
        });
      });
    });
  });