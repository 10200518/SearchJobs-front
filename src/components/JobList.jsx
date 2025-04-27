import React, { useState, useEffect } from 'react';
import '../styles/pages/JobCard.css';

const JobList = ({ totalItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/vacantes/listar?page=${currentPage - 1}&size=${itemsPerPage}`);
        const data = await res.json();
        setJobs(data.vacantes || []);
      } catch (error) {
        console.error('Error cargando vacantes:', error);
      }
    };

    fetchJobs();
  }, [currentPage, itemsPerPage]);

  const handleNext = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);  // ✅ Ya no uses onPageChange
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);  // ✅ Ya no uses onPageChange
    }
  };

  return (
    <div>
      <div className="jobs-grid">
        {jobs.map((job) => (
         
          <a href={`/empleos/${job.nvacantes}`} class="card">
            <div class="header">
              <div class="logo">
                <img src={job.imagenEmpresa || "/placeholder.svg?height=80&width=80"} alt={`${job.nameEmpresa} logo`} width="60" height="60" />
              </div>
              <div class="info">
                <h3 class="title">{job.titulo}</h3>
                <p class="company">{job.nameEmpresa}</p>
              </div>
            </div>
          
            <div class="details">
              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{job.ciudad}</span>
              </div>
              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{job.tipo}</span>
              </div>
              <div class="detail">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>{job.experiencia}</span>
              </div>
            </div>
          
            <div class="apply">
              <span class="apply-text">Ver detalles</span>
            </div>
          </a>
          
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <div className="pagination-numbers">
          {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default JobList;
