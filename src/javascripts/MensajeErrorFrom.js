export async function manejarFormulario({ form, validateForm, buildData, endpointUrl, redirectUrl, metodo, tipo = "application/json" }) {
  limpiarErrores();

  if (!validateForm()) {
    alert("Por favor, complete los campos correctamente.");
    return;
  }

  try {
    const formData = new FormData(form);
    const data = buildData(formData);
    let response;

    if (tipo === "application/json") {
      response = await fetch(endpointUrl, {
        method: metodo,
        headers: {
          "Content-Type": tipo
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
    } else if (tipo === "multipart/form-data") {
      response = await fetch(endpointUrl, {
        method: metodo,
        body: formData,
        credentials: 'include'
      });
    } else {
      throw new Error("Tipo de contenido no soportado");
    }

    const responseData = await response.json();

    if (responseData.status === 201) {
      form.reset();
      alert(responseData.mensaje || "Formulario enviado correctamente");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } else if (responseData.errors) {
      mostrarErrores(responseData.errors);
    } else {
      alert(responseData.message || "Error desconocido");
    }

  } catch (error) {
    alert("Error al conectar con el servidor");
    console.error(error);
  }
}

function limpiarErrores() {
  const errorFields = document.querySelectorAll('.error-text');
  const errorInput = document.querySelectorAll('.error-input');
  errorInput.forEach(input => input.classList.remove("error-input"));
  errorFields.forEach(field => {
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
