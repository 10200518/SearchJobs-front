import { useEffect, useState} from 'react';
import FilterComponent from './FilterComponent';
import JobList from './JobList';
import FiltroSuperior from './FiltroSuperior';
import { manejarRespuesta } from "../javascripts/ManejarRespuesta";


const JobBoard = ({ fetchUrl, rol }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(0) 
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        titulo:null,
        tipo: "todos",
        experiencia: null,
        modalidad: null,
        isActive: null,
        activaPorEmpresa: null,
        cargo: null,
        ciudad: null,
        sueldo: null
    });
    const [filtersLocal, setFiltersLocal] = useState({
        titulo:null,
        tipo: "todos",
        experiencia: null,
        modalidad: null,
        isActive: null,
        activaPorEmpresa: null,
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

                const data = await manejarRespuesta(res);
                if(!data){return;}
                setFilteredJobs(data.vacantes || []);
                setTotalElement(data.totalElements)
                setTotalPages(data.totalPage)
                
            } catch (error) {
                console.error('Error cargando vacantes:', error);
            }
        };

        fetchAllJobs();
        console.log(filteredJobs)
    }, [filters,currentPage]); 

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFiltersLocal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEstadoChange = (event) => {
        const estadoSeleccionado = event.target.value;
        setFiltersLocal(prev => ({
            ...prev,
            estado: estadoSeleccionado
        }));

        const nuevoFiltro = {
            ...filtersLocal,
            estado: estadoSeleccionado, 
            isActive: undefined,
            activaPorEmpresa: undefined
        };

        switch (estadoSeleccionado) {
            case "activas":
            nuevoFiltro.isActive = true;
            nuevoFiltro.activaPorEmpresa = true;
            break;
            case "desactivadasAdmin":
            nuevoFiltro.isActive = false;
            break;
            case "pausadasEmpresa":
            nuevoFiltro.activaPorEmpresa = false;
            break;
            case "todas":
            break;
        }

        setFiltersLocal(nuevoFiltro);
        setCurrentPage(1);
    };


    const clearAllFilters = () => {
        setFiltersLocal({
            titulo:null,
            tipo: null,
            experiencia: null,
            isActive: null,
            activaPorEmpresa: null,
            modalidad: null,
            cargo: null,
            ciudad: null,
            sueldo: null
        });
    };

    return (
        <>  
            <div className="page-header">
                <FiltroSuperior 
                    filtersLocal={filtersLocal} 
                    handleFilterChange={handleFilterChange}
                    setFilters={setFilters}
                />
            </div>
            <div className="content-container">
                <FilterComponent  
                    filtersLocal={filtersLocal} 
                    clearAllFilters={clearAllFilters}
                    handleFilterChange={handleFilterChange}
                    setFilters={setFilters} 
                    rol={rol}
                    handleEstadoChange={handleEstadoChange}
                />    
                <div className="jobs-container">
                    <div className="jobs-header">
                        <h2 className="jobs-title">Empleos disponibles</h2>
                        <div className="jobs-count">{totalElement} empleos encontrados</div>
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