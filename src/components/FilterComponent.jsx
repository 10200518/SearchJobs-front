export default function FilterComponent({ filtersLocal, clearAllFilters, handleFilterChange, setFilters, rol }) {
  
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
              checked={filtersLocal.tipo === "Vacante"}
            />
            <span>Vacantes</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="tipo"
              value="Practica"
              onChange={handleFilterChange}
              checked={filtersLocal.tipo === "Practica"}
            />
            <span>Practicas</span>
          </label>
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Experiencia Minima</h4>
        <input
          type="number"
          name="experiencia"
          onChange={handleFilterChange}
          value={filtersLocal.experiencia || ""}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Sueldo Minimo</h4>
        <input
          type="number"
          name="sueldo"
          onChange={handleFilterChange}
          value={filtersLocal.sueldo || ""}
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
              value="Remoto"
              onChange={handleFilterChange}
              checked={filtersLocal.modalidad === "Remoto"}
            />
            <span>Remoto</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="modalidad"
              value="Presencial"
              onChange={handleFilterChange}
              checked={filtersLocal.modalidad === "Presencial"}
            />
            <span>Presencial</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="modalidad"
              value="Hibrido"
              onChange={handleFilterChange}
              checked={filtersLocal.modalidad === "Hibrido"}
            />
            <span>Híbrido</span>
          </label>
        </div>
      </div>

      {rol === "empresa" && (
        <div className="filter-group">
          <h4 className="filter-group-title">Estado</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="isActive"
                value="true"
                onChange={handleFilterChange}
                checked={filtersLocal.isActive == "true"}
              />
              <span>Activas</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="isActive"
                value="false"
                onChange={handleFilterChange}
                checked={filtersLocal.isActive == "false"}
              />
              <span>Desactivadas por Admin</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="activaPorEmpresa"
                value="false"
                onChange={handleFilterChange}
                checked={filtersLocal.isActive == "false"}
              />
              <span>Desactivadas por Empresa</span>
            </label>
          </div>
        </div>
      )}

      
      <div className="filter-group">
        <h4 className="filter-group-title">Cargo</h4>
        <input
          type="text"
          name="cargo"
          onChange={handleFilterChange}
          value={filtersLocal.cargo || ""}
          className="search-input"
        />
      </div>

      {/* Botón para eliminar todos los filtros */}
        <button
          className="btn btn-primary filter-search-button"
          onClick={() => {
            clearAllFilters(); // resetea filtros locales
            setFilters({
              titulo: null,
              tipo: "todos",
              experiencia: null,
              modalidad: null,
              cargo: null,
              isActive: true,
              ciudad: null,
              sueldo: null
            }); // fuerza los filtros globales a reiniciarse
          }}
        >
          Eliminar filtros
        </button>
    </div>
    
  );
}

