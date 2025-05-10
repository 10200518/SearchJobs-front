import { useEffect, useState } from 'react';
import '../styles/empleos/empleos.css';
import Paginacion from './Paginacion';

function UsuariosActivos() {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/listar/filtrados')
      .then((res) => res.json())
      .then((data) => setUsuarios(data.usuarios))
      .catch((err) => console.error('Error:', err));
  }, []);

  const totalItems = usuarios.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = usuarios.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(page);
      setFade(true);
    }, 200);
  };

  const banearUsuario = (idUsuario, motivo = 'Falta grave') => {
    fetch(`http://localhost:8080/api/admin/cambiar-estado/usuario?idUsuario=${idUsuario}&estado=false&comentario=${motivo}`, {
      method: 'POST', // Asegúrate de que este método coincida con el del backend
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al banear usuario');
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          // Recargar la lista de usuarios activos después de banear
          return fetch('http://localhost:8080/api/admin/listar/filtrados?estado=true'); // Solo usuarios activos
        }
      })
      .then((res) => res.json())
      .then((data) => setUsuarios(data.usuarios))
      .catch((err) => console.error('Error al banear el usuario:', err));
  };

  return (
    <div>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600 tab-button active"
            >
              Usuarios Activos ({usuarios.length})
            </button>
          </nav>
        </div>
      </div>

      <div
        className={`tab-content transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Fecha Registro</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Último Acceso</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers
                .filter(user => user.isActive === true)
                .map((user) => (
                  <tr key={user.idUsuario}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.correo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.rolPrinciapl === 'Candidato'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.rolPrinciapl}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{/* Fecha Registro */}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{/* Último Acceso */}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="mr-3 text-blue-600 hover:text-blue-900" href="/perfil/empresa" >Ver</button>
                      <button className="mr-3 text-red-600 hover:text-red-900" onClick={() => banearUsuario(user.idUsuario, 'Falta grave')}>
                        Banear
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="p-4">
            <Paginacion
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsuariosActivos;
