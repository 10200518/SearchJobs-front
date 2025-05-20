import { API_URL } from './javascripts/Api.js';

const rutasPorRol = {
  'ROLE_INVITADO': ['/', '/login','/empleos', '/registro', '/registro/candidato','/registro/empresa', '/404'],
  'CANDIDATO': ['/','/login', '/dashboard/candidato', '/perfil/candidato', '/logout', '/chat', '/404'],
  'EMPRESA': ['/', '/dashboard/empresa', '/perfil', '/logout', '/chat', '/404'],
  'ADMIN': ['/', '/admin', '/dashboard/admin', '/logout', '/no-autorizado', '/404'],
  'SUPER_ADMIN': ['/', '/admin', '/dashboard/admin', '/logout', '/no-autorizado', '/404']
};

export async function onRequest(context, next) {
  try {
    const { request, url } = context;
    
    const cookie = request.headers.get('cookie');

    const res = await fetch(`${API_URL}/api/usuarios/rol`, {
      headers: {
        'cookie': cookie,
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // en servidor es opcional, pero no está mal
    });

    if (!res.ok) {
      url.pathname = "/login";
      return Response.redirect(url.toString(), 302);
    }

    const data = await res.json();
    const rolPrincipal = data.rolPrincipal.toUpperCase();
    const rutaActual = url.pathname;
    console.log("rol: "+rolPrincipal)
    const rutasPermitidas = rutasPorRol[rolPrincipal] || [];
    console.log("rutas "+ rutasPermitidas)
    if (rutasPermitidas.includes(rutaActual)) {
      return next();
    } else {
      url.pathname = "/404";
      return Response.redirect(url.toString(), 302);
    }

  } catch (error) {
    console.error('[MIDDLEWARE] Error:', error);
    url.pathname = "/login";
    return Response.redirect(url.toString(), 302);
  }
}
