import { useState } from 'react';

export default function FilterComponent({ setFilters }) {
  const [filterslocal, setFiltersLocal] = useState({
    tipo: null,
    experiencia: null,
    modalidad: null,
    cargo: null,
    ciudad: null,
    sueldo: null
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFiltersLocal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para resetear todos los filtros
  const clearAllFilters = () => {
    setFiltersLocal({
      titulo:null,
      tipo: null,
      experiencia: null,
      modalidad: null,
      cargo: null,
      ciudad: null,
      sueldo: null
    });
  };

  return (
    <>
      {/* buscador superior */}
      <div className="search-container">
        <form className="search-form">
          <div className="search-input-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            
            <input
              type="text"
              placeholder="Titulo de la vacante"
              name='titulo'
              onChange={handleFilterChange}
              value={filterslocal.titulo || ""}
              className="search-input"  
            />
          </div>
          <div className="search-input-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="search-icon"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              placeholder="Ciudad"
              name="ciudad"
              onChange={handleFilterChange}
              value={filterslocal.ciudad || ""}
              className="search-input"
            />
          </div>
          <button type="submit" className="btn btn-primary search-button" 
            onClick={() => setFilters(filterslocal)}
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <h4 className="filter-group-title">Tipo de empleo</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="tipo"
                value="Vacante"
                onChange={handleFilterChange}
                checked={filterslocal.tipo === "Vacante"}
              />
              <span>Vacantes</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="tipo"
                value="Practica"
                onChange={handleFilterChange}
                checked={filterslocal.tipo === "Practica"}
              />
              <span>Practicas</span>
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h4 className="filter-group-title">Experiencia</h4>
          <input
            type="number"
            name="experiencia"
            onChange={handleFilterChange}
            value={filterslocal.experiencia || ""}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <h4 className="filter-group-title">Sueldo</h4>
          <input
            type="number"
            name="sueldo"
            onChange={handleFilterChange}
            value={filterslocal.sueldo || ""}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <h4 className="filter-group-title">Modalidad</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="modalidad"
                value="Remota"
                onChange={handleFilterChange}
                checked={filterslocal.modalidad === "Remota"}
              />
              <span>Remoto</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="modalidad"
                value="Presencial"
                onChange={handleFilterChange}
                checked={filterslocal.modalidad === "Presencial"}
              />
              <span>Presencial</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="modalidad"
                value="Hibrida"
                onChange={handleFilterChange}
                checked={filterslocal.modalidad === "Hibrida"}
              />
              <span>Híbrido</span>
            </label>
          </div>
        </div>
        
        <div className="filter-group">
          <h4 className="filter-group-title">Cargo</h4>
          <input
            type="text"
            name="cargo"
            onChange={handleFilterChange}
            value={filterslocal.cargo || ""}
            className="search-input"
          />
        </div>

        {/* Botón para aplicar filtros
        <button
          className="btn btn-primary filter-search-button"
          
        >
          Buscar por filtros
        </button><br /> */}

        {/* Botón para eliminar todos los filtros */}
        <button
          className="btn btn-primary filter-search-button"
          onClick={() => {clearAllFilters(); setFilters(filterslocal)} }
        >
          Eliminar filtros
        </button>
      </div>
    </>
  );
}

