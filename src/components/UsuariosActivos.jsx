import { useEffect, useState } from 'react';
import '../styles/empleos/empleos.css';
import Paginacion from './Paginacion';

const UsuariosActivos = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [fade, setFade] = useState(true);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/admin/listar/filtrados?page=${currentPage - 1}&size=${pageSize}`,{
          credentials: 'include' 
      });
        const data = await res.json();
        setTotalElements(data.totalElements || 0);
        setUsuarios(data.usuarios || []);
        setTotalPages(data.totalPages || 0);
        console.log(data.totalPages);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchUsuarios();
  }, [currentPage, pageSize]);

  const verPerfil = (idUsuario) => {
    fetch(`http://localhost:8080/api/candidatos/perfil?idUsuario=${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },credentials: 'include' 
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener el perfil');
        return res.json();
      })
      .then(() => {
        window.location.href = `/perfil/candidato?idUsuario=${idUsuario}`;
      })
      .catch((err) => console.error('Error al obtener el perfil:', err));
  };

  const banearUsuario = (idUsuario, motivo = 'Falta grave') => {
    fetch(`http://localhost:8080/api/admin/cambiar-estado/usuario?idUsuario=${idUsuario}&estado=false&comentario=${motivo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },credentials: 'include' 
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al banear usuario');
        return res.json();
      })
      .then(() => {
        // Recargar lista después de banear
        return fetch(`http://localhost:8080/api/admin/listar/filtrados?page=${currentPage - 1}&size=${pageSize}`,{
          credentials: 'include' 
      });
      })
      .then((res) => res.json())
      .then((data) => setUsuarios(data.usuarios || []))
      .catch((err) => console.error('Error al banear el usuario:', err));
  };

  return (
    <div>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button className="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600 tab-button active">
              Usuarios Activos ({totalElements})
            </button>
          </nav>
        </div>
      </div>

      <div className={`tab-content transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
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
              {usuarios.map((user) => (
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
                      <button
                        className="mr-3 text-blue-600 hover:text-blue-900"
                        onClick={() => verPerfil(user.idUsuario)}>  Ver  </button>
                      <a
                        className="mr-3 text-blue-600 hover:text-blue-900"
                        href ={`/perfil/${user.idUsuario}` } >
                        Ver Perfil ahora si

                        </a>
                        
                      <button
                        className="mr-3 text-red-600 hover:text-red-900"
                        onClick={() => banearUsuario(user.idUsuario)}
                      >
                        Banear
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="p-4">
            <Paginacion
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuariosActivos;

