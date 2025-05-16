export const manejarRespuesta = async (res) => {
  let data;
  try {
    try {
      data = await res.json();
    } catch (e) {
      data = {};
    }
    console.log("data: "+data.error)
    console.log("res: "+ res.status)

    if (res.status === 401) {
      if (data?.error === "TOKEN_EXPIRED") {
        alert("Tu sesión ha expirado.");
        window.location.href="http://localhost:8080/usuarios/cerrarSesion";
      } else {
        alert("No estás autenticado.");
      }
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
      alert(data.message || "Error desconocido");
      return;
    }

    // Si todo va bien
    return data;

  } catch (error) {
    console.error("Error de red:", error);
    alert("Ocurrió un error de red.");
  }

    

};


