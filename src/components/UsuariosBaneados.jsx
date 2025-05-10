import { useEffect, useState } from 'react';
import '../styles/empleos/empleos.css';
import Paginacion from './Paginacion';

function UsuariosBaneados() {
  const [usuarios, setusuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/listar/filtrados?estado=false') // Asegúrate que la API devuelva los usuarios baneados
      .then((res) => res.json())
      .then((data) => setusuarios(data.usuarios))
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
  

  return (
    <div>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600 tab-button active"
            >
              Usuarios Baneados ({usuarios.length})
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
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Baneo</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Motivo</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers
              .filter(user => user.isActive === false)
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
                  <td className="px-6 py-4 whitespace-nowrap">{user.fechaBaneo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.comentarioAdmin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="mr-3 text-green-600 hover:text-green-900">Desbanear</button>
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

export default UsuariosBaneados;
