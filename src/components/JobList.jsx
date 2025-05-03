const JobList = ({ fetchUrl, totalItems, itemsPerPage, filters = {} }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: currentPage - 1,
          size: itemsPerPage
        });

        for (const key in filters) {
          const value = filters[key];
          if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, value);
          }
        }
        const res = await fetch(`${fetchUrl}?${queryParams.toString()}`);
        const data = await res.json();
        setJobs(data.vacantes || []);
      } catch (error) {
        console.error('Error cargando vacantes:', error);
      }
    };

    fetchJobs();
  }, [fetchUrl, currentPage, itemsPerPage, filters]);

  return (
    <div>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <a href={`/empleos/${job.nvacantes}`} className="card" key={job.nvacantes}>
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
        ))}
      </div>
      
      <Pagination 
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default JobList;
