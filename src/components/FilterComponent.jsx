import { useState } from 'react';

export default function FilterComponent({ onFilter}) {
  const [filters, setFilters] = useState({
    tipo: '',
    experiencia: '',
    modalidad: '',
    cargo: '',
    ciudad: '',
    sueldo: ''
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
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
            />
            <span>Vacantes</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="tipo"
              value="Practica"
              onChange={handleFilterChange}
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
            className="search-input"
          />
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Sueldo</h4>
          <input
            type="number"
            name="sueldo"
            onChange={handleFilterChange}
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
            />
            <span>Remoto</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="modalidad"
              value="Presencial"
              onChange={handleFilterChange}
            />
            <span>Presencial</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="modalidad"
              value="Hibrida"
              onChange={handleFilterChange}
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
            className="search-input"
          />
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Cargo</h4>
          <input
            type="text"
            name="ciudad"
            onChange={handleFilterChange}
            className="search-input"
          />
      </div>

      <button 
        className="btn btn-primary filter-search-button"
        onClick={() => onFilter(filters)}
      >
        Buscar por filtros
      </button>
    </div>
  );
};

