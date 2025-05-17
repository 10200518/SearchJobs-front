import { manejarFormulario } from "./MensajeErrorFrom.js";
import { API_URL } from './Api.js';

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
        await Swal.fire({ text: "Por favor completa todos los campos requeridos.", icon: 'info' });        return false;
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
      endpointUrl: `${API_URL}/api/empresas/edit/${empresaId}`,
      redirectUrl: "/perfil/empresa",
      metodo: "PUT",
      tipo: "multipart/form-data",          
    });
  });
});
