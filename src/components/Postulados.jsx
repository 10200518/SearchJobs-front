import { useEffect, useState } from 'react';
import Paginacion from './Paginacion';

const Postulados = ({ vacanteId, itemsPerPage = 10 }) => {
  const [postulados, setPostulados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPostulados = async (currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/postulados/lista/${vacanteId}?page=${currentPage - 1}&size=${itemsPerPage}`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Error al obtener postulados');

      const data = await res.json();
      setPostulados(data.postulados);
      setTotalPages(data.totalPage);
    } catch (error) {
      console.error('❌ Error al cargar postulados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vacanteId) fetchPostulados(currentPage);
  }, [vacanteId, currentPage]);

  const abrirChat = async (candidatoId, vacanteId) => {
    try {
      const response = await fetch('http://localhost:8080/api/chats/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidatoId, vacanteId }),
      });

      if (!response.ok) throw new Error('Error al crear o buscar el chat');

      const chat = await response.json();
      window.location.href = `/chat/${chat.id}`;
    } catch (err) {
      console.error('Error al abrir el chat:', err);
      alert('No se pudo abrir el chat.');
    }
  };

  const actualizarEstadoPostulacion = async (nPostulacion, nuevoEstado) => {
    const confirmar = confirm(`¿Seguro que deseas marcar esta postulación como "${nuevoEstado}"?`);
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:8080/api/postulados/edit/${nPostulacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) throw new Error('Error al actualizar estado');

      alert(`Postulación ${nuevoEstado.toLowerCase()} correctamente`);
      fetchPostulados(currentPage); 
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Ocurrió un error al actualizar la postulación');
    }
  };


  return (
    <div>
      {loading && <p>Cargando postulados...</p>}

      {!loading && (
        <>
          <table className="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Vacante</th>
                <th>Fecha de postulación</th>
                <th>Estado</th>
                <th>Currículum Vitae</th>
                <th>Perfil</th>
                <th>Chat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postulados.map((postulado) => (
                <tr key={postulado.candidato.id}>
                  <td>{postulado.candidato.nombre}</td>
                  <td>{postulado.vacante.titulo}</td>
                  <td>{postulado.fechaPostulacion || '-'}</td>
                  <td>{postulado.estado || 'Pendiente'}</td>
                  <td>
                    <a
                      href={postulado.candidato.curriculo}
                      target="_blank"
                      className="text-blue-500 hover:text-blue-600 underline font-medium"
                    >
                      Ver CV
                    </a>
                  </td>
                  <td>
                    <a
                      href={`/perfil/candidato/${postulado.candidato.id}?nPostulacion=${postulado.nPostulacion}`}
                      className="text-blue-500 hover:text-blue-600 underline font-medium"
                    >
                      Ver perfil
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => abrirChat(postulado.candidato.id, postulado.vacante.id)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded-lg transition duration-200"
                    >
                      Abrir chat
                    </button>
                  </td>
                  <td className="flex flex-col gap-2">
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded-lg transition duration-200"
                      onClick={() => actualizarEstadoPostulacion(postulado.nPostulacion, "Rechazada")}
                    >
                      Rechazar
                    </button>
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 px-3 rounded-lg transition duration-200"
                      onClick={() => actualizarEstadoPostulacion(postulado.nPostulacion, "Aceptada")}
                    >
                      Aceptar
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

export default Postulados;
