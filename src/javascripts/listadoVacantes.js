const response = await fetch("http://localhost:8080/api/vacantes/listar", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const vacantes = data.vacantes || [];