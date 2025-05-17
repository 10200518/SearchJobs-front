import { manejarFormulario } from "./MensajeErrorFrom.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("vacanteForm");

  /* Campos que siempre deben venir completos */
  const requiredFields = [
    "nombre",
    "sectorEmpresa",
    "telefono",
    "nit",
    "descripcion",
    "sitioWeb",
  ];

  const validateForm = () => {
    for (const id of requiredFields) {
      const input = document.getElementById(id);
      if (!input || !input.value.trim()) {
        alert("Por favor completa todos los campos requeridos.");
        return false;
      }
    }
    return true;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(form);

    const empresaId = form.dataset.id; // <form id="vacanteForm" data-id="123">

    await manejarFormulario({
      form,
      validateForm,                
      buildData: () => formData,   
      endpointUrl: `http://localhost:8080/api/empresas/edit/${empresaId}`,
      redirectUrl: "/perfil/empresa",
      metodo: "PUT",
      tipo: "multipart/form-data",          
    });
  });
});
