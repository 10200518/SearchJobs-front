import { useEffect, useState } from 'react';
import '../styles/pages/header.css'

const Header = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/usuarios/rol', {
          credentials: 'include',
        });
        const data = await res.json();
        console.log(data.rolPrincipal)
        setUserRole(data.rolPrincipal);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

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
          {userRole === 'ROLE_SUPER_ADMIN' && (
            <>
              <a href="/" className="nav-link">Inicio</a>
              <a href="/empleos" className="nav-link">Empleos</a>
              <a href="/404" className="nav-link">Crear admins</a>
              <a href="/dashboard/admin" className="nav-link">Dashboard</a>
              <a href="/admin/usuarios" className="nav-link">Usuarios</a>
              <a href="/admin/postulaciones" className="nav-link">Postulaciones</a>
            </>
          )}
          {userRole === 'ROLE_ADMIN' && (
            <>
              <a href="/" className="nav-link">Inicio</a>
              <a href="/empleos" className="nav-link">Empleos</a>
              <a href="/dashboard/admin" className="nav-link">Dashboard</a>
              <a href="/admin/usuarios" className="nav-link">Usuarios</a>
              <a href="/admin/postulaciones" className="nav-link">Postulaciones</a>
            </>
          )}
          {userRole === 'ROLE_CANDIDATO' && (
            <>
              <a href="/" className="nav-link">Inicio</a>
              <a href="/chat" className="nav-link">Chats</a>
              <a href="/empleos" className="nav-link">Empleos</a>
              <a href="/perfil/candidato" className="nav-link">Perfil</a>
            </>
          )}
          {userRole === 'ROLE_EMPRESA' && (
            <>
              <a href="/" className="nav-link">Inicio</a>
              <a href="/empleos/editarVacante" className="nav-link">Publicar Empleo</a>
              <a href="/empleos/listadoVacantes" className="nav-link">Mis Vacantes</a>
              <a href="/chat" className="nav-link">Chats</a>
              <a href="/perfil/PerfilUsuario" className="nav-link">Perfil</a>
            </>
          )}

          {userRole && userRole !== 'ROLE_INVITADO' ? (
            <>
              <a href="/registro" className="nav-link register-btn">{userRole}</a>
              <a href="/logout" className="nav-link">Cerrar Sesión</a>
            </>
          ) : (
            <>
              <a href="/" className="nav-link">Inicio</a>
              <a href="/empleos" className="nav-link">Empleos</a>
              <a href="/login" className="nav-link">Iniciar Sesión</a>
              <a href="/registro" className="nav-link register-btn">Registrarse</a>
              <a href="/registro" className="nav-link register-btn">{userRole}</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

