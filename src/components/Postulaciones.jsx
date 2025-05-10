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
                <tr key={p.id}>
                  <td>{p.vacante.titulo}</td>
                  <td>{p.fechaPostulacion || '-'}</td>
                  <td>{p.estado || 'Pendiente'}</td>
                  <td>
                    <button onClick={() => irADetalleVacante(p.vacante.id)}>Ver Vacante</button>
                    <button onClick={() => alert('Función de cancelar aún no implementada')}>Cancelar</button>
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
