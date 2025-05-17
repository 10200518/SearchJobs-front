// Lee la variable de entorno PUBLIC_API_URL, y si no está, usa localhost como fallback
export const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';
