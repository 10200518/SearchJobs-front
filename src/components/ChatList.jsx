import { useState, useEffect } from 'react';

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
        const data = await res.json();
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
          const data = await res.json();
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

  if (chats.length === 0) {
    return <div className="sin-chats">Aún no tienes conversaciones.</div>;
  }
  return (
    <ul className="contacts-list">
      {chats.map(chat => (
          <a href={`/chat/${chat.id}`} className="contact-info">
            <div className="contact-header">
              <h4 className="contact-name">
                {userRole === 'EMPRESA'
                  ? `Candidato: ${chat.nombreCandidato}`
                  : `Empresa: ${chat.nombreEmpresa}`}
              </h4>
              <span className="contact-time">
                {new Date(chat.horaUltimoMensaje).toLocaleTimeString()}
              </span>
            </div>

            {userRole !== 'empresa' && (
              <p className="contact-role">Vacante: {chat.tituloVacante}</p>
            )}
            <p className="contact-last-message">
              {chat.contentUltimoMensaje || 'Sin mensajes'}
            </p>

          </a>
      ))}
    </ul>

  );
};

export default ChatList;
