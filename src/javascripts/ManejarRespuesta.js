export const manejarRespuesta = async (res) => {
  let data;
  try {
    try {
      data = await res.json();
    } catch (e) {
      data = {};
    }

    if (res.status === 401) {
      if (data?.error === "TOKEN_EXPIRED") {
        Swal.fire({ text: "Tu sesión ha expirado.", icon: 'error' });        window.location.href="http://localhost:8080/usuarios/cerrarSesion";
      } else {
        Swal.fire({ text: "No estás autenticado.", icon: 'error' });      }
      window.location.href="http://localhost:8080/usuarios/cerrarSesion";

      // window.location.href = "/login";
      data= null
      return;
    }

    if (res.status === 403) {
      console.log("No autorizado")
      window.location.href = "/404";
      return;
    }

    if (!res.ok) {
      Swal.fire({ text: data.message || "Error desconocido", icon: 'error' });      return;
    }

    // Si todo va bien
    return data;

  } catch (error) {
    console.error("Error de red:", error);
    Swal.fire({ text: "Ocurrió un error de red.", icon: 'error' });  }
};


export default manejarRespuesta;
