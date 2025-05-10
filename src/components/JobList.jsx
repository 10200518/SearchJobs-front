import '../styles/pages/JobCard.css';
import Paginacion from './Paginacion';


const JobList = ({ jobs, rol, setCurrentPage, currentPage, totalPages }) => {

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
          <div className="card">
            <a href={`/empleos/${job.nvacantes}`}  key={job.nvacantes}>
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
                <button href={`/empleos/eliminbuttonr/${job.nvacantes}`} className="btn btn-delete">Eliminar</button>
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

