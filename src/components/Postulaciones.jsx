import { useEffect, useState } from 'react';
import Paginacion from './Paginacion';

const Postulaciones = ({ itemsPerPage = 10 }) => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPostulaciones = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/postulados/lista/candidato?page=${page - 1}&size=${itemsPerPage}`, {
        credentials: 'include',
      });

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
        fetchPostulaciones(currentPage); // recargar la lista
      } else {
        throw new Error("No se pudo cancelar la postulación.");
      }
    } catch (error) {
      console.error("❌ Error al cancelar postulación:", error);
      alert("❌ Ocurrió un error al cancelar la postulación.");
    }
  };


  if(loading){
    return <p>Cargando postulaciones...</p>
  }
  if(!loading && postulaciones.length === 0 ){
    return(
      <div>
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v1m0 14v1m8-8h-1M5 12H4m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.021 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
            <p className="text-lg font-semibold">No tienes postulaciones aún</p>
            <p className="text-sm text-gray-500 mt-1">
              Una vez te postules a vacantes, aparecerán aquí.
            </p>
          </div>
      </div>
    );
  }


  return (
    <div>
      {!loading && (
        <>
          <table className="tabla">
            <thead>
              <tr>
                <th>Vacante</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {postulaciones.map((p) => (
                <tr key={p.nPostulacion}> 
                  <td>{p.vacante.titulo}</td>
                  <td>{p.fechaPostulacion || '-'}</td>
                  <td>{p.estado || 'Pendiente'}</td>
                  
                  <td className="space-x-2">
                    <button
                      onClick={() => irADetalleVacante(p.vacante.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Ver Vacante
                    </button>
                    <button
                      onClick={() => eliminarPostulacion(p.nPostulacion)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
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
