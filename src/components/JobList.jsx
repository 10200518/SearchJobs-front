import { useEffect, useState } from 'react';
import '../styles/pages/JobCard.css';

const JobList = ({ jobs, totalItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentJobs(jobs.slice(startIndex, endIndex));
  }, [currentPage, jobs, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="jobs-grid">
        {currentJobs.map((job) => (
          <a href={`/empleos/${job.nvacantes}`} className="card" key={job.nvacantes}>
            <div className="header">
              <div className="logo">
                <img src={job.imagenEmpresa || "/placeholder.svg?height=80&width=80"} alt={`${job.nameEmpresa} logo`} width="60" height="60" />
              </div>
              <div className="info">
                <h3 className="title">{job.titulo}</h3>
                <p className="company">{job.nameEmpresa}</p>
              </div>
            </div>

            <div className="details">
              <div className="detail">📍 <span>{job.ciudad}</span></div>
              <div className="detail">⏱️ <span>{job.tipo}</span></div>
              <div className="detail">🎓 <span>{job.experiencia}</span></div>
            </div>

            <div className="apply">
              <span className="apply-text">Ver detalles</span>
            </div>
          </a>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-button" onClick={handlePrev} disabled={currentPage === 1}>
          Anterior
        </button>

        <div className="pagination-numbers">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default JobList;

