import { useState, useEffect } from 'react';
import { manejarRespuesta } from '../javascripts/ManejarRespuesta';

const ChatList = () => {
  const [userRole, setUserRole] = useState(null);
  const [id, setId] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/usuarios/rol', {
          credentials: 'include',
        });
        const data = await manejarRespuesta(res); 
        setId(data.id)
        setUserRole(data.rolPrincipal);  // Guarda el rol del usuario
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (userRole) {
        setLoading(true);
        try {
          let url;
          // Determina el URL según el rol del usuario
          if (userRole === 'EMPRESA') {
            url = `http://localhost:8080/api/chats/empresa/${id}`;
          } else if (userRole === 'CANDIDATO') {
            url = `http://localhost:8080/api/chats/candidato/${id}`;
          }else{
            console.log(userRole)
            return;
          }
          const res = await fetch(url, {
            credentials: 'include',
          });
          const data = await manejarRespuesta(res); 
          setChats(data.chats);  // Guarda los chats en el estado
        } catch (error) {
          console.error('Error fetching chats:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChats();
  }, [userRole]);  // Revisa cuando el rol cambie

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-full overflow-y-auto custom-scroll bg-white border border-blue-200 rounded-md">
      <ul className="divide-y divide-blue-100">
        {chats.map(chat => (
          <li key={chat.id}>
            <a
              href={`/chat/${chat.id}`}
              className="block w-full px-4 py-3 hover:bg-blue-50 transition duration-150"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">
                  {userRole === 'EMPRESA'
                    ? `Candidato: ${chat.nombreCandidato}`
                    : `Empresa: ${chat.nombreEmpresa}`}
                </span>
                <span className="text-xs text-blue-500">
                  {new Date(chat.horaUltimoMensaje).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-blue-700">Vacante: {chat.tituloVacante}</p>
              <p className="text-sm text-blue-800 truncate">
                {chat.contentUltimoMensaje || 'Sin mensajes'}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
