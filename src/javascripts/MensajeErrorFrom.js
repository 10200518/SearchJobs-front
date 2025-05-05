
export async function manejarFormulario({ form, validateForm, buildData, endpointUrl, redirectUrl }) {
    limpiarErrores();
  
    const formData = new FormData(form);
    const data = buildData(formData);
  
    if (validateForm()) {
      try {
        const response = await fetch(endpointUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
  
        if (response.ok && response.status === 201) {
          form.reset();
          alert(responseData.mensaje || "Formulario enviado correctamente");
          if (redirectUrl) {
            window.location.href = redirectUrl;
            alert("redireccion")
          }
        } else if (response.status === 400 && responseData.errors) {
          mostrarErrores(responseData.errors);
        } else {
          alert(responseData.message || "Error desconocido");
        }
      } catch (error) {
        alert("Error al conectar con el servidor");
        console.log(error);
      }
    } else {
      alert("Por favor, complete los campos correctamente.");
    }
  }
  
  function limpiarErrores() {
    const errorFields = document.querySelectorAll('.error-text');
    const errorInput = document.querySelectorAll('.error-input');
    errorInput.forEach(input => input.classList.remove("error-input"));
    errorFields.forEach((field) => {
      field.textContent = "";
      field.classList.add('hidden');
    });
  }
  
  function mostrarErrores(errors) {
    for (let fieldName in errors) {
      const field = document.querySelector(`[name="${fieldName}"]`);
      const labelError = document.getElementById(`error-${fieldName}`);
      if (field && labelError) {
        field.classList.add('error-input');
        labelError.classList.remove("hidden");
        labelError.textContent = errors[fieldName];
      }
    }
  }

  
