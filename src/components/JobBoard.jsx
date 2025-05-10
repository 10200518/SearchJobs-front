import { useEffect, useState} from 'react';
import FilterComponent from './FilterComponent';
import JobList from './JobList';

const JobBoard = ({ fetchUrl, rol }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        titulo:null,
        tipo: null,
        experiencia: null,
        modalidad: null,
        cargo: null,
        ciudad: null,
        sueldo: null
    });
    const [filteredJobs, setFilteredJobs] = useState([]);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch(`${fetchUrl}?page=${currentPage - 1}&size=${itemsPerPage}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(filters), 
                });

                const data = await res.json();
                setFilteredJobs(data.vacantes || []);
                setTotalPages(data.totalPage)
                
            } catch (error) {
                console.error('Error cargando vacantes:', error);
            }
        };
        fetchAllJobs();
    }, [filters,currentPage]); // vuelve a llamar si los filtros cambian


    return (
        <>  
            <FilterComponent  setFilters={setFilters}/>    
            <div class="content-container">
                <div className="jobs-container">
                    <div className="jobs-header">
                        <h2 className="jobs-title">Empleos disponibles</h2>
                        <div className="jobs-count">{filteredJobs.length} empleos encontrados</div>
                    </div>
                    <JobList
                        jobs={filteredJobs}
                        rol={rol}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </>
    );
};

export default JobBoard;