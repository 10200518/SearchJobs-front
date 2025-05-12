import { useEffect, useState } from 'react';
import '../styles/pages/header.css'

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const [id, setId] = useState(null);
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/usuarios/rol', {
          credentials: 'include',
        });
        const data = await res.json();
        setUserRole(data.rolPrincipal);
        setId(data.id)
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);


  useEffect(() => {
    const fetchChats = async () => {
      if (userRole) {
        try {
          let url;
          // Determina el URL según el rol del usuario
          if (userRole === 'EMPRESA') {
            url = `http://localhost:8080/api/chats/empresa/${id}`;
          } else if (userRole === 'CANDIDATO') {
            url = `http://localhost:8080/api/chats/candidato/${id}`;
          }else{
            return;
          }

          const res = await fetch(url, {
            credentials: 'include',
          });
          const data = await res.json();
          setChats(data.chats);  // Guarda los chats en el estado
        } catch (error) {
          console.error('Error fetching chats:', error);
        } 
      }
    };

    fetchChats();
  }, [userRole]);

  function getRoleDisplayName(role){
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Administrador";
      case "ADMIN":
        return "Administrador";
      case "EMPRESA":
        return "Empresa";
      case "CANDIDATO":
        return "Candidato";
      case "ROLE_INVITADO":
        return "Invitado";
      default:
        return role ?? "";
    }
  }
  

  useEffect(() => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
      const handleClick = () => {
        mainNav.classList.toggle('nav-open');

        const isOpen = mainNav.classList.contains('nav-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

        menuToggle.innerHTML = isOpen
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      };

      menuToggle.addEventListener('click', handleClick);
      return () => menuToggle.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="flex items-center">
          <div className="text-2xl font-extrabold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">SearchJobs</span>
          </div>
        </a>

        <button
          id="menuToggle"
          className="md:hidden bg-transparent border-none cursor-pointer text-text hover:text-primary transition-transform duration-300 hover:rotate-90"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <nav className="nav" id="mainNav">
          {userRole === 'SUPER_ADMIN' && (
            <>
              <a href="/admin" className="nav-link">Inicio</a>
              <a href="/admin/vacantes" className="nav-link">Empleos</a>
              <a href="/404" className="nav-link">Crear admins </a>
              <a href="/admin/usuarios" className="nav-link">Usuarios</a>
              <a href="/admin/postulaciones" className="nav-link">Postulaciones</a>
            </>
          )}
          {userRole === 'ADMIN' && (
            <>
              <a href="/admin" className="nav-link">Inicio</a>
              <a href="/admin/vacantes" className="nav-link">Empleos</a>
              <a href="/admin/usuarios" className="nav-link">Usuarios</a>
              <a href="/admin/Postulados" className="nav-link">Postulaciones</a>
            </>
          )}
          {userRole === 'CANDIDATO' && (
            <>
              <a href="/dashboard/candidato" className="nav-link">Inicio</a>
              <a href={`/chat/candidato`} className="nav-link">Chats</a>
              <a href="/empleos" className="nav-link">Empleos</a>
              <a href="/postulados" className="nav-link">Postulaciones</a>
              <a href="/perfil/candidato" className="nav-link">Perfil</a>
            </>
          )}
          {userRole === 'EMPRESA' && (
            <>
              <a href="/dashboard/empresa" className="nav-link">Inicio</a>
              <a href="/empleos/listadoVacantes" className="nav-link">Mis Vacantes</a>
              <a href="/empleos/Vacantes" className="nav-link">Publicar oferta</a>
              <a href={`/chat/empresa`} className="nav-link">Chats</a>
              <a href="/perfil/empresa" className="nav-link">Perfil</a>
            </>
          )}

          {userRole && userRole !== 'ROLE_INVITADO' ? (
            <>
              <a href="http://localhost:8080/usuarios/cerrarSesion" className="nav-link register-btn">Cerrar Sesión</a>
              <a className="nav-link register-btn">{getRoleDisplayName(userRole)}</a>
            </>
          ) : (
            <>
              <a href="/" className="nav-link">Inicio</a>
              <a href="/empleos" className="nav-link">Empleos</a>
              <a href="/login" className="nav-link">Iniciar Sesión</a>
              <a href="/registro" className="nav-link register-btn">Registrarse</a>
              <a className="nav-link register-btn">{getRoleDisplayName(userRole)}</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

