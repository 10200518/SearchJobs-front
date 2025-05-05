const response = await fetch("http://localhost:8080/api/editar/listar", {
  method: "GET",
  credentials: "include", // si usas sesiones/cookies
  headers: {
    "Content-Type": "application/json",
  },
});

const data = await response.json();
console.log(data); // Revisa la estructura del JSON
const vacantes = data.vacantes || [];  // Accede a las vacantes dentro del mapa
