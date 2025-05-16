import '../styles/pages/JobCard.css';
import Paginacion from './Paginacion';


const JobList = ({ jobs, rol, setCurrentPage, currentPage, totalPages }) => {

  async function cambiarEstado(id, estado) {
    let mensaje = estado? "activar":"desactivar";
    const confirmacion = confirm(`¿Estás seguro de que deseas ${mensaje} esta vacante?`);
    if (!confirmacion) return;

    try {
      const response = await fetch(`http://localhost:8080/api/vacantes/estado/${id}?estado=${estado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });

      if (response.ok) {
        alert(`Exito al ${mensaje} la vacante`);
        location.reload();
      } else {
        alert(`Error al ${mensaje} la vacante.`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al intentar eliminar la vacante.");
    }
  }
  
  if (jobs.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-center p-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No se encontraron resultados
          </h2>
          <p className="text-gray-500">
            Intenta cambiar los filtros o revisar tu búsqueda.
          </p>
        </div>
    );
  }

  return (
    <div>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="card" key={job.nvacantes}>
            <a href={`/empleos/${job.nvacantes}`} >
              <div className="header">
                <div className="logo">
                  <img
                    src={"http://localhost:8080" + job.imagenEmpresa || "/placeholder.svg?height=80&width=80"}
                    alt={`${job.nameEmpresa} logo`}
                    width="60"
                    height="60"
                  />
                </div>
                <div className="info">
                  {!job.active && (
                    <span className=" top-4 left-4 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      {rol === "empresa"? "Desactivada por Admin": "Desactivada"}
                    </span>
                  )}

                  {!job.activaPorEmpresa && job.active && (
                    <span className=" top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      {rol === "empresa"? "Desactivada por ti": "Desactivada"}
                    </span>
                  )}

                  {job.candidatoPostulado && (
                    <span className=" top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      Postulado
                    </span>
                  )}

                  <h3 className="title">{job.titulo}</h3>
                  <p className="company">{job.nameEmpresa}</p>
                </div>
              </div>

              <div className="details">
                <div className="detail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{job.ciudad}</span>
                </div>
                <div className="detail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{job.tipo}</span>
                </div>
                <div className="detail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>{job.experiencia}</span>
                </div>
              </div>

              <div className="apply">
                <span className="apply-text">Ver detalles</span>
              </div>
            </a>
            
            {rol === 'empresa' && (
              <div className="apply">
                <a href={`/empleos/editar/${job.nvacantes}`} className="btn btn-edit">Editar</a>
                <button
                  onClick={() => cambiarEstado(job.nvacantes, !job.activaPorEmpresa)}
                  className={`px-4 py-2 font-semibold rounded-lg shadow ${
                    job.activaPorEmpresa
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {job.activaPorEmpresa ? "Desactivar" : "Activar"}
                </button>
              </div>
            )}
            
          </div>
        ))}
      </div>
      <Paginacion 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default JobList;

