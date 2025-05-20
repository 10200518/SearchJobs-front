import { API_URL } from './javascripts/Api.js';

const rutasPorRol = {
  'ROLE_INVITADO': ['/', '/login','/empleos/*', '/registro','/perfil/empresa/*', '/registro/candidato','/registro/empresa', '/404'],
  'CANDIDATO': [ '/login','/perfil/empresa/*','/dashboard/candidato','/empleos/*', '/perfil/candidato/*', '/logout', '/chat/candidato/*', '/postulados', '/404'],
  'EMPRESA': [ '/dashboard/empresa', '/perfil/empresa/*', '/logout','/postulados/*', '/chat/empresa/*', '/404', "/empleos/*"],
  'ADMIN': [ '/admin/*','/perfil/*', '/logout', '/404', '/empleos/*','/postulados/*'],
  'SUPER_ADMIN': ['/admin/*', '/perfil/*','/logout', '/404', '/empleos/*','/postulados/*' ]
};

export async function onRequest(context, next) {
  const { request, url } = context;
  function rutaPermitida(rutasPermitidas, rutaActual) {
    return rutasPermitidas.some(ruta => {
      if (ruta.endsWith('/*')) {
        const prefijo = ruta.slice(0, -2);
        return rutaActual.startsWith(prefijo);
      }
      return rutaActual === ruta;
    });
  }

  try {
    
    
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
    const rutasPermitidas = rutasPorRol[rolPrincipal] || [];
    if (rutaPermitida(rutasPermitidas, rutaActual)) {
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
