import { useEffect, useState } from 'react';
import FilterComponent from './FilterComponent';
import JobList from './JobList';

const JobBoard = () => {
    const [filters, setFilters] = useState({
        tipo: '',
        experiencia: '',
        modalidad: '',
        cargo: '',
        ciudad: '',
        sueldo: ''
    });
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/vacantes/listar?page=0&size=500');
                const data = await res.json();
                setAllJobs(data.vacantes || []);
                setFilteredJobs(data.vacantes || []);
            } catch (error) {
                console.error('Error cargando vacantes:', error);
            }
        };

        fetchAllJobs();
    }, []);

    const applyFilters = (activeFilters) => {
        setFilters(activeFilters);

        const matchesFilters = (job) => {
            const tipoMatch =
                !activeFilters.tipo || job.tipo?.toLowerCase() === activeFilters.tipo.toLowerCase();
            const experienciaMatch =
                !activeFilters.experiencia || job.experiencia?.toLowerCase() === activeFilters.experiencia.toLowerCase();
            const modalidadMatch =
                !activeFilters.modalidad || job.modalidad?.toLowerCase() === activeFilters.modalidad.toLowerCase();
            const cargoMatch =
                !activeFilters.cargo || job.cargo?.toLowerCase().includes(activeFilters.cargo.toLowerCase());
            const ciudadMatch =
                !activeFilters.ciudad || job.ciudad?.toLowerCase().includes(activeFilters.ciudad.toLowerCase());
            const sueldoMatch =
                !activeFilters.sueldo || job.sueldo >= parseFloat(activeFilters.sueldo);
            
            return tipoMatch && experienciaMatch && modalidadMatch && cargoMatch && ciudadMatch && sueldoMatch;

        };

        const result = allJobs.filter(matchesFilters);
        setFilteredJobs(result);
    };

    return (
        <>
            <FilterComponent onFilter={applyFilters} />
            <div className="jobs-container">
                <div className="jobs-header">
                    <h2 className="jobs-title">Empleos disponibles</h2>
                    <div className="jobs-count">{filteredJobs.length} empleos encontrados</div>
                </div>
                <JobList
                    totalItems={filteredJobs.length}
                    itemsPerPage={itemsPerPage}
                    jobs={filteredJobs}
                />
            </div>
        </>
    );
};

export default JobBoard;