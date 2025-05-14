import { useEffect, useState } from 'react';
import Paginacion from './Paginacion';

const Postulaciones = ({ itemsPerPage = 10 }) => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filtros
  const [estado, setEstado] = useState('');
  const [fechaMinima, setFechaMinima] = useState('');
  const [tituloVacante, setTituloVacante] = useState('');
  const [empresa, setEmpresa] = useState('');

  const fetchPostulaciones = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/postulados/lista/candidato?page=${page - 1}&size=${itemsPerPage}&estado=${estado}&fechaMinima=${fechaMinima}&tituloVacante=${tituloVacante}&empresa=${empresa}`,
        { credentials: 'include' }
      );
      if (!res.ok) throw new Error('Error al obtener postulaciones');
      const data = await res.json();
      setPostulaciones(data.postulados);
      setTotalPages(data.totalPage);
    } catch (error) {
      console.error('❌ Error al cargar postulaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostulaciones(currentPage);
  }, [currentPage]);

  const buscar = () => {
    setCurrentPage(1);
    fetchPostulaciones(1);
  };

  const limpiarFiltros = () => {
    setEstado('');
    setFechaMinima('');
    setTituloVacante('');
    setEmpresa('');
    setCurrentPage(1);
    fetchPostulaciones(1);
  };

  const irADetalleVacante = (id) => {
    window.location.href = `/empleos/${id}`;
  };

  const eliminarPostulacion = async (nPostulacion) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas cancelar esta postulación?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:8080/api/postulados/delete/${nPostulacion}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 204) {
        alert("✅ Postulación cancelada exitosamente.");
        fetchPostulaciones(currentPage);
      } else {
        throw new Error("No se pudo cancelar la postulación.");
      }
    } catch (error) {
      console.error("❌ Error al cancelar postulación:", error);
      alert("❌ Ocurrió un error al cancelar la postulación.");
    }
  };

  return (
    <div>
      {/* Filtros */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrar Postulaciones</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            value={tituloVacante}
            onChange={(e) => setTituloVacante(e.target.value)}
            placeholder="Filtrar por Vacante"
            className="px-4 py-2 border rounded-lg flex-1 min-w-[200px]"
          />
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Filtrar por Empresa"
            className="px-4 py-2 border rounded-lg flex-1 min-w-[200px]"
          />
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="px-4 py-2 border rounded-lg flex-1 min-w-[200px]"
          >
            <option value="">Filtrar por Estado</option>
            <option value="Espera">En Espera</option>
            <option value="Aceptada">Aceptada</option>
            <option value="Rechazada">Rechazada</option>
          </select>
          <input
            type="date"
            value={fechaMinima}
            onChange={(e) => setFechaMinima(e.target.value)}
            className="px-4 py-2 border rounded-lg flex-1 min-w-[200px]"
          />
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={buscar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Buscar
          </button>
          <button
            onClick={limpiarFiltros}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando postulaciones...</p>
      ) : postulaciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1m8-8h-1M5 12H4m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.021 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <p className="text-lg font-semibold">No tienes postulaciones aún</p>
          <p className="text-sm text-gray-500 mt-1">Una vez te postules a vacantes, aparecerán aquí.</p>
        </div>
      ) : (
        <>
          {/* Tabla */}
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-gray-600">Vacante</th>
                <th className="px-6 py-3 text-left text-gray-600">Fecha</th>
                <th className="px-6 py-3 text-left text-gray-600">Estado</th>
                <th className="px-6 py-3 text-left text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {postulaciones.map((p) => (
                <tr key={p.nPostulacion} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{p.vacante.titulo}</td>
                  <td className="px-6 py-4 text-gray-800">{p.fechaPostulacion || '-'}</td>
                  <td className="px-6 py-4 text-gray-800">{p.estado || 'Espera'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => irADetalleVacante(p.vacante.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Ver Vacante
                    </button>
                    <button
                      onClick={() => eliminarPostulacion(p.nPostulacion)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginacion
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Postulaciones;
